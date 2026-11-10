import { redirect } from "next/navigation";

// The home address sends people to the dashboard.
export default function Home() {
  redirect("/dashboard");
}
