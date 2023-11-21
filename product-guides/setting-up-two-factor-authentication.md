# 🛂 Setting up two-factor authentication

\
Two-factor authentication adds an extra layer of security to your account, beyond just your email/username and password. To enable it, you need to download an Authenticator app on your smartphone. Popular choices include:

* Google Authenticator (available for [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2\&hl=en\&gl=US) and [iOS](https://apps.apple.com/de/app/google-authenticator/id388497605))
* [Microsoft Authenticator](https://www.microsoft.com/en/security/mobile-authenticator-app)
* LastPass Authenticator (available for [Android](https://play.google.com/store/apps/details?id=com.lastpass.authenticator\&hl=en\&gl=US) and [iOS](https://apps.apple.com/de/app/lastpass-authenticator/id1079110004))

Password managers like [1Password](https://1password.com/) or [Bitwarden](https://bitwarden.com/) can also generate your two-factor codes while securing your passwords.

## How does two-factor authentication enhance security?

Without two-factor authentication, logging in to Reactive Resume requires just your email (or username) and password. This is sufficient for many, but it's vulnerable if your password is discovered by someone else.

Two-factor authentication requires a two-step verification process:

1. You'll enter your email/username and password as usual.
2. Then, you'll need a code that only your Authenticator app can generate, which changes periodically.

The chances are slim that a potential intruder has both your login credentials and your mobile phone, making your data much safer.

## How to enable two-factor authentication on Reactive Resume?

Firstly, sign in to your account and head over to the settings page.

In the "Security" section, you will find a sub-section called "Two-Factor Authentication". If you haven't enabled 2FA yet, you should see a button that's labelled "Enable 2FA" like this.

<figure><img src="../.gitbook/assets/Screenshot 2023-11-19 at 2.03.01 PM.png" alt=""><figcaption></figcaption></figure>

Click on the "Enable 2FA" button, and you should be presented with a QR Code that you can scan on your mobile phone. In case you are using your computer to generate two-factor codes, you can also copy the secret link below and paste it in your password manager.

<figure><img src="../.gitbook/assets/Screenshot 2023-11-19 at 2.05.27 PM.png" alt="" width="563"><figcaption></figcaption></figure>

Once you've scanned the QR Code, hit "Continue" and you would be asked to enter the code generated from the authenticator app. When you have successfully entered the correct code, 2FA will be enabled on your account.

You will also be presented with a few backup codes to store for safe keeping. You can use one of these one-time use codes in case you do not have access to your authenticator device.

<figure><img src="../.gitbook/assets/Screenshot 2023-11-19 at 2.07.07 PM.png" alt="" width="563"><figcaption></figcaption></figure>

The next time you login, after having entered your email and password, you would also be asked to enter your one-time password, which is the 6 digit code from your authenticator app.

<figure><img src="../.gitbook/assets/Screenshot 2023-11-19 at 2.14.17 PM.png" alt="" width="563"><figcaption></figcaption></figure>
