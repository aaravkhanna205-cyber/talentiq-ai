import { notFound } from "next/navigation";
import { ApplyForm } from "@/components/portal/apply-form";
import { getJob, jobs } from "@/lib/mock";

export const metadata = { title: "Apply" };
export const dynamicParams = false;
export function generateStaticParams() {
  return jobs.filter((j) => j.status === "Open").map((j) => ({ id: j.id }));
}

export default async function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const job = getJob((await params).id);
  if (!job) notFound();
  return <ApplyForm jobId={job.id} jobTitle={job.title} />;
}
