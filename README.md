# Всё о волосах — MVP ТЗ

## 1. Введение
- **Цель:** быстро проверить спрос на 2D-примерку причёсок и персональные рекомендации, запустить партнёрские продажи косметики и нативную рекламу.
- **Срок реализации:** 8 недель (4 спринта по 2 недели, готовность к запуску пилота в конце недели 8).
- **Бюджет:** ориентировочно €60k (зарплаты команды, инфраструктура, маркетинг на запуск).
- **Успех:** ≥5k MAU обслуживаются без деградации, ≥10% пользователей доходят до результата анализа и видят партнёрские ссылки.

## 2. Scope MVP
**Включено:** загрузка фото, 2D-примерка с регулировкой, тест-опросник, расчёт типа волос и советов, персональные рекомендации, каталог косметики и процедур, блог-страницы, брендовый лендинг, партнёрские ссылки, базовая аналитика, гость + OAuth2 логин, опция «не сохранять фото», админ-lite для контента.  
**Исключено:** 3D/AR, сложные CV/ML модели, мобильные приложения, подписки/платежи, многоязычность, продвинутый CMS, офлайн-режим.

## 3. Фичи
1. **Загрузка фото**: drag-n-drop/web upload, webp/png/jpg ≤10MB, валидация лица, опция «не сохранять», отображение прогресса.  
2. **2D-примерка**: face-api.js или MediaPipe face mesh, каталоги причёсок/цветов, ручная настройка маски, кнопки «Скачать», «Поделиться», «Сохранить».  
3. **Тест-опросник**: 8–10 вопросов, прогресс-бар, сохранение состояния, выдача типа волос <5 сек.  
4. **Рекомендации**: комбинируются результаты теста + параметры фото, минимум 3 совета, подборка товаров с UTM-партнёрками.  
5. **Каталог косметики**: фильтры по типу волос/категории, карточки с CTA «Купить», трекинг кликов.  
6. **Процедуры и блог**: SEO-friendly страницы (SSR), контент из БД, rich text.  
7. **Брендовый лендинг**: value prop, аудитория, кейсы, форма «Запросить медиакит».  
8. **Профили/сессии**: guest mode, OAuth2 (Google/Facebook) + email, история анализов при согласии.  
9. **Аналитика**: GA4 + Amplitude (опционально), события upload_start, try_on_complete, partner_click, share, test_finish.  
10. **Админ-lite**: авторизованный CRUD продуктов, процедур, блоговых материалов.  
11. **Безопасность**: шифрование фото AES-256 до отправки в S3, retention 24h, GDPR/152-ФЗ соответствие, rate limiting.

## 4. Техническая архитектура
- **Frontend:** Next.js (SSR для SEO) + React + Tailwind CSS; face-api.js/MediaPipe для face mesh; Zustand или Redux Toolkit для состояния; интеграция GA/Amplitude.  
- **Backend:** Node.js (NestJS предпочтительно) + Express adapter, REST API, JWT, Redis (сессии/кэш), PostgreSQL, TypeORM/Prisma.  
- **Storage:** S3-compatible (AWS S3 или DigitalOcean Spaces), объектное хранение шифрованных изображений, lifecycle policy для автоудаления.  
- **ML/CV:** rule-based overlay + face mesh, без обучения модели; конфигурации в `saved_models`.  
- **Infra:** Docker Compose на VPS для MVP, возможность миграции в Kubernetes (GKE/ECS). CDN CloudFront/Cloudflare, WAF + rate limiting. CI/CD GitHub Actions → staging → production.  
- **Поток данных:** клиент загружает фото → фронтенд проверяет/масштабирует → backend выдаёт signed URL → фото (шифрованное) отправляется в S3 (при согласии) → результаты анализа и опроса сохраняются в PostgreSQL → рекомендации формируются и возвращаются → события уходят в GA/Amplitude.  
- **Диаграмма словами:** Пользователь → Next.js SSR страницы → API Gateway (NestJS) → Redis (сессии/кэш) и PostgreSQL (данные) → S3 (если сохранение) → CDN обслуживает статику/медиа; аналитика параллельно.

## 5. API Spec
| Метод | URI | Body | Response | Ошибки |
| --- | --- | --- | --- | --- |
| POST | `/api/v1/uploads` | multipart `photo`, `save` (bool) | `201` `{uploadId, expiresAt}` | `400 invalid_type`, `413 limit`, `422 face_missing` |
| POST | `/api/v1/analyze` | `{uploadId?, meshData?, testAnswers[], prefSave}` | `200` `{analysisId, hairType, tips[], products[]}` | `400 missing_inputs`, `409 upload_expired`, `422 analysis_error` |
| GET | `/api/v1/analyses/{id}` | – | `200` `{analysis, recommendations}` | `404` |
| GET | `/api/v1/products` | `?hairType&category&page` | `200` `{items[], total}` | `500` |
| POST | `/api/v1/sessions` | `{authType, token?}` | `200` `{sessionId, user}` | `401 invalid_token` |
| DELETE | `/api/v1/uploads/{id}` | – | `204` | `404`, `409 already_deleted` |
| POST | `/api/v1/brand-leads` | `{company, email, message, budget?}` | `202` `{leadId}` | `400 validation_error` |

**Пример ответа `/analyze`:**
```json
{
  "analysisId": "a_123",
  "hairType": "Wavy-2B",
  "issues": ["Dry ends"],
  "tips": [
    "Используйте бессульфатный шампунь дважды в неделю",
    "Добавьте увлажняющую маску с алоэ"
  ],
  "recommendedProducts": [
    {"id": "p_88", "name": "Moist Curl Cream", "partnerLink": "https://trk.example/p_88"}
  ],
  "shareCard": {
    "title": "Мои волосы: 2B волны",
    "cta": "Посмотреть подборку"
  }
}
```

**Пример карточки результата (JSON):**
```json
{
  "title": "Ваш тип волос: 2B Волнистые",
  "summary": "Умеренно волнистые, склонные к сухости",
  "careRoutine": [
    {"step": "Очищение", "product": "Gentle Low-Poo"},
    {"step": "Увлажнение", "product": "Aloe Mask"}
  ],
  "nextActions": ["Сохранить подборку", "Поделиться результатом"],
  "shareLink": "https://hair.vlog/r/a_123"
}
```

## 6. DB Schema (PostgreSQL)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email CITEXT UNIQUE,
  auth_provider VARCHAR(50),
  oauth_id VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT now(),
  marketing_opt_in BOOLEAN DEFAULT false
);

CREATE TABLE sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  guest BOOLEAN DEFAULT true,
  redis_key VARCHAR(128),
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ
);

CREATE TABLE uploads (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  s3_key TEXT,
  encrypted BOOLEAN DEFAULT true,
  save_allowed BOOLEAN DEFAULT false,
  status VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE analyses (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  upload_id UUID REFERENCES uploads(id),
  hair_type VARCHAR(50),
  dryness_score INT,
  curl_score INT,
  recommendations JSONB,
  test_answers JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE saved_models (
  id UUID PRIMARY KEY,
  version VARCHAR(20),
  description TEXT,
  config JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE products (
  id UUID PRIMARY KEY,
  name TEXT,
  brand TEXT,
  hair_types TEXT[],
  category VARCHAR(50),
  price NUMERIC,
  partner_link TEXT,
  available BOOLEAN DEFAULT true,
  metadata JSONB
);

CREATE TABLE procedures (
  id UUID PRIMARY KEY,
  title TEXT,
  summary TEXT,
  steps JSONB,
  duration INT,
  seo_slug TEXT UNIQUE
);
```

**Пример SQL INSERT:**
```sql
INSERT INTO products (id,name,brand,hair_types,category,price,partner_link)
VALUES ('p_88','Moist Curl Cream','CurlLab','{Wavy-2B}','styling',19.90,'https://trk.example/p_88');
```

## 7. UI/UX
**Экраны (desktop + mobile):**
- Главная: hero, CTA «Загрузить фото», блок «Как работает», блог-тизеры, отзывы, футер.
- Примерка: загрузка/история, канва, панель выбора причесок/цветов, тумблер «Не сохранять», CTA «Скачать», «Поделиться».
- Тест-опросник: прогресс-бар, карточка вопроса, радио/чекбоксы, CTA «Далее», «Назад».
- Результат: карточка типа волос, показатели (влажность/пористость), советы, продукты, CTA «Каталог», «Сохранить PDF».
- Каталог продуктов: фильтры, сортировка, сетка карточек, CTA «Купить», badge «Партнёр».
- Лэндинг брендов: value prop, аудитория, кейсы, форма заявки.
- Дополнительно: страницы процедур, блог, профиль/настройки, страница ошибки.

**Wireframe-описания 6 страниц:**
1. **Главная:** верхнее меню (Лого, Каталог, Блог, Партнёрам, Войти); hero с фоном модели, CTA «Попробовать примерку» + вторичный «Пройти тест»; блок «3 шага» с иконками; раздел «Популярные процедуры» (3 карточки); отзыв; футер (контакты, соцсети, политика).  
2. **Примерка:** лево — панель загрузки + мини-лист сохранённых; центр — канва с фото и маской; справа — вкладки «Прически», «Цвет», «Аксессуары» с превью; низ — кнопки «Скачать», «Поделиться», тумблер «Сохранить фото?».  
3. **Тест:** header с прогрессом (Шаг 3/10), карточка вопроса с иконкой, варианты в виде chips, CTA «Далее», «Назад», инфолиния «Осталось 2 мин».  
4. **Результат:** карточка «Ваш тип 2B» с иконкой, показатели в progress-bar, блок «Советы» (чек-лист), карусель продуктов, CTA «Перейти в каталог», блок «Поделиться результатом».  
5. **Каталог продуктов:** фильтры сверху (тип волос, задача, цена), переключатель список/сетка, карточки с фото/ценой/CTA, баннер партнёра, пагинация.  
6. **Лэндинг брендов:** hero с метриками (DAU, CTR), блок «Что получаете» (3 иконки), кейсы в карточках, слайдер аудиторий, форма «Запросить медиакит» (Имя, Бренд, Email, Бюджет, Сообщение), FAQ аккордеон.

## 8. Roadmap и Sprint Plan
| Спринт | Недели | Цели |
| --- | --- | --- |
| 1 | 1–2 | Архитектура, дизайн-система, загрузка/валидация фото, базовый backend (auth guest, CRUD продуктов), инфраструктура Docker Compose. |
| 2 | 3–4 | Face mesh + overlay, тест-опросник, расчёт результатов, каталог UI, события аналитики. |
| 3 | 5–6 | Рекомендации, партнёрские ссылки, процедуры/блог, бренд лендинг, админ-lite, ретеншн политики. |
| 4 | 7–8 | Перфоманс, шифрование фото, безопасность, QA/автотесты, маркетинговый контент, подготовка запуска. |

## 9. Команда и оценки
- Product Manager / Tech Architect (0.5 FTE)
- Backend Lead (1)
- Frontend Engineers (2)
- Backend Engineer (1)
- Fullstack/Integration (0.5)
- CV/ML Engineer (0.5)
- UX/UI Designer (1)
- QA Engineer (0.5)
- DevOps (0.3)
- Content & Partnerships (0.5)

Оценка: ~960 человеко-часов (≈6 FTE * 4 недели активной разработки + QA/Go-live).

## 10. Acceptance Criteria и тесткейсы
- **Upload:** файл 9MB → 201; файл 12MB → 413; при `save=false` запись в S3 отсутствует; при отсутствии лица → 422.  
- **Try-on:** без логина доступна канва; маска корректно следует при наклонах ±15°; кнопка «Скачать» выдаёт PNG.  
- **Test:** 10 вопросов, восстановление после refresh (localStorage); время ответа <3 сек.  
- **Result:** тип волос, ≥3 совета, ≥2 продукта; share-кнопка копирует UTM-ссылку; CTA «Каталог» ведёт на `/products`.  
- **Catalog:** фильтры комбинируются; отклик API <300 мс при кэшированном ответе; клики по партнёрской ссылке логируются.  
- **Brand lead:** валидация email, при успехе запись в CRM + письмо; rate limit 5 запросов/IP/час.  
- **Security:** опция «Не сохранять» отключает запись в uploads; cron удаляет временные файлы ≤24h; TLS enforced.  
- **Performance:** API выдерживает 50 req/min/IP, 99.9% SLA при горизонтальном масштабировании.  
- **QA данные:** `guest_001`, `oauth_google_demo`, фото `test_curly.jpg`, анализ `a_demo`, продукт `p_88`, процедура `proc_01`.

## 11. Security & Privacy
- GDPR/152-ФЗ: согласие, политика, право на удаление, журналирование.  
- Шифрование фото AES-256 на клиенте/сервере, ключи в KMS, хранение в S3 с private ACL.  
- Retention: временные фото ≤24h, анализы гостей ≤30 дней, логи без PII через 90 дней.  
- Rate limiting 50 req/min/IP, WAF (Cloudflare), HTTPS + HSTS, CSP, CSRF, bcrypt/JWT для auth.  
- Опция «не сохранять фото» по умолчанию включена; пользователь может разрешить сохранение явным чекбоксом.  
- Регулярные pentest, dependency scanning (Snyk/GitHub Dependabot).

## 12. KPI и метрики
- Конверсия Upload → Result ≥10%.
- CTR партнёрских ссылок ≥4%.
- Share rate ≥8%.
- DAU/WAU ≥30%.
- CAC ≤€5 при пилотной рекламе.
- NPS ≥25.
- Ошибки загрузки <2% сессий.

## 13. Риски и Plan B
- **Privacy breach:** строгие доступы, audit logs, баг-баунти, резервный план отключения загрузок.  
- **Неверные рекомендации:** disclaimer, кнопка «Сообщить о проблеме», fallback на curated советы вручную.  
- **Плохие фото:** UX подсказки, авто-валидация качества; fallback — показать пример идеального фото.  
- **Лицензии SDK:** использовать MIT face-api.js; при блоке — переключение на MediaPipe.  
- **Партнёрки не конвертят:** A/B CTA, расширение списка партнёров, подготовка CPA-альтернатив.  
- **Производительность:** масштабирование через горизонтальные реплики, CDN, кэширование; Plan B — очереди для тяжёлых операций.

## Roadmap задач (epic → story → критерии)
| Epic | User Story | Acceptance Criteria | Estimate (чд) |
| --- | --- | --- | --- |
| Upload & Try-on | Как гость, хочу загрузить фото и примерить прическу | drag-n-drop ≤10MB, face mesh выравнивает, можно скрыть фото | 18 |
| Hair Test | Как пользователь, хочу пройти тест и узнать тип | 8+ вопросов, сохранение ответов, результат ≤5 c | 12 |
| Recommendations | Хочу получить персональные советы | тип волос, ≥3 совета, партнёрские ссылки с UTM | 12 |
| Catalog | Хочу фильтровать косметику | фильтры тип/цель, пагинация, CTA работает | 10 |
| Procedures & Blog | Хочу читать процедуры | SEO URL, данные из БД, rich text | 8 |
| Brand Landing | Как бренд, хочу оставить заявку | форма валидация, уведомление, leadId | 6 |
| Security & Privacy | Хочу контролировать фото | опция не сохранять, шифрование, auto-delete 24h | 10 |
| Analytics & Events | Хочу видеть путь пользователя | события в GA/Amplitude, partner CTR | 6 |
| Admin-lite | Контент-редактор управляет каталогом | авторизация, CRUD, аудит | 12 |

## Roadmap (2-недельные спринты)
(см. раздел 8)

## Потребности в стеке
- **Frontend:** React + Next.js (SSR), Tailwind, Zustand/Redux, face-api.js/MediaPipe. Причина — SEO, скорость, богатая экосистема.  
- **Backend:** Node.js + NestJS, Express адаптер, TypeScript, Prisma/TypeORM — быстрое прототипирование, знакомство команды.  
- **БД:** PostgreSQL — надёжность, JSONB для рекомендаций.  
- **Кэш/сессии:** Redis — быстрый доступ, rate limit.  
- **Storage:** AWS S3 или DO Spaces, поддержка lifecycle.  
- **Deployment:** Docker Compose (MVP) → Kubernetes/GKE/ECS при росте.  
- **CDN/WAF:** CloudFront или Cloudflare для статики и защиты.  
- **Analytics:** Google Analytics + Amplitude.  
- **Payments:** не требуются; опционально Stripe для будущих апселов.  
- **ML libs:** face-api.js, MediaPipe.  

## НФ Требования
- SLA 99.9% при масштабировании (репликация, health-check).  
- API отклик <300 мс для простых запросов.  
- Upload size ≤10MB.  
- Rate limiting 50 req/min/IP, brand lead форма 5 req/час.  
- Логирование/мониторинг (Prometheus/Grafana или APM).  
- Accessibility WCAG 2.1 AA.

## KPI / Метрики (см. раздел 12)

## Риски и Mitigation (см. раздел 13)

## Пример пользовательского сценария
1. Пользователь видит рекламу → попадает на главную.  
2. Нажимает «Загрузить фото», соглашается с политикой, выбирает файл.  
3. Примеряет 2 причёски, меняет цвет, включает «Не сохранять фото».  
4. Проходит тест из 10 вопросов, возобновляет после случайного обновления страницы.  
5. Получает результат (тип 2B), советы, подборку из 3 продуктов.  
6. Кликает на партнёрскую ссылку и делится результатом в соцсетях.  
Ожидания: быстрый отклик, контроль данных, релевантные советы, понятные CTA.

## Тестовые данные/кейсы
- Фото: `test_curly.jpg`, `test_straight.jpg`.  
- Users: `guest_001`, `oauth_google_demo`.  
- Analyses: `a_demo_curly`, `a_demo_dry`.  
- Products: `p_88`, `p_21`.  
- Cases: upload success/failure, face mesh отклонения, мобильный Safari, плохое соединение, двойные клики CTA, rate limit.