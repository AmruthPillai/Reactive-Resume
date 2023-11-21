# 🧠 Enabling OpenAI Integration

{% hint style="info" %}
This feature is in an experimental phase and could undergo many changes throughout the development of the app.
{% endhint %}

OpenAI has been a game-changer for all of us. I cannot tell you how much ChatGPT has helped me in my everyday work and with the development of Reactive Resume. It only makes sense that you leverage what AI has to offer and let it help you build the perfect resume.

While most applications out there charge you a fee to use their AI services (rightfully so, because it isn't cheap), you can choose to enter your own OpenAI API key on the Settings page (under OpenAI Integration). **The key is stored in your browser's local storage**, which means that if you uninstall your browser, or even clear your data, the key is gone with it. All requests made to OpenAI are also sent directly to their service and does not hit the app servers at all.

The policy behind "bring your own key" (BYOK) is [still being discussed](https://community.openai.com/t/openais-bring-your-own-key-policy/14538/46) and probably might change over a period of time, but while it's available, I would keep the feature on the app.

{% hint style="info" %}
You are free to turn off all AI features (and not be aware of its existence) simply by not adding a key in the Settings page and still make use of all the useful features that Reactive Resume has to offer.

**I would even suggest you to take the extra step of using ChatGPT to write your content, and simply copy it over to Reactive Resume.**
{% endhint %}

## How to get an OpenAI API key?

Firstly, create an account on OpenAI if you don't already have one. For the purposes of being brief, I'll not go over how to set up an OpenAI account. There should be enough guides on the internet to do this, which would explain the process much better than I can.

{% hint style="info" %}
OpenAI might ask you for your credit card information depending on where you are located, or if you already have an account.
{% endhint %}

Head over to the [OpenAI Platform](https://platform.openai.com/apps) page and click on the API section.

<figure><img src="../.gitbook/assets/Screenshot 2023-11-19 at 2.18.46 PM.png" alt="" width="563"><figcaption></figcaption></figure>

Now, head over to the [API keys page](https://platform.openai.com/api-keys) on the left navigation where you can manage all your API keys and click on the link that says "Create a new secret key". You can call the key anything you want, but it helps to name it after the application you are going to use the specific key for.

<figure><img src="../.gitbook/assets/Screenshot 2023-11-19 at 2.22.26 PM.png" alt="" width="563"><figcaption></figcaption></figure>

Once you click on "Create secret key", you should be presented with an API key that you can now use in Reactive Resume. The key would only be visible to you once, so make sure you store it somewhere safe at this screen.

<figure><img src="../.gitbook/assets/Screenshot 2023-11-19 at 2.23.46 PM.png" alt="" width="563"><figcaption></figcaption></figure>

{% hint style="info" %}
The secret key in the screenshot would be disabled by the time you read this, so there's no point in trying to use this one. It's pretty straightforward to create one on your own and it shouldn't cost you unless you go over the Free Credits Limit.
{% endhint %}

Your key should begin with `sk-`, this is how Reactive Resume validates that the key is indeed an OpenAI API key.

## Enabling OpenAI in Reactive Resume

Once you have the secret key from OpenAI, head over to the settings page in Reactive Resume, and to the sub-section named "OpenAI Integration".

Here, you can enter the API key provided, and click on "Store Locally".

<figure><img src="../.gitbook/assets/Screenshot 2023-11-19 at 2.27.38 PM.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
Your API key is securely stored in the browser's local storage and is only utilized when making requests to OpenAI via their official SDK. Rest assured that your key is not transmitted to any external server except when interacting with OpenAI's services.
{% endhint %}

Now, you should be able to see some new sections pop up in the Resume Builder screen where you can take advantage of all the one-click AI actions.

<figure><img src="../.gitbook/assets/Screenshot 2023-11-19 at 2.53.01 PM.png" alt=""><figcaption></figcaption></figure>
