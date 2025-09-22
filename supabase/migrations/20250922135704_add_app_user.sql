create role app_user login password 'REDACTED';
grant usage on schema public to app_user;
grant select, insert, update, delete on all tables in schema public to app_user;
grant usage, select on all sequences in schema public to app_user;
alter default privileges in schema public grant select, insert, update, delete on tables to app_user;
alter default privileges in schema public grant usage, select on sequences to app_user;
grant app_user to postgres;
create policy users_self_select
on users_data
for select
using (id = auth.uid());

create policy users_select_their_todos
on todos 
for select
using  (user_id = auth.uid());
