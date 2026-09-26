import { expect } from "chai";
import hre from "hardhat";

describe("SurveyFactory Contract", () => {
  let factory: any;
  let owner: any, respondent1: any, respondent2: any;
  let ethers: any;

  beforeEach(async () => {
    // Hardhat v3 연결 방식
    const networkHelpers = await hre.network.connect();
    ethers = networkHelpers.ethers;

    [owner, respondent1, respondent2] = await ethers.getSigners();

    factory = await ethers.deployContract("SurveyFactory", [
      ethers.parseEther("50"), // min_pool_amount
      ethers.parseEther("0.1"), // min_reward_amount
    ]);
  });

  // 1. 배포 시 최소 금액들이 제대로 설정되었는지 확인
  it("should deploy with correct minimum amounts", async () => {
    expect(await factory.min_pool_amount()).to.equal(ethers.parseEther("50"));
    expect(await factory.min_reward_amount()).to.equal(ethers.parseEther("0.1"));
  });

  // 2. 유효한 값 전달 시 설문 생성 + 이벤트 발생 + 배열 길이 증가 확인
  it("should create a new survey when valid values are provided", async () => {
    const surveyData = {
      title: "테스트 설문",
      description: "테스트 설명",
      targetNumber: 100,
      questions: [
        {
          question: "질문 1",
          options: ["옵션 1", "옵션 2"],
        },
      ],
    };

    await expect(
      factory.createSurvey(surveyData, { value: ethers.parseEther("50") })
    ).to.emit(factory, "SurveyCreated");

    const surveys = await factory.getSurveys();
    expect(surveys.length).to.equal(1);
  });

  // 3. pool amount가 너무 작을 때 revert 발생 확인
  it("should revert if pool amount is too small", async () => {
    const surveyData = {
      title: "테스트 설문",
      description: "테스트 설명",
      targetNumber: 100,
      questions: [
        {
          question: "질문 1",
          options: ["옵션 1", "옵션 2"],
        },
      ],
    };

    await expect(
      factory.createSurvey(surveyData, { value: ethers.parseEther("49") })
    ).to.be.revertedWith("Insufficient pool amount");
  });

  // 4. 응답자당 보상금이 너무 작을 때 revert 발생 확인
  it("should revert if reward amount per respondent is too small", async () => {
    const surveyData = {
      title: "테스트 설문",
      description: "테스트 설명",
      targetNumber: 1000,
      questions: [
        {
          question: "질문 1",
          options: ["옵션 1", "옵션 2"],
        },
      ],
    };

    await expect(
      factory.createSurvey(surveyData, { value: ethers.parseEther("50") })
    ).to.be.revertedWith("Insufficient reward amount");
  });

  // 5. 여러 개 설문 생성 후 getSurveys 출력 확인
  it("should store created surveys and return them from getSurveys", async () => {
    const surveyData = {
      title: "테스트 설문",
      description: "테스트 설명",
      targetNumber: 100,
      questions: [
        {
          question: "질문 1",
          options: ["옵션 1", "옵션 2"],
        },
      ],
    };

    await factory.createSurvey(surveyData, { value: ethers.parseEther("50") });
    await factory.createSurvey(surveyData, { value: ethers.parseEther("60") });

    const surveys = await factory.getSurveys();
    expect(surveys.length).to.equal(2);
  });
});