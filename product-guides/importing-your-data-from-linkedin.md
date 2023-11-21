# 🖇 Importing your data from LinkedIn

It can be a painful process to rewrite all your information again and again on every resume builder. However, Reactive Resume tries its best to make that process less stressful.

Although LinkedIn does not provide an API to directly extract profile information from their website, and using a scraper to parse through someone's profile is both highly inefficient and against their terms of service, Reactive Resume offers a simple and legal method to export your data from LinkedIn and import it into the app.

To do this, first log in to your LinkedIn account and navigate to the ["Export your data" page](https://www.linkedin.com/mypreferences/d/download-my-data). If the link doesn't work, you can go to your LinkedIn Settings page, find the section titled "Data Privacy," and click on "Get a copy of your data."

Here, select the option that says “_Download larger data archive, including connections, verifications, contacts, account history, and information we infer about you based on your profile and activity.”_.

<figure><img src="../.gitbook/assets/Screenshot 2023-11-20 at 8.47.27 PM.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
While Reactive Resume doesn't require all of this data, LinkedIn only exports your work experience and education data if you select this option, and skips it if you choose the other one.
{% endhint %}

This process usually takes a little over 15 minutes since you don't have to wait for the entire data export, only the first part that LinkedIn provides. Once you receive an email notification from LinkedIn stating that the first part of your data archive is ready, simply click on the link in the email and download the ZIP archive.

<figure><img src="../.gitbook/assets/Screenshot 2023-11-20 at 9.03.41 PM.png" alt="" width="563"><figcaption></figcaption></figure>

You are free to inspect the contents of this ZIP archive to ensure there are no secrets or personal information (other than what you’ve provided LinkedIn, of course) in the files. Reactive Resume will parse these files accordingly. Any other files will simply be ignored.

{% code lineNumbers="true" fullWidth="false" %}
```
Profile.csv
Email Addresses.csv
Certifications.csv
Education.csv
Languages.csv
Positions.csv
Projects.csv
Skills.csv
```
{% endcode %}

Now that you have downloaded the ZIP archive, go to the [Resumes Dashboard page](https://rxresu.me/dashboard/resumes) on Reactive Resume. Click on the "Import an existing resume" card. This will open a modal where you can choose the file type you want to upload. From the drop-down menu, select "LinkedIn Data Export (.zip)" and choose the file you downloaded from LinkedIn, then click on “Validate”.

<figure><img src="../.gitbook/assets/Screenshot 2023-11-20 at 9.05.09 PM.png" alt="" width="563"><figcaption></figcaption></figure>

If everything’s green, you should be good to import your data from LinkedIn and that’s it. You should immediately see a new resume pop up on your dashboard with data pre-filled from LinkedIn.
