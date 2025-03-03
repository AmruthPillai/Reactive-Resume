import process from "node:process";

import { vi } from "vitest";

import { ResumeController } from "../resume/resume.controller";
import { mockUserWithoutPRI } from "./mocks/mocks";

describe("ResumeController", async () => {
  ///
  /// To mock we can't use the standard import. Instead, use vi.importMock.
  /// You can use both the mocked version and the production version in the same scope if
  /// you rename on of the import types using 'as'
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const { ResumeService } = await vi.importMock<typeof import("../resume/resume.service")>(
    "../resume/resume.service",
  );
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const { SearchService } = await vi.importMock<typeof import("../search/search.service")>(
    "../search/search.service",
  );

  // @ts-expect-error We mock return values so we don't need to parse to the constructor
  const mockResumeService = new ResumeService();
  // @ts-expect-error We mock return values so we don't need to parse to the constructor
  const mockSearchService = new SearchService();

  const resumeController: ResumeController = new ResumeController(
    mockResumeService,
    mockSearchService,
  );
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("setDefault", () => {
    it("should set a cv as a default profile page", async () => {
      const user = mockUserWithoutPRI;
      const profileResumeId = "resumeId";

      // eslint-disable-next-line @typescript-eslint/unbound-method
      vi.mocked(mockResumeService.setDefault).mockResolvedValue({
        // @ts-expect-error The object returned gives error but still works.
        message: "Resume set as profile successfully",
      });

      expect(await resumeController.setDefault(user, profileResumeId)).toEqual({
        message: "Resume set as profile successfully",
      });
    });

    it("should handle errors when setting a cv as a default profile page", async () => {
      const user = mockUserWithoutPRI;
      const profileResumeId = "resumeId";

      // eslint-disable-next-line @typescript-eslint/unbound-method
      vi.mocked(mockResumeService.setDefault).mockRejectedValue({
        message: "Failed to set resume as profile",
      });

      await expect(resumeController.setDefault(user, profileResumeId)).rejects.toThrow(
        "Failed to set resume as profile",
      );
    });
  });
});

describe(".env values example", () => {
  ///
  /// .env file variables only work in test if they start with 'VITE_'
  ///
  // @ts-expect-error May be undefined.
  const postgresPort: number = +process.env.VITE_POSTGRES_PORT;

  it("should return postgres port", () => {
    expect(postgresPort).toBe(5432);
  });
});
