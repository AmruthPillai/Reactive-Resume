import { useEffect } from "react";

export const usePasswordToggle = (formRef: React.RefObject<HTMLElement | null>) => {
  // Show Password on "Control" Key Down
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        formRef.current
          ?.querySelector<HTMLInputElement>('input[name="password"]')
          ?.setAttribute("type", "text");
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [formRef]);

  // Hide Password on "Control" Key Up
  useEffect(() => {
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        formRef.current
          ?.querySelector<HTMLInputElement>('input[name="password"]')
          ?.setAttribute("type", "password");
      }
    };

    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [formRef]);

  return;
};
