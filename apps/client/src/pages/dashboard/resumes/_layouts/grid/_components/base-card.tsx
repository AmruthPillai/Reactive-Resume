import { Card, ShineBorder } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import Tilt from "react-parallax-tilt";

import { defaultTiltProps } from "@/client/constants/parallax-tilt";

type Props = {
  className?: string;
  onClick?: () => void;
  withShineBorder?: boolean;
  children?: React.ReactNode;
};

export const BaseCard = ({ children, className, onClick, withShineBorder = false }: Props) => (
  <>
    {!withShineBorder && (
      <Tilt {...defaultTiltProps}>
        <Card
          className={cn(
            "relative flex aspect-[1/1.4142] scale-100 cursor-pointer items-center justify-center bg-secondary/50 p-0 ",
            className,
          )}
          onClick={onClick}
        >
          {children}
        </Card>
      </Tilt>
    )}
    {withShineBorder && (
      <Tilt {...defaultTiltProps}>
        <ShineBorder
          className="relative"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          borderRadius={4}
          borderWidth={2}
        >
          <Card
            className={cn(
              "relative flex aspect-[1/1.4142] scale-100 cursor-pointer items-center justify-center bg-secondary/50 p-0 ",
              className,
            )}
            onClick={onClick}
          >
            {children}
          </Card>
        </ShineBorder>
      </Tilt>
    )}
  </>
);
