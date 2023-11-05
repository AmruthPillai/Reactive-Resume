import { GithubLogo, GoogleLogo } from "@phosphor-icons/react";
import { Button } from "@reactive-resume/ui";

export const SocialAuth = () => (
  <div className="grid grid-cols-2 gap-4">
    <Button asChild size="lg" className="w-full !bg-[#222] !text-white hover:!bg-[#222]/80">
      <a href="/api/auth/github">
        <GoogleLogo className="mr-3 h-4 w-4" />
        GitHub
      </a>
    </Button>

    <Button asChild size="lg" className="w-full !bg-[#4285F4] !text-white hover:!bg-[#4285F4]/80">
      <a href="/api/auth/google">
        <GithubLogo className="mr-3 h-4 w-4" />
        Google
      </a>
    </Button>
  </div>
);
