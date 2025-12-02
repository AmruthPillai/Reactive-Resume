/**
 * Centralized error message enum for consistent error handling across the application.
 * Used by both client and server to provide user-friendly error messages.
 *
 * @example
 * ```typescript
 * // Server-side usage
 * throw new BadRequestException(ErrorMessage.InvalidCredentials);
 *
 * // Client-side usage
 * if (error.message === ErrorMessage.UserAlreadyExists) {
 *   showError("This email is already registered");
 * }
 * ```
 */
export enum ErrorMessage {
  InvalidCredentials = "InvalidCredentials",
  UserAlreadyExists = "UserAlreadyExists",
  UserNotFound = "UserNotFound",
  SecretsNotFound = "SecretsNotFound",
  OAuthUser = "OAuthUser",
  InvalidResetToken = "InvalidResetToken",
  InvalidVerificationToken = "InvalidVerificationToken",
  InvalidRefreshToken = "InvalidRefreshToken",
  InvalidTokenPayload = "InvalidTokenPayload",
  InvalidTokenGrantType = "InvalidTokenGrantType",
  EmailAlreadyVerified = "EmailAlreadyVerified",
  TwoFactorNotEnabled = "TwoFactorNotEnabled",
  TwoFactorAlreadyEnabled = "TwoFactorAlreadyEnabled",
  InvalidTwoFactorCode = "InvalidTwoFactorCode",
  InvalidTwoFactorBackupCode = "InvalidTwoFactorBackupCode",
  InvalidBrowserConnection = "InvalidBrowserConnection",
  ResumeSlugAlreadyExists = "ResumeSlugAlreadyExists",
  ResumeNotFound = "ResumeNotFound",
  ResumeLocked = "ResumeLocked",
  ResumePrinterError = "ResumePrinterError",
  ResumePreviewError = "ResumePreviewError",
  SomethingWentWrong = "SomethingWentWrong",
}
