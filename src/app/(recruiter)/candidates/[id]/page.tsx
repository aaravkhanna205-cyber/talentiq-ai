import { notFound } from "next/navigation";
import { CandidateDetail } from "@/components/candidates/candidate-detail";
import { candidates, getCandidate } from "@/lib/mock";

export function generateStaticParams() {
  return candidates.map((c) => ({ id: c.id }));
}
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return { title: getCandidate((await params).id)?.name ?? "Candidate" };
}

export default async function CandidatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getCandidate(id)) notFound();
  return <CandidateDetail id={id} />;
}
