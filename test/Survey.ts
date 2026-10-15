import { expect } from "chai";
import { network } from "hardhat";

type Question = {
  question: string;
  options: string[];
};

describe("Survey init", () => {
  const title = "막무가내 설문조사라면";
  const description =
    "중앙화된 설문조사로서, 모든 데이터는 공개되지 않으며 설문조사를 게시한자만 볼 수 있습니다.";
  const questions: Question[] = [
    {
      question: "누가 내 응답을 관리할때 더 솔직할 수 있을까요?",
      options: [
        "구글폼 운영자",
        "탈중앙화된 블록체인 (관리주체 없으며 모든 데이터 공개)",
        "상관없음",
      ],
    },
  ];

  const targetNumber = 3;
  const totalReward = 3n * 10n ** 18n; // 배포 시 예치하는 보상금 (3 ETH)
  const expectedRewardAmount = totalReward / BigInt(targetNumber);

  const getSurveyContractAndEthers = async (survey: {
    title: string;
    description: string;
    targetNumber: number;
    questions: Question[];
  }) => {
    const { ethers } = await network.connect();
    const cSurvey = await ethers.deployContract(
      "Survey",
      [survey.title, survey.description, survey.targetNumber, survey.questions],
      { value: totalReward }
    );
    return { ethers, cSurvey };
  };

  const deploy = () =>
    getSurveyContractAndEthers({ title, description, targetNumber, questions });

  describe("Deployment", () => {
    it("should store survey info correctly", async () => {
      const { cSurvey } = await deploy();

      expect(await cSurvey.title()).to.equal(title);
      expect(await cSurvey.description()).to.equal(description);
      expect(await cSurvey.targetNumber()).to.equal(BigInt(targetNumber));
    });

    it("should calculate rewardAmount correctly", async () => {
      const { cSurvey } = await deploy();

      expect(await cSurvey.rewardAmount()).to.equal(expectedRewardAmount);
    });
  });

  describe("Questions and Answers", () => {
    it("should return questions correctly", async () => {
      const { cSurvey } = await deploy();

      const result = await cSurvey.getQuestions();

      expect(result.length).to.equal(questions.length);
      expect(result[0].question).to.equal(questions[0].question);
      expect([...result[0].options]).to.deep.equal(questions[0].options);
    });

    it("should allow valid answer submission", async () => {
      const { ethers, cSurvey } = await deploy();
      const [, respondent] = await ethers.getSigners();

      await cSurvey
        .connect(respondent)
        .submitAnswer({ respondent: respondent.address, answers: [1] });

      const answers = await cSurvey.getAnswers();
      expect(answers.length).to.equal(1);
      expect(answers[0].respondent).to.equal(respondent.address);
      expect(answers[0].answers.map(Number)).to.deep.equal([1]);
    });

    it("should revert if answer length mismatch", async () => {
      const { ethers, cSurvey } = await deploy();
      const [, respondent] = await ethers.getSigners();

      // 질문은 1개인데 답변은 2개
      await expect(
        cSurvey
          .connect(respondent)
          .submitAnswer({ respondent: respondent.address, answers: [0, 1] })
      ).to.be.revertedWith("Mismatched answers length");
    });

    it("should revert if target reached", async () => {
      const { ethers, cSurvey } = await deploy();
      const signers = await ethers.getSigners();

      // 목표 인원(3명)만큼 응답
      for (let i = 1; i <= targetNumber; i++) {
        await cSurvey
          .connect(signers[i])
          .submitAnswer({ respondent: signers[i].address, answers: [0] });
      }

      // 4번째 응답은 revert
      const extra = signers[targetNumber + 1];
      await expect(
        cSurvey
          .connect(extra)
          .submitAnswer({ respondent: extra.address, answers: [0] })
      ).to.be.revertedWith("This survey has been ended");
    });
  });

  describe("Rewards", () => {
    it("should pay correct reward to respondent", async () => {
      const { ethers, cSurvey } = await deploy();
      const [, respondent] = await ethers.getSigners();

      const before = await ethers.provider.getBalance(respondent.address);

      const tx = await cSurvey
        .connect(respondent)
        .submitAnswer({ respondent: respondent.address, answers: [2] });
      const receipt = await tx.wait();
      const gasCost = receipt!.gasUsed * receipt!.gasPrice;

      const after = await ethers.provider.getBalance(respondent.address);

      // 잔액 증가분 = 보상금 - 가스비
      expect(after - before + gasCost).to.equal(expectedRewardAmount);
    });
  });
});