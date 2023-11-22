# 🧠 Use ChatGPT to rewrite your resume

ChatGPT is a very powerful tool that can help you in your resume writing process, fixing spelling and grammar errors or even with targeting your content to match a specific job description.

In this guide, I explain in detail how to export your resume from Reactive Resume as a JSON, feed it into ChatGPT along with a helpful prompt which would result in another JSON which can be imported back into Reactive Resume.

For those already familiar with the process, you can check out this conversation I had with ChatGPT where it rewrote my resume content to sound more professional and to infuse technical keywords that make the resume stand out.

First, head over to the resume you want to rewrite and scroll down to the “Export" section on the right-hand side panel. Click on the button titled “JSON" and you should immediately have downloaded a copy of your resume onto your device.

Now, let's go to ChatGPT and write a prompt that accepts a JSON as the input and ask it to rewrite the content to sound more professional. You could also give it some more context about the job description you are applying to and it should generate a result that's targeting the classified.

You could use this prompt as a reference:

{% code overflow="wrap" %}
```
You are a professional resume writer experienced in technical domains pertaining to Web Development. You are also aware of the JSON file format and must remember that the keys of the JSON file should not be changed, only the values inside of them.

You are free to rewrite the content in any field except for the values under keys such as “id", “url" or any of the entries under “metadata".

Please rewrite the content of this JSON:
"""
[paste JSON content here]
"""
```
{% endcode %}

In the above prompt, simply replace the `[paste JSON content here]` placeholder with the contents from your exported JSON file.

Now, hit **Enter** and watch the magic unfold! ✨

Once ChatGPT has finished it's response and you have the completed JSON output, copy it over and create a new file on your device with these contents. It can be called anything, but make sure it has the file extension `.json`.

Now, you can head on over back to Reactive Resume and to the Resumes Dashboard page. Here, click on the card that says “Import your resume". This opens up a dialog where you can import resumes from various sources, such as JSON Resume, LinkedIn Data Export or even previous versions of Reactive Resume.

Select “Reactive Resume" from the drop-down menu and select the file that you just created. Click on validate to ensure that the format is correct and ChatGPT has not messed up the underlying schema of the file.

If everything's green, you can now import the resume and continue working on it within the app, making further edits or immediately export it as a PDF.
