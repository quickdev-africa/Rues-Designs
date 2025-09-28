-- Minimal seed data for local/dev
insert into public.categories (id, name, description) values
  ('tabletop','Tabletop','Plates, glassware, cutlery'),
  ('linen','Linen','Tablecloths, runners, napkins')
  on conflict (id) do nothing;

insert into public.products (name, description, price, images, categories, stock_count)
values
  ('Gold Rimmed Charger Plate','Elegant gold-rimmed charger plate',25.00,'{"/images/stock/category-tabletop.png"}','{"tabletop"}',100),
  ('White Satin Tablecloth','Premium white satin tablecloth',35.00,'{"/images/stock/category-linen.png"}','{"linen"}',50)
  on conflict do nothing;
