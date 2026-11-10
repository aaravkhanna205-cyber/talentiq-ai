import { CandidatesView } from "@/components/candidates/candidates-view";

export const metadata = { title: "Candidates" };

export default async function CandidatesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return <CandidatesView initialQuery={q ?? ""} />;
}
