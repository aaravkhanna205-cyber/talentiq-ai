// Checks for resume files chosen by a person. Used by the recruiter upload and the candidate apply form.
export const RESUME_MAX_MB = 5;
const allowed = [".pdf", ".docx"];

export type PickedFile = { name: string; size: number; problem: string };

export function inspectResume(file: File): PickedFile {
  const lower = file.name.toLowerCase();
  let problem = "";
  if (!allowed.some((ext) => lower.endsWith(ext))) problem = "Only PDF and DOCX files are accepted.";
  else if (file.size > RESUME_MAX_MB * 1024 * 1024) problem = `Larger than ${RESUME_MAX_MB} MB.`;
  else if (file.size === 0) problem = "The file is empty.";
  return { name: file.name, size: file.size, problem };
}
export function sizeText(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
