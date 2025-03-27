# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in project details:
   - Name: reactive-resume (or your preferred name)
   - Database Password: Generate a strong password
   - Region: Choose closest to your users
4. Click "Create Project"

## 2. Create Storage Buckets

1. Go to Storage section in Supabase dashboard
2. Create the following buckets:
   ```
   resumes (for PDF files)
   - Access: public
   - File size limit: 10MB
   - Allowed MIME types: application/pdf

   pictures (for user avatars)
   - Access: public
   - File size limit: 5MB
   - Allowed MIME types: image/jpeg, image/png

   previews (for resume previews)
   - Access: public
   - File size limit: 5MB
   - Allowed MIME types: image/jpeg
   ```

## 3. Apply Database Schema

1. Go to SQL Editor in Supabase dashboard
2. Copy content from schema.sql
3. Execute the SQL to create:
   - Custom types
   - Tables (resumes, statistics)
   - Indexes
   - RLS policies
   - User table extensions
   - Triggers and functions

## 4. Configure Authentication

1. Go to Authentication settings
2. Enable the following providers:
   - Email with magic link
   - Google OAuth
   - GitHub OAuth
3. Configure each provider:
   ```
   Email:
   - Enable "Confirm email"
   - Customize email templates if needed

   Google OAuth:
   - Create project in Google Cloud Console
   - Add OAuth credentials
   - Configure redirect URL

   GitHub OAuth:
   - Create GitHub OAuth App
   - Add Client ID and Secret
   - Configure redirect URL
   ```

## 5. Update Environment Variables

Add these variables to your .env file:
```
SUPABASE_URL=your-project-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=your-connection-string
```

## 6. Security Checklist

1. Verify RLS policies are active
2. Test public/private resume access
3. Verify storage bucket permissions
4. Test authentication flows

## 7. Testing

1. Create a test user
2. Create a resume
3. Upload a PDF
4. Test public/private visibility
5. Verify statistics tracking

## Common Issues

1. RLS Policy Issues:
   - Verify policies are enabled
   - Check policy conditions
   - Test with both authenticated and anonymous users

2. Storage Access:
   - Verify bucket permissions
   - Check CORS settings if needed
   - Test file uploads/downloads

3. Authentication:
   - Verify OAuth redirect URLs
   - Test email confirmation flow
   - Check user metadata handling

## Next Steps

1. Integrate Supabase client in frontend
2. Update API calls to use Supabase
3. Test deployment workflow