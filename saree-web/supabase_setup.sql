-- Create the sarees table
create table public.sarees (
  id uuid not null default gen_random_uuid (),
  title text not null,
  price numeric not null,
  material text not null,
  description text not null,
  category text not null,
  image_url text not null,
  created_at timestamp with time zone not null default now(),
  constraint sarees_pkey primary key (id)
);

-- Enable Row Level Security (RLS)
alter table public.sarees enable row level security;

-- Create a bucket for saree images
insert into storage.buckets (id, name, public) values ('sarees', 'sarees', true);

-- Policy: Allow public read access to sarees table
create policy "Enable read access for all users" on public.sarees
  for select
  to public
  using (true);

-- Policy: Allow authenticated users (owner) to insert/update/delete sarees
create policy "Enable insert for authenticated users only" on public.sarees
  for insert
  to authenticated
  with check (true);

create policy "Enable update for authenticated users only" on public.sarees
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Enable delete for authenticated users only" on public.sarees
  for delete
  to authenticated
  using (true);

-- Policy: Allow public read access to storage bucket
create policy "Give public access to saree images" on storage.objects
  for select
  to public
  using (bucket_id = 'sarees');

-- Policy: Allow authenticated users to upload images
create policy "Enable upload for authenticated users only" on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'sarees');

-- Policy: Allow authenticated users to update images
create policy "Enable update for authenticated users only" on storage.objects
  for update
  to authenticated
  using (bucket_id = 'sarees');

-- Policy: Allow authenticated users to delete images
create policy "Enable delete for authenticated users only" on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'sarees');
