import type { UrlDto } from "@reactive-resume/dto";
import { axios } from "@/client/libs/axios";

export async function exportResumeGDoc(id: string) {
  try {
    const response = await axios.get<UrlDto>(`/resume/export/${id}/gdoc`);
    return response.data;
  } catch (error) {
    // Rethrow to allow UI to handle connection flow
    throw error;
  }
}
