import { saveAs } from "file-saver";

export async function exportResumeDocx(id: string, fallbackTitle?: string) {
  const res = await fetch(`/api/resume/export/${id}/docx`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to export DOCX");

  const blob = await res.blob();

  const cd = res.headers.get("content-disposition") || "";
  const match = cd.match(/filename="?([^";]+)"?/i);
  const filename = match?.[1] ?? `reactive_resume-${id}.docx`;

  saveAs(blob, filename);
}

