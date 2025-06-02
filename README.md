Frontend часть проекта для хакатона Неймарк Умный Кампус 2025 по кейсу "Госуслуги".

## Общее описание всего продукта
ЕСИА 2
Доверяй близким

Мы сделали полноценную мини-ЕСИА без паролей
Решаем проверенную боль – пожилые и подростки часто теряют или передают пароль; взломы через «забыл пароль» ≈ 50 000 в год.


Полноценный рабочий стек – FastAPI + PostgreSQL + Next.js + Kotlin Multiplatform, контейнеры Docker, Nginx, CI/CD.


Два сценария авторизации – подтверждение на собственном устройстве или через доверенное лицо (семья/опекун).


Интеграция без боли – встаём как OIDC-прокси или отдаем модуль в ядро ЕСИА; ядро не трогаем.


Масштабируемость – stateless-сервисы, горизонтальный скейл; готовый пилот в Башкортостане, затем регионы.

## Конкретно про сайт
Реализован необходимый функционал. Поддерживается адаптивность для различных устройств, есть темная тема. При проектировании в рамках сжатого времени старались придерживаться официального гайдлайна от Госуслуг.

## Что сделано?

<ul>
    <li>Логин (/login)</li>
    <li>Профиль (/profile)</li>
    <li>Доверенные лица (/top_up_steam)</li>
</ul>

## Как запустить?

В корне проекта:
Создайте файл <code>.env.local</code>, вставьте содержимое из файла <code>.env.example</code> и заполните пустые переменные:

```
BACKEND_URL=
NEXT_PUBLIC_BACKEND_URL=

BACKEND_API_KEY=
NEXT_PUBLIC_BACKEND_API_KEY=
```

<b>У переменных вида <code>X</code> и <code>NEXT_X</code> значения должны быть равны!</b>

Откройте файл <code>package.json</code>, найдите данную строку и установите нужный порт (по умолчанию - <code>50503</code>):

```json
"start": "next start -p 50503",
```

Затем запустите файл <code>start.sh</code>, либо выполните в терминале следующие команды:

```bash
curl https://get.volta.sh | bash
source ~/.bashrc
volta pin node@22
volta install pnpm
pnpm i --frozen-lockfile
pnpm build
pnpm start
```

## Что использовал?

<ul>
    <li>NextJS 15</li>
    <li>TypeScript</li>
    <li>shadcn ui (tailwind 4, input-otp)</li>
    <li>Zod</li>
    <li>axios</li>
    <li>zustand</li>
    <li>cookies-next</li>
    <li>next-auth</li>
    <li>eslint</li>
</ul>

## Что-то ещё?

<ul>
    <li>Макет Figma: <a href="https://www.figma.com/design/I6Qmnhwwlld0Cjd7OLVq8y/Untitled?node-id=0-1&p=f&t=6ydvtAkxzOVOzaLx-0">https://www.figma.com/design/I6Qmnhwwlld0Cjd7OLVq8y/Untitled?node-id=0-1&p=f&t=6ydvtAkxzOVOzaLx-0</a></li>
    <li>Официальные гайдлайны Госуслуг: <a href="https://guides.gosuslugi.ru/">https://guides.gosuslugi.ru/</a></li>
</ul>

# С любовью, от команды DIVAR
<img src="https://raw.githubusercontent.com/goforbg/telegram-emoji-gifs/refs/heads/master/heart.gif" alt="heart" width="200"/>
