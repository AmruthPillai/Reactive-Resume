import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ResumeDto } from "@reactive-resume/dto";

export const Resume = createParamDecorator(
  (data: keyof ResumeDto | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const resume = request.payload?.resume as ResumeDto;

    return data ? resume[data] : resume;
  },
);
