-- Enable the necessary extensions
create extension if not exists "uuid-ossp";

-- Custom types
create type visibility_type as enum ('public', 'private');

-- Resume table
create table if not exists resumes (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null,
  data jsonb default '{}',
  visibility visibility_type default 'private',
  locked boolean default false,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  -- Constraints
  unique(user_id, slug),
  constraint resumes_user_id_fkey foreign key (user_id) references auth.users(id) on delete cascade
);

-- Statistics table
create table if not exists statistics (
  id uuid default uuid_generate_v4() primary key,
  views integer default 0,
  downloads integer default 0,
  resume_id uuid unique references resumes(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint statistics_resume_id_fkey foreign key (resume_id) references resumes(id) on delete cascade
);

-- Add indexes
create index if not exists resumes_user_id_idx on resumes(user_id);
create index if not exists statistics_resume_id_idx on statistics(resume_id);

-- Add RLS (Row Level Security) policies
alter table resumes enable row level security;
alter table statistics enable row level security;

-- Resumes policies
create policy "Users can view their own resumes"
  on resumes for select
  using (auth.uid() = user_id);

create policy "Users can insert their own resumes"
  on resumes for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own resumes"
  on resumes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own resumes"
  on resumes for delete
  using (auth.uid() = user_id);

create policy "Public resumes are viewable by everyone"
  on resumes for select
  using (visibility = 'public');

-- Statistics policies
create policy "Users can view statistics for their own resumes"
  on statistics for select
  using (
    exists (
      select 1 from resumes
      where resumes.id = statistics.resume_id
      and resumes.user_id = auth.uid()
    )
  );

create policy "Users can update statistics for their own resumes"
  on statistics for update
  using (
    exists (
      select 1 from resumes
      where resumes.id = statistics.resume_id
      and resumes.user_id = auth.uid()
    )
  );

-- Extend auth.users with additional fields
alter table auth.users add column if not exists username text unique;
alter table auth.users add column if not exists locale text default 'en-US';
alter table auth.users add column if not exists picture text;

-- Functions
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  new.username := new.raw_user_meta_data->>'username';
  new.locale := coalesce(new.raw_user_meta_data->>'locale', 'en-US');
  new.picture := new.raw_user_meta_data->>'picture';
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new users
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Add update timestamp triggers
create trigger update_resumes_updated_at
  before update on resumes
  for each row execute procedure update_updated_at_column();

create trigger update_statistics_updated_at
  before update on statistics
  for each row execute procedure update_updated_at_column();