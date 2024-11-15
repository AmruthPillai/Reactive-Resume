/* eslint-disable lingui/no-unlocalized-strings */
import { CheckCircle, Spinner } from "@phosphor-icons/react";
import { Button, Input, Progress, Textarea } from "@reactive-resume/ui";
import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createOnboardingLinkedin } from "@/client/services/onboarding";

const steps = [
  {
    title: "שלום 🎉",
    description: "רוצה ליצור קורות חיים מושלמים ומותאמים לתחום שאתה עובד בו?",
  },
  {
    title: "מנתח 🧠",
    description: "אנחנו מנתחים את הפרופיל שלך בלינקדאין...",
  },
  {
    title: "תיאור משרה 📝",
    description: "מה תיאור המשרה שאתה רוצה להשיג?",
  },
  {
    title: "יוצר 🔥",
    description: "הבינה המלאכותית שלנו יוצרת את הקורות חיים המושלמים שלך...",
  },
  {
    title: "סיום 🚀",
    description: "הקורות חיים המושלמים שלך מוכנים להורדה. רק נותר להתחבר למערכת!",
  },
];

export const isValidLinkedinUrl = (url: string): boolean => {
  // Basic LinkedIn URL validation
  const linkedinUrlPattern = /^https:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i;

  try {
    const urlObj = new URL(url);
    return linkedinUrlPattern.test(urlObj.href);
  } catch {
    return false;
  }
};

const isLinkedinUrlValid = (url: string) => {
  return isValidLinkedinUrl(url);
};

const isJobDescriptionValid = (description: string) => {
  return description.trim().length >= 10; // Require at least 10 characters
};

export function LinkedinOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resultId, setResultId] = useState<string>();
  const navigate = useNavigate();

  const handleCreateOnboardingLinkedin = async () => {
    const result = await createOnboardingLinkedin({ linkedinUrl, jobDescription });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setResultId(result.id);
    setCurrentStep(steps.length - 1);
  };

  useEffect(() => {
    window.localStorage.setItem("locale", "he-IL");
    if (currentStep === 1) {
      const timer = setTimeout(() => {
        setCurrentStep(2);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
    if (currentStep === 3) {
      void handleCreateOnboardingLinkedin();
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      localStorage.setItem("onboardingLinkedinId", resultId ?? "");
      navigate(`/auth/login`);
      return;
    }

    // Add validation checks
    if (currentStep === 0 && !isLinkedinUrlValid(linkedinUrl)) {
      return; // Prevent proceeding if LinkedIn URL is invalid
    }

    if (currentStep === 2 && !isJobDescriptionValid(jobDescription)) {
      return; // Prevent proceeding if job description is too short
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0 && currentStep !== 1 && currentStep !== 3) {
      // dont go back to step 1 or 3 (the loading steps)
      const shouldGoBack = currentStep !== 1 && currentStep !== 3;
      setCurrentStep(shouldGoBack ? currentStep - 2 : currentStep - 1);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        <div className="space-y-6 rounded-2xl bg-white p-8 shadow-xl">
          <Progress
            value={((currentStep + 1) / steps.length) * 100}
            className="w-full rotate-180"
          />

          <div key={currentStep} className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">{steps[currentStep].title}</h2>
            <p className="text-gray-600">{steps[currentStep].description}</p>

            {currentStep === 0 && (
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="https://www.linkedin.com/in/your-profile"
                  value={linkedinUrl}
                  onChange={(e: { target: { value: SetStateAction<string> } }) => {
                    setLinkedinUrl(e.target.value);
                  }}
                />
                {linkedinUrl && !isLinkedinUrlValid(linkedinUrl) && (
                  <p className="text-sm text-red-500">נא להזין כתובת LinkedIn תקינה</p>
                )}
              </div>
            )}

            {currentStep === 1 && (
              <div className="flex h-24 items-center justify-center">
                <Spinner className="size-12 animate-spin text-primary" />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <Textarea
                  placeholder="תדביק את תיאור המשרה שאתה רוצה להשיג כאן"
                  value={jobDescription}
                  rows={6}
                  onChange={(e: { target: { value: SetStateAction<string> } }) => {
                    setJobDescription(e.target.value);
                  }}
                />
                {jobDescription && !isJobDescriptionValid(jobDescription) && (
                  <p className="text-sm text-red-500">נא להזין תיאור משרה של לפחות 10 תווים</p>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex h-24 items-center justify-center">
                <div className="relative">
                  <Spinner className="size-12 animate-spin text-primary" />
                  <Spinner className="absolute left-2 top-2 size-8 animate-spin text-secondary" />
                </div>
              </div>
            )}

            {currentStep === 4 && <div className="space-y-4"></div>}
          </div>

          <div className="flex justify-between">
            {currentStep <= 3 && (
              <Button
                variant="outline"
                disabled={currentStep === 0 || currentStep === 1 || currentStep === 3}
                onClick={handlePrevious}
              >
                אחורה
              </Button>
            )}
            <Button
              disabled={
                currentStep === 1 ||
                currentStep === 3 ||
                (currentStep === 0 && !isLinkedinUrlValid(linkedinUrl)) ||
                (currentStep === 2 && !isJobDescriptionValid(jobDescription))
              }
              onClick={handleNext}
            >
              {currentStep === steps.length - 1 ? "התחברות" : "הבא"}
            </Button>
          </div>
        </div>

        {currentStep === steps.length - 1 && (
          <div className="mt-8 text-center">
            <CheckCircle className="mx-auto size-12 text-green-500" />
            <p className="mt-2 text-xl font-semibold text-gray-800">הקורות חיים שלך מוכנים!</p>
            <p className="mt-1 text-gray-600">
              התחבר כדי לצפות ולהוריד את הקורות חיים המותאמים לך.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
