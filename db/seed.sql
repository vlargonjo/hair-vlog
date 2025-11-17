insert into public.product_brands (id, name, website) values
  ('5b0160cb-7f9e-4f8c-8a97-1c6f8ac9b001', 'CurlLab', 'https://curllab.example'),
  ('5b0160cb-7f9e-4f8c-8a97-1c6f8ac9b002', 'DermaHair', 'https://dermahair.example')
on conflict (id) do nothing;

insert into public.products (id, name, brand_id, description, image, price, category, partner_link, tags) values
  ('p_88', 'Moist Curl Cream', '5b0160cb-7f9e-4f8c-8a97-1c6f8ac9b001', 'Крем для увлажнения волнистых и кудрявых волос', '/images/product-curl-cream.png', 19.9, 'styling', 'https://trk.example/p_88', '{увлажнение,кудри}'),
  ('p_21', 'Scalp Detox Serum', '5b0160cb-7f9e-4f8c-8a97-1c6f8ac9b002', 'Сыворотка для кожи головы', '/images/product-scalp-serum.png', 27.5, 'treatment', 'https://trk.example/p_21', '{детокс,кожа головы}')
on conflict (id) do nothing;

insert into public.procedures (id, title, summary, steps, duration, seo_slug) values
  ('proc_01', 'Утренний ритуал для 2B волн', 'Лёгкое очищение и защита от влажности', '["Шаг 1","Шаг 2","Шаг 3"]', 15, 'routine-2b'),
  ('proc_02', 'Spa-вечер для сухих кончиков', 'Глубокое увлажнение и масляная маска', '["Шаг 1","Шаг 2","Шаг 3"]', 40, 'spa-wavy')
on conflict (id) do nothing;

insert into public.ads (id, name, cta, url, metrics) values
  ('ad_01', 'Aurora Haircare', 'Получить пробник', 'https://hair.vlog/advertisers', '{"ctr":4.2,"impressions":12000}')
on conflict (id) do nothing;

