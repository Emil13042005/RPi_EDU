# учебная платформа

Учебная платформа: React-приложение со списком лекторов, страницами партнёров и раздела «О нас», навигацией между разделами без роутера.

## Стек и версии

Приложение собирается Vite и работает в браузере.

| Пакет | Версия |
| --- | --- |
| Node.js | 26.11.1 |
| npm | 12.2.0 |
| React | 19.3.0 |
| React DOM | 19.3.0 |
| Vite | 8.3.1 |
| @vitejs/plugin-react | 6.1.1 |
| ESLint | 10.11.0 |
| eslint-plugin-react-hooks | 7.1.1 |
| eslint-plugin-react-refresh | 0.5.7 |

Диапазоны зависимостей записаны в `package.json`, точные версии — в `package-lock.json`.

Стили — обычный CSS без препроцессора. Для компонентов используются **CSS Modules** (`*.module.css`), общие классы (`pageContainer`, `headerH1`, `textP`) собираются через `composes` из `src/styles/common.module.css`. Сброс стилей и базовые шрифты — в `src/styles/global.css`, файл подключается один раз в `src/main.jsx`.

## Установка и запуск

Нужны Node.js и npm.

```bash
npm install
npm run dev
```

Dev-сервер Vite по умолчанию открывается на `http://localhost:5173`.

Остальные команды:

```bash
npm run build    # сборка в dist/
npm run preview  # локальный просмотр собранной версии
npm run lint     # проверка ESLint
```

## Структура папок

```text
SHAA/
├── index.html              # точка входа HTML, <div id="root">
├── vite.config.js          # конфигурация Vite
├── eslint.config.js        # конфигурация ESLint
├── package.json
└── src/
    ├── main.jsx            # монтирование React (createRoot)
    ├── App.jsx             # навбар и логика переключения разделов (роутинг)
    ├── assets/             # картинки (hero.jpg, логотипы партнёров)
    ├── data/
    │   └── lecturers.js    # массив с данными всех 10 лекторов
    ├── pages/
    │   ├── Home.jsx        # Главная (баннер, кнопка, блоки "О нас" и "Партнёры")
    │   ├── About.jsx       # Компонент "О нас"
    │   ├── Contacts.jsx    # Компонент "Партнёры" (ICL и Татнефть)
    │   ├── Lecturers.jsx   # Список лекторов (поиск, фильтры)
    │   ├── LecturerDetails.jsx # Страница конкретного лектора
    │   ├── Home.module.css
    │   ├── Lecturers.module.css
    │   └── LecturerDetails.module.css
    └── styles/
        ├── About.module.css
        └── Contacts.module.css
```

`node_modules/` и `dist/` в репозиторий не входят: зависимости ставятся через `npm install`, сборка появляется после `npm run build`.

## Данные

- Лекторы — `src/data/lecturers.js`. Это экспорт по умолчанию массива `LECTURERS`. У каждого лектора есть поля:
  - `id` — уникальный ключ (латиницей, без пробелов), используется для перехода на страницу лектора;
  - `name`, `role`, `photo` — ФИО, должность и фотография;
  - `short` — краткая подпись для карточки в списке;
  - `education`, `experience`, `degree` — блок личной информации;
  - `disciplines` — массив `{ title, description, topics: [] }`, где `topics` — список тем курса;
  - `prices` — массив `{ label, value }` тарифов.

  Фото лекторов лежат в `src/assets/lecturers/` (`lecturer-1.png` … `lecturer-10.png`) и импортируются вверху `lecturers.js`. Если имена файлов другие — поправьте пути в импортах.

- Партнёры — массив `PARTNERS` внутри `src/pages/Home.jsx` (блок партнёров теперь на главной). Каждая запись: `{ logo, link, text }`. Логотипы — `src/assets/partner-1.png` и `src/assets/partner-2.png`. Клик по карточке открывает сайт партнёра в новой вкладке (`target="_blank"` + `rel="noopener noreferrer"`).

- Hero-блок на главной — картинка `src/assets/hero.jpg` и текст рядом. Правится прямо в `src/pages/Home.jsx`.

## Роутинг

React Router не используется, адрес в браузере не меняется.

Разделы переключает состояние `currentSection` в `src/App.jsx`. Список разделов — константа `PAGES`:

| id | Раздел | Компонент |
| --- | --- | --- |
| `home` | Главная | `src/pages/Home.jsx` |
| `about` | О нас | `src/pages/About.jsx` |
| `lecturers` | Лекторы | `src/pages/Lecturers.jsx` |
| `contacts` | Партнёры | `src/pages/Contacts.jsx` |

`Navbar` получает список пунктов меню из массива `NAV_ITEMS` в `src/components/Navbar/Navbar.jsx` и вызывает `onNavigate(key)`. В `App.jsx` функция `handleNavigate` сбрасывает выбранного лектора и переключает `currentSection`. Рисуется только компонент текущего раздела — через `renderContent()`.

Внутри раздела «Лекторы» свой локальный переход: состояние `selectedLecturerId` в `App.jsx`.

- Если `selectedLecturerId === null` — показывается список `<Lecturers onSelect={setSelectedLecturerId} />`.
- Если выбран — рендерится `<LecturerPage lecturerId={selectedLecturerId} onBack={...} />`.
- Кнопка «← Назад к списку» сбрасывает `selectedLecturerId` в `null`.

Это тоже состояние, а не URL: прямых ссылок на конкретного лектора нет, `F5` вернёт на главную.

## Особенности

- Кнопка «Найти лектора» на главной странице растянута на всю ширину контейнера и по клику уводит в раздел «Лекторы». Она принимает проп `onFindLecturers` из `App.jsx` и вызывает `handleNavigate('lecturers')`.
- Кнопка «Заказать» на странице лектора — пока пустышка: логики нет, кнопка предусмотрена под будущую форму заявки.
- Модальное окно не используется для карточек лекторов — переход сделан через отдельную «страницу», а не всплывающее окно.
- Стили наведения реализованы через CSS `:hover`, обработчиков `onMouseOver` / `onMouseOut` в JSX нет.
- CSS Modules + `composes` — общие классы (`pag
