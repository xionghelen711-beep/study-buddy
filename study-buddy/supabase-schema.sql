create table if not exists public.learning_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.learning_progress enable row level security;

create policy "Users can read their own progress"
  on public.learning_progress for select using (auth.uid() = user_id);
create policy "Users can insert their own progress"
  on public.learning_progress for insert with check (auth.uid() = user_id);
create policy "Users can update their own progress"
  on public.learning_progress for update using (auth.uid() = user_id);
