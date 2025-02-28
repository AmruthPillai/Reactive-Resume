import type { ResumeDto } from "@reactive-resume/dto";
import type { LoaderFunction } from "react-router";
import { redirect } from "react-router";

import { queryClient } from "@/client/libs/query-client";
import { findPublicProfileResume } from "@/client/services/resume";

export const publicProfileLoader: LoaderFunction<ResumeDto> = async ({ params }) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const username = params.username!;

    return await queryClient.fetchQuery({
      queryKey: ["resume", { username }],
      queryFn: () => findPublicProfileResume(username),
    });
  } catch {
    return redirect("/dashboard");
  }
};
