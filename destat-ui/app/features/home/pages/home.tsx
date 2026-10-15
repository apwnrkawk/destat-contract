import { supabase } from "~/postgres/supaclient"



// before rendering home react component
export async function loader() {
    const {data} = await supabase().from("destat-test").select("*");
    console.log(data);
}

export default function Home() {
    return <div>
        Hello destat world
    </div>
}