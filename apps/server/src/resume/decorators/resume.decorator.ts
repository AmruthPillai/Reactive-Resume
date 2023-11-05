import { ExecutionContext } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common";
import { ResumeDto } from "@reactive-resume/dto";

export const Resume = createParamDecorator((data: keyof ResumeDto, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const resume = request.payload?.resume as ResumeDto;

  return data ? resume?.[data] : resume;
});
