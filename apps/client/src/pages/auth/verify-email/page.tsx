import { ArrowRight, Info, SealCheck, Warning } from "@phosphor-icons/react";
import { Alert, AlertDescription, AlertTitle, Button } from "@reactive-resume/ui";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

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
      try {
        await verifyEmail({ token });
        await queryClient.invalidateQueries({ queryKey: ["user"] });

        toast({
          variant: "success",
          icon: <SealCheck size={16} weight="bold" />,
          title: "Your email address has been verified successfully.",
        });

        navigate("/dashboard/resumes", { replace: true });
      } catch (error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data.message || error.message;

          toast({
            variant: "error",
            icon: <Warning size={16} weight="bold" />,
            title: "An error occurred while trying to verify your email address",
            description: message,
          });
        }
      }
    };

    if (!token) return;

    handleVerifyEmail(token);
  }, [token, navigate, verifyEmail]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Verify your email address</h2>
        <p className="leading-relaxed opacity-75">
          You should have received an email from <strong>Reactive Resume</strong> with a link to
          verify your account.
        </p>
      </div>

      <Alert variant="info">
        <Info size={18} />

        <AlertTitle>Please note that this step is completely optional.</AlertTitle>

        <AlertDescription>
          We verify your email address only to ensure that we can send you a password reset link in
          case you forget your password.
        </AlertDescription>
      </Alert>

      <Button asChild disabled={loading}>
        <Link to="/dashboard">
          Continue to Dashboard
          <ArrowRight className="ml-2" />
        </Link>
      </Button>
    </div>
  );
};
