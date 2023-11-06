export const ErrorMessage = {
  InvalidCredentials: "It doesn't look like a user exists with the credentials you provided.",
  UserAlreadyExists: "A user with this email address and/or username already exists.",
  SecretsNotFound:
    'User does not have an associated "secrets" record. Please report this issue on GitHub.',
  OAuthUser:
    "This email address is associated with an OAuth account. Please sign in with your OAuth provider.",
  InvalidResetToken:
    "It looks like the reset token you provided is invalid. Please try restarting the password reset process again.",
  InvalidVerificationToken:
    "It looks like the verification token you provided is invalid. Please try restarting the verification process again.",
  EmailAlreadyVerified: "It looks like your email address has already been verified.",
  TwoFactorNotEnabled: "Two-factor authentication is not enabled for this account.",
  TwoFactorAlreadyEnabled: "Two-factor authentication is already enabled for this account.",
  InvalidTwoFactorCode:
    "It looks like the two-factor authentication code you provided is invalid. Please try again.",
  InvalidTwoFactorBackupCode:
    "It looks like the backup code you provided is invalid or used. Please try again.",
  InvalidBrowserConnection:
    "There was an error connecting to the browser. Please make sure `chrome` is running and reachable.",
  ResumeSlugAlreadyExists:
    "A resume with this slug already exists, please pick a different unique identifier.",
  ResumeNotFound: "It looks like the resume you're looking for doesn't exist.",
  ResumeLocked:
    "The resume you want to update is locked, please unlock if you wish to make any changes to it.",
  ResumePrinterError:
    "Something went wrong while printing your resume. Please try again later or raise an issue on GitHub.",
  ResumePreviewError:
    "Something went wrong while grabbing a preview your resume. Please try again later or raise an issue on GitHub.",
  SomethingWentWrong:
    "Something went wrong while processing your request. Please try again later or raise an issue on GitHub.",
} as const;

export type ErrorMessage = typeof ErrorMessage;
