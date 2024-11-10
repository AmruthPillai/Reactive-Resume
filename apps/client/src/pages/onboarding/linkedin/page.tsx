/* eslint-disable lingui/no-unlocalized-strings */
import { ArrowRight, CheckCircle, Spinner } from "@phosphor-icons/react";
import { Button } from "@reactive-resume/ui";
import { Input, Progress, Textarea } from "@reactive-resume/ui";
import { SetStateAction, useEffect, useState } from "react";

const steps = [
  {
    title: "Welcome",
    description: "Let's create an amazing resume tailored just for you!",
  },
  {
    title: "Analyzing",
    description: "We're analyzing your LinkedIn profile...",
  },
  {
    title: "Job Description",
    description: "Let's tailor your resume to the job you want.",
  },
  {
    title: "Creating",
    description: "Our AI is crafting your perfect resume...",
  },
  {
    title: "Complete",
    description: "Your resume is ready! Let's get you logged in.",
  },
];

export function LinkedinOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  useEffect(() => {
    if (currentStep === 1) {
      const timer = setTimeout(() => {
        setCurrentStep(2);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
    if (currentStep === 3) {
      const timer = setTimeout(() => {
        setCurrentStep(4);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentStep]);

  const handleNext = () => {
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="space-y-6 rounded-2xl bg-white p-8 shadow-xl">
          <Progress value={((currentStep + 1) / steps.length) * 100} className="w-full" />

          <div key={currentStep} className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">{steps[currentStep].title}</h2>
            <p className="text-gray-600">{steps[currentStep].description}</p>

            {currentStep === 0 && (
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter your LinkedIn URL"
                  value={linkedinUrl}
                  onChange={(e: { target: { value: SetStateAction<string> } }) => {
                    setLinkedinUrl(e.target.value);
                  }}
                />
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
                  placeholder="Paste the job description here"
                  value={jobDescription}
                  rows={6}
                  onChange={(e: { target: { value: SetStateAction<string> } }) => {
                    setJobDescription(e.target.value);
                  }}
                />
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

            {currentStep === 4 && (
              <div className="space-y-4">
                <p className="text-center text-gray-600">
                  Your personalized resume is ready! Log in to view and download it.
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              disabled={currentStep === 0 || currentStep === 1 || currentStep === 3}
              onClick={handlePrevious}
            >
              Previous
            </Button>
            <Button
              disabled={currentStep === 1 || currentStep === 3 || currentStep === steps.length - 1}
              onClick={handleNext}
            >
              {currentStep === steps.length - 1 ? "Login" : "Next"}
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>

        {currentStep === steps.length - 1 && (
          <div className="mt-8 text-center">
            <CheckCircle className="mx-auto size-12 text-green-500" />
            <p className="mt-2 text-xl font-semibold text-gray-800">Your Resume is Ready!</p>
            <p className="mt-1 text-gray-600">Log in to view and download your tailored resume.</p>
          </div>
        )}
      </div>
    </div>
  );
}
