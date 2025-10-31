import { t } from "@lingui/macro";
import { cn } from "@reactive-resume/utils";

type Props = {
  className?: string;
};

export const Copyright = ({ className }: Props) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={cn("text-xs", className)}>
      {t`© Copyright ${currentYear} CV Builder.`}
    </div>
  );
};
