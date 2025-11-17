create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email citext unique,
  auth_provider varchar(50),
  oauth_id varchar(100),
  created_at timestamptz default timezone('utc', now()),
  marketing_opt_in boolean default false
);

create table if not exists public.hair_analysis (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id),
  upload_id uuid,
  hair_type varchar(50),
  dryness_score int,
  curl_score int,
  recommendations jsonb,
  created_at timestamptz default timezone('utc', now())
);

create table if not exists public.product_brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website text,
  description text,
  created_at timestamptz default timezone('utc', now())
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand_id uuid references public.product_brands(id),
  description text,
  image text,
  price numeric,
  category varchar(50),
  partner_link text,
  tags text[],
  created_at timestamptz default timezone('utc', now())
);

create table if not exists public.procedures (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  steps jsonb not null,
  duration int,
  seo_slug text unique,
  created_at timestamptz default timezone('utc', now())
);

create table if not exists public.recommendations (
  id uuid primary key default gen_random_uuid(),
  analysis_id uuid references public.hair_analysis(id),
  data jsonb not null,
  created_at timestamptz default timezone('utc', now())
);

create table if not exists public.uploads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id),
  s3_key text,
  encrypted boolean default true,
  save_allowed boolean default false,
  status varchar(20),
  created_at timestamptz default timezone('utc', now())
);

create table if not exists public.ads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  cta text,
  image text,
  url text,
  metrics jsonb,
  created_at timestamptz default timezone('utc', now())
);

