import { Injectable } from "@nestjs/common";
import { OnboardingLinkedinDto } from "@reactive-resume/dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class OnboardingService {
  constructor(private readonly prisma: PrismaService) {}
  async createOnboardingLinkedin(body: OnboardingLinkedinDto) {
    const { linkedinUrl, jobDescription } = body;
    const onboardingLinkedin = await this.prisma.onboardingLinkedin.create({
      data: {
        linkedinUrl,
        jobDescription,
      },
    });
    return onboardingLinkedin;
  }

  async getOnboardingLinkedin(id: string) {
    const onboardingLinkedin = await this.prisma.onboardingLinkedin.findUnique({
      where: { id },
    });
    return onboardingLinkedin;
  }
}
