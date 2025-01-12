import { t, Trans } from "@lingui/macro";
import { ArrowRight, Info, SealCheck } from "@phosphor-icons/react";
import { Alert, AlertDescription, AlertTitle, Button } from "@reactive-resume/ui";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useSearchParams } from "react-router";

import { useToast } from "@/client/hooks/use-toast";
import { queryClient } from "@/client/libs/query-client";
import { useVerifyEmail } from "@/client/services/auth";

export const VerifyEmailPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { verifyEmail, loading } = useVerifyEmail();

  useEffect(() => {
    const handleVerifyEmail = async (token: string) => {
      await verifyEmail({ token });
      await queryClient.invalidateQueries({ queryKey: ["user"] });

      toast({
        variant: "success",
        icon: <SealCheck size={16} weight="bold" />,
        title: t`Your email address has been verified successfully.`,
      });

      void navigate("/dashboard/resumes", { replace: true });
    };

    if (!token) return;

    void handleVerifyEmail(token);
  }, [token, navigate, verifyEmail]);

  return (
    <div className="space-y-6">
      <Helmet>
        <title>
          {t`Verify your email address`} - {t`Reactive Resume`}
        </title>
      </Helmet>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">{t`Verify your email address`}</h2>
        <p className="leading-relaxed opacity-75">
          <Trans>
            You should have received an email from <strong>Reactive Resume</strong> with a link to
            verify your account.
          </Trans>
        </p>
      </div>

      <Alert variant="info">
        <Info size={18} />
        <AlertTitle>{t`Please note that this step is completely optional.`}</AlertTitle>
        <AlertDescription>
          {t`We verify your email address only to ensure that we can send you a password reset link in case you forget your password.`}
        </AlertDescription>
      </Alert>

      <Button asChild disabled={loading}>
        <Link to="/dashboard">
          {t`Go to Dashboard`}
          <ArrowRight className="ml-2" />
        </Link>
      </Button>
    </div>
  );
};
