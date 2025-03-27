-- Storage Bucket Policies for Supabase

-- Resumes Bucket Policies
-- Anyone can read public resumes, but only owners can write/update/delete
create policy "Public resume pdfs are viewable by everyone"
on storage.objects for select
using (
  bucket_id = 'resumes' and
  (storage.foldername(name))[1] in (
    select id::text from resumes where visibility = 'public'
  )
);

create policy "Users can upload their own resume pdfs"
on storage.objects for insert
with check (
  bucket_id = 'resumes' and
  auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can update their own resume pdfs"
on storage.objects for update
using (
  bucket_id = 'resumes' and
  auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can delete their own resume pdfs"
on storage.objects for delete
using (
  bucket_id = 'resumes' and
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Pictures Bucket Policies
-- Public profile pictures are viewable by everyone
create policy "Profile pictures are publicly viewable"
on storage.objects for select
using (bucket_id = 'pictures');

create policy "Users can upload their own pictures"
on storage.objects for insert
with check (
  bucket_id = 'pictures' and
  auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can update their own pictures"
on storage.objects for update
using (
  bucket_id = 'pictures' and
  auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can delete their own pictures"
on storage.objects for delete
using (
  bucket_id = 'pictures' and
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Previews Bucket Policies
-- Preview images follow the same visibility rules as resumes
create policy "Public resume previews are viewable by everyone"
on storage.objects for select
using (
  bucket_id = 'previews' and
  (storage.foldername(name))[1] in (
    select id::text from resumes where visibility = 'public'
  )
);

create policy "Users can view their own resume previews"
on storage.objects for select
using (
  bucket_id = 'previews' and
  auth.uid()::text = (
    select user_id::text
    from resumes
    where id::text = (storage.foldername(name))[1]
  )
);

create policy "Users can upload previews for their own resumes"
on storage.objects for insert
with check (
  bucket_id = 'previews' and
  auth.uid()::text = (
    select user_id::text
    from resumes
    where id::text = (storage.foldername(name))[1]
  )
);

create policy "Users can update previews for their own resumes"
on storage.objects for update
using (
  bucket_id = 'previews' and
  auth.uid()::text = (
    select user_id::text
    from resumes
    where id::text = (storage.foldername(name))[1]
  )
);

create policy "Users can delete previews for their own resumes"
on storage.objects for delete
using (
  bucket_id = 'previews' and
  auth.uid()::text = (
    select user_id::text
    from resumes
    where id::text = (storage.foldername(name))[1]
  )
);

-- Create security definer function to check resume ownership
create or replace function check_resume_owner(resume_id uuid)
returns boolean
language plpgsql
security definer
as $$
begin
  return exists (
    select 1
    from resumes
    where id = resume_id
    and user_id = auth.uid()
  );
end;
$$;