# 🇦🇮 Translate your resume with ChatGPT

ChatGPT, even the free version, is capable of translating your resume into many different languages if you need to.

In this guide, I go through the basics of how to export your resume in JSON format and funnel it into ChatGPT with the appropriate prompt. Once you have the resulting translated JSON, simply import it back into Reactive Resume and you can then make further edits appropriate for the locale.

{% hint style="info" %}
Here's an example conversation I had with ChatGPT, translating a sample resume originally written in English into German:\
\
[https://chat.openai.com/share/50ec9a4b-6a94-431f-abb4-89ae1699439f](https://chat.openai.com/share/50ec9a4b-6a94-431f-abb4-89ae1699439f)
{% endhint %}

This guide assumes you already have an account with OpenAI (or ChatGPT specifically) and that you already have your resume in a language of your choice. We'll pick a resume that's written in English and translate it to German.

First, head over to your resume on Reactive Resume and scroll down to the “Export” section on the right panel. Here, you have two options, to export the resume as JSON, or as a PDF.

Once you click on the Export as JSON button, you should see the file downloaded on your device. Open up the file in any code editor (or even Notepad) and copy all of it's contents.

Now, you can head over to ChatGPT and enter this prompt:

{% code overflow="wrap" fullWidth="true" %}
```
You function as a specialized language translator with a focus on converting [source language] text into [target language]. Your expertise extends to understanding the JSON format, and you're cognizant that within this structure, only the values are to be converted into [target language] while the keys must remain in [source language]. Furthermore, you are to retain specific keys such as "id" and "url" in their original language, as well as any key found within the "metadata" section of the schema, without translating them.

Here is the JSON:
"""
[paste JSON content here]
"""
```
{% endcode %}

In the above prompt, simply replace the placeholders `[source language]` and `[target language]` with the current language of your resume and the language you want to translate to, respectively. Then, replace the `[paste JSON content here]` placeholder with the contents from your exported JSON file.

Now, hit **Enter** and watch the magic unfold! ✨

<figure><img src="../.gitbook/assets/Screenshot 2023-11-20 at 7.53.32 PM.png" alt=""><figcaption></figcaption></figure>

Once ChatGPT has finished it's response and you have the completed JSON output, copy it over and create a new file on your device with these contents. It can be called anything, but make sure it has the file extension `.json`.

Now, you can head on over back to Reactive Resume and to the Resumes Dashboard page. Here, click on the card that says “Import your resume". This opens up a dialog where you can import resumes from various sources, such as JSON Resume, LinkedIn Data Export or even previous versions of Reactive Resume.

Select “Reactive Resume" from the drop-down menu and select the file that you just created. Click on validate to ensure that the format is correct and ChatGPT has not messed up the underlying schema of the file.

<figure><img src="../.gitbook/assets/Screenshot 2023-11-20 at 7.54.31 PM.png" alt=""><figcaption></figcaption></figure>

If everything's green, you can now import the resume and continue working on it within the app, making further edits that are specific to the region you are applying to. For example, it's uncommon for resumes in Germany to have a photo in them, so we can simply remove the photo by clicking on the picture.

<figure><img src="../.gitbook/assets/Screenshot 2023-11-20 at 7.55.24 PM.png" alt="" width="563"><figcaption></figcaption></figure>

And that's how you can translate your resume into any language you want and maximize your chances of getting through to the career path of your dreams!
