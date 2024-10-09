import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ResumeDto } from "@reactive-resume/dto";
import { ResumeData, resumeDataSchema } from "@reactive-resume/schema";

import { transformZodJson } from "../utils/transform-zod-json";

export const Resume = createParamDecorator(
  (data: keyof ResumeDto | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const resume = request.payload?.resume as ResumeDto;
    const resumeData = data ? resume[data] : resume;
    // console.log(transformZodJson((resumeData as ResumeDto).data));
    let dataParse = transformZodJson((resumeData as ResumeDto).data);
    const result = resumeDataSchema.safeParse(dataParse);
    if (result.error?.errors)
      dataParse = {
        ...(dataParse as ResumeData),
        sections: {
          ...(dataParse as ResumeData).sections,
          custom: {},
        },
      };
    resumeDataSchema.parse(dataParse);
    return {
      ...(resumeData as ResumeDto),
      data: dataParse,
    };
  },
);
