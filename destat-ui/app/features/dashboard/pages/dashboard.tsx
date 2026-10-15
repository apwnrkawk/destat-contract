import { supabase } from "~/postgres/supaclient";

export async function clientLoader() {
  const { data } = await supabase().from("destat-test").select("*");
  return { data };
}

export default function Dashboard() {
  return <div>Hello destat world</div>;
}