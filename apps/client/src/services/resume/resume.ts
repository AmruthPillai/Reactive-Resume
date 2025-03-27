import type { Resume } from "@reactive-resume/schema";
import { supabase, resumes as resumeClient } from "@/client/lib/supabase";

export const findResumeById = async (id: string): Promise<Resume | null> => {
  const data = await resumeClient.get(id);
  return data as Resume | null;
};

export const findResumeByUsernameSlug = async (
  username: string,
  slug: string,
): Promise<Resume | null> => {
  const { data, error } = await supabase
    .from("resumes")
    .select(
      `
      *,
      user:users!inner (
        username
      ),
      statistics (
        views,
        downloads
      )
    `,
    )
    .eq("slug", slug)
    .eq("user.username", username) // Filter by username from the joined users table
    .eq("visibility", "public") // Ensure it's public
    .maybeSingle(); // Use maybeSingle to return null if not found

  if (error) {
    console.error("Error fetching public resume:", error);
    return null;
  }

  // We need to remove the nested user object before returning to match the Resume type
  if (data) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user, ...resumeData } = data;
    return resumeData as Resume;
  }

  return null;
};
