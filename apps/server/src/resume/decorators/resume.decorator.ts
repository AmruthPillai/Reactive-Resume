import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ResumeDto } from "@reactive-resume/dto";
import { resumeDataSchema } from "@reactive-resume/schema";

import { transformZodJson } from "../utils/transform-zod-json";

export const Resume = createParamDecorator(
  (data: keyof ResumeDto | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const resume = request.payload?.resume as ResumeDto;
    const resumeData = data ? resume[data] : resume;
    console.log(transformZodJson((resumeData as ResumeDto).data));
    resumeDataSchema.parse(transformZodJson((resumeData as ResumeDto).data));
    return {
      ...(resumeData as ResumeDto),
      data: transformZodJson((resumeData as ResumeDto).data),
    };
  },
);
