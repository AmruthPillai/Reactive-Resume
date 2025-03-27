# Reactive Resume Documentation

## Overview

Reactive Resume is a free and open-source resume builder that simplifies the process of creating, updating, and sharing your resume. With zero user tracking or advertising, your privacy is a top priority. The platform is extremely user-friendly and can be self-hosted in less than 30 seconds if you wish to own your data completely.

### Key Features

- **Privacy-Focused**: No user tracking or advertising
- **Multiple Languages**: Available in various languages to serve a global audience
- **Real-time Editing**: See changes reflected immediately without waiting
- **Template Variety**: Dozens of templates to choose from
- **Customization**: Drag-and-drop interface for easy customization
- **OpenAI Integration**: Enhance your writing with AI assistance
- **Share Links**: Create personalized links to share with potential employers
- **Usage Tracking**: Track views and downloads of your resume
- **Flexible Layout**: Customize page layout by dragging and dropping sections
- **Font Options**: Multiple font families to choose from
- **Dark Mode**: For a more comfortable viewing experience

## Getting Started

### Setting Up Your Account

Creating an account on Reactive Resume is straightforward and offers the advantage of managing multiple resumes and accessing them across different devices.

1. Go to [https://rxresu.me](https://rxresu.me) and click on "Get Started"
2. Sign in using GitHub, Google, or register with your email address
3. If registering with email, provide your name, email, username, and password
4. Click "Sign up" to create your account
5. Verify your email address by checking for a verification link in your inbox

### Updating Your Profile

If you need to revise your personal information:

1. Navigate to the profile settings
2. Update your name, username, email address, or profile photo
3. If you change your email address, you'll receive a verification link

### Updating Your Password

For security purposes, you may want to periodically update your password:

1. Go to the password settings section
2. Enter your current password for verification
3. Enter and confirm your new password
4. Save changes

### Setting Up Two-Factor Authentication

Enhance your account security with two-factor authentication:

1. Navigate to the security settings
2. Enable two-factor authentication
3. Follow the prompts to set up authentication using your preferred method

## Resume Creation and Management

### Managing Multiple Resumes

Under a single account, you can handle an unlimited number of resumes without restrictions or paywalls. This allows you to create variations tailored to specific job descriptions.

### Real-time Editing

Make changes to your resume and see them reflected on your page immediately. Your updates are "reactive," allowing you to make design decisions without waiting.

### Single or Multi-Column Sections

- Single columns are best for maximum ATS compatibility
- Multi-column layouts can be used when targeting human readers or fitting more information

### Exporting Your Resume as PDF

PDFs are the preferred format for sharing resumes:

1. Navigate to the resume builder screen
2. Scroll to the "Export" section in the right panel
3. Click on the "PDF" button to download your resume

Benefits:
- Free exports with no limitations on the number of downloads
- Fonts are embedded to ensure consistent display across devices
- What you see is exactly what others will see on their devices

### Exporting Your Resume as JSON

For backup or transferring to another system:

1. Go to the resume builder screen
2. Find the "Export" section in the right panel
3. Click on the "JSON" button to save the file to your device

The JSON file contains a snapshot of your resume, including design template, font family, colors, and other metadata.

### Making Your Resume Publicly Available

By default, all resumes are private. To make a resume publicly accessible:

1. Navigate to your resume settings
2. Enable the public visibility option
3. Share the provided link with potential employers

Benefits:
- Track how many people have viewed or downloaded your resume
- Keep your resume updated in real-time for potential employers
- No need to conform to strict page format standards

### Importing Data from LinkedIn

To save time when creating your resume:

1. Export your data from LinkedIn
2. In Reactive Resume, navigate to the import section
3. Upload your LinkedIn data file
4. Review and adjust the imported information as needed

### Creating a Multi-Page Resume

For more comprehensive professional profiles:

1. Add sufficient content to your resume sections
2. Configure page breaks as needed
3. Preview how content flows across pages
4. Adjust section order or content to optimize page layout

## Advanced Features

### Enabling OpenAI Integration

This experimental feature allows you to leverage AI capabilities:

1. Navigate to the Settings page
2. Find the OpenAI Integration section
3. Enter your own OpenAI API key
4. The key is stored in your browser's local storage for security

Note: This feature may undergo changes during development.

### Translating Your Resume with ChatGPT

For international job applications:

1. Enable OpenAI Integration with your API key
2. Use the translation feature to convert your resume content
3. Review and refine the translations as needed

### Using ChatGPT to Rewrite Your Resume

Improve your resume content with AI assistance:

1. Enable OpenAI Integration
2. Select sections you want to enhance
3. Use the rewrite feature to generate alternatives
4. Choose the best version for your final resume

### Changing the Number of Columns for a Section

Customize your layout:

1. Select the section you want to modify
2. Find the column settings in the section properties
3. Choose the desired number of columns
4. Adjust content to fit the new layout

## Self-Hosting and Contributing

### Self-Hosting Reactive Resume Using Docker

For complete data ownership, you can host Reactive Resume on your own server:

1. Ensure Docker and Docker Compose are installed on your system
2. Create a docker-compose.yml file with the required services:
   - Database (Postgres)
   - Storage (MinIO for image uploads)
   - Chrome browser (for PDF printing and previews)
   - Reactive Resume application
3. Configure the necessary environment variables
4. Run Docker Compose to start all services
5. Access your self-hosted instance at the configured URL

The setup works well on standard Linux distributions and can be configured with reverse proxy for public access.

### Contributing to the Project

As an open-source project, Reactive Resume welcomes contributions:

- Code contributions via GitHub
- Sponsorship through GitHub Sponsors or Open Collective
- Translating Reactive Resume into new languages
- Reporting issues and suggesting improvements

## Technical Information

### Tech Stack

Reactive Resume is built with modern technologies:

- Frontend: React (Vite) for a responsive UI
- Backend: Secure API infrastructure
- Database: Robust data storage with privacy focus
- Internationalization: Crowdin for translation management
- Various open-source libraries for enhanced functionality

### How It Works: The Backend

The backend of Reactive Resume is built using modern technologies to provide a secure, scalable API:

#### NestJS Framework

The backend is developed using NestJS, a progressive Node.js framework that provides:
- A modular architecture for organizing the codebase
- TypeScript support for type safety
- Built-in dependency injection for better testability
- API routing and middleware support
- Authentication and authorization mechanisms
- Request validation and transformation

#### Database and ORM

- **PostgreSQL**: Used as the primary database for storing user data and resumes
- **Prisma ORM**: Provides type-safe database access and schema management
- **Data Models**: Structured schemas for users, resumes, and other application data

#### Authentication System

- JWT-based authentication for secure API access
- Refresh token mechanism to maintain user sessions
- Two-factor authentication support for enhanced security
- OAuth integration for login with Google and GitHub

#### Additional Services

- **MinIO**: For object storage (storing avatars, resume PDFs, and previews)
- **Browserless Chrome**: Headless browser for generating PDF exports and previews
- **Redis**: For caching and session management (where applicable)
- **API Endpoints**: Well-structured endpoints for CRUD operations on resumes and user data

### License

Reactive Resume is distributed under the MIT License, which allows for commercial use, distribution, modification, and private use, provided that all copies of the software contain the same license and copyright notices.

## Additional Resources

- [Privacy Policy](https://docs.rxresu.me/meta/privacy-policy)
- [Terms of Service](https://docs.rxresu.me/meta/terms-of-service)
- [GitHub Repository](https://github.com/AmruthPillai/Reactive-Resume)
- [Report Issues](https://github.com/AmruthPillai/Reactive-Resume/issues)

---

*Note: This documentation is based on publicly available information about Reactive Resume as of March 2025. For the most current information, please visit the official website or GitHub repository.*
