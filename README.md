# KGS Leader Board
---
## Описание структуры репозитория

- Описание структуры репозитория
- Описание методологии взаимодействия API
- Описание реализованной функциональности 
- Видео демонстрация, подтверждающая работоспособность заявленного
- Описание стека технологий и библиотек
-  Схема архитектуры системы

```bash
├── public
├── src
│   ├── assets # test files
│   ├── components
│   ├── configs
│   ├── hooks
│   ├── icons
│   ├── stories # storybook files
│   ├── styles
│   ├── types
│   └── utils
└── types # dev environment and browser types
```
Нами была испльзована стандартная структура ReactJS проекта,  представленная выше.  
Также, во время написания всего проекта мы активно использовали `github workflow` для форматирования кода и отслеживания ошибок синтаксиса.

## Описание методологии взаимодействия API

Взаимодействие с API было реализовано посредством использвания проксисервера, . Данное решение позволило сделать все запросы на сервер более безпасными (возможно установить `cors same-origin`), а также использовать API в удобном REST формате.
```bash
            |fronted(React JS APP) <---> proxy| <---> www.gokgs.com
            |_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _|
                       (client side) 
```

## Описание реализованной функциональности

### 1. ТОП 100 игроков

Была реализована возможность просматривать ТОП 100 игроков с отображением информации 2 последних игр каждого участника ТОПа.
Информация об играх:  
1. Имена игроков партии и их цвета  
2. Размер игрового поля  
3. Информация о резуьтатах игры(колличество очков)

![top_img](/images/top_img.png)

### 2. Просмотр определенной партии с возможностью перемотки игры

Реализована возможность просмотра любой партии с сайта `www.gokgs.com`, используя уникальный идентификатор `timestamp`.  

![game_board_img](/images/game_board_img.png)

Возможно перематывать ход игры, используя кнопки или ползунок перемотки. Также, доступен список всех ходов в партии с подсвечиванием текущего хода.

![game_board_img](/images/game_menu_img.png)

### 3. Авторизация на сайте, исполльзуя аккаунт `www.gokgs.com`

Для получения доступа ко всем функциям сайта, необходимо авторизоваться, используя данные аккаунта `www.gokgs.com`

![game_board_img](/images/login_img.png)

## Видео демонстрация, подтверждающая работоспособность заявленного
Сначал будет продемонстрирована загрузка данных ТОПа непосредственно с сервера, а далее его подгрузка из внутренней базы данных приложения.

[![Watch the video](https://img.youtube.com/vi/7G2uMRbf9pM/maxresdefault.jpg)](https://youtu.be/7G2uMRbf9pM)

## Описание стека технологий и библиотек
### NodeJS
1. ReactJS
2. TypeScript  

Список всех библиотек представлен в файле `package.json`
```json
"dependencies": {
    "@types/styled-components": "^5.1.9",
    "bootstrap": "^5.0.0-beta3",
    "bootstrap-icons": "^1.4.1",
    "http-proxy": "^1.18.1",
    "idb-keyval": "^5.0.4",
    "lint-staged": "^10.5.4",
    "react": "^17.0.0",
    "react-dom": "^17.0.0",
    "react-router-dom": "^5.2.0",
    "styled-components": "^5.2.2"
  },
  "devDependencies": {
    "@snowpack/plugin-dotenv": "^2.0.5",
    "@snowpack/plugin-react-refresh": "^2.4.0",
    "@snowpack/plugin-typescript": "^1.2.0",
    "@snowpack/web-test-runner-plugin": "^0.2.0",
    "@storybook/addon-actions": "^6.1.21",
    "@storybook/addon-essentials": "^6.1.21",
    "@storybook/addon-links": "^6.1.21",
    "@storybook/react": "^6.1.21",
    "@testing-library/react": "^11.0.0",
    "@types/bootstrap": "^5.0.9",
    "@types/chai": "^4.2.13",
    "@types/mocha": "^8.2.0",
    "@types/node": "^14.14.35",
    "@types/react": "^17.0.0",
    "@types/react-dom": "^17.0.0",
    "@types/react-router-dom": "^5.1.7",
    "@types/snowpack-env": "^2.3.2",
    "@typescript-eslint/eslint-plugin": "^4.20.0",
    "@typescript-eslint/parser": "^4.20.0",
    "eslint": "^7.23.0",
    "eslint-config-prettier": "^8.1.0",
    "eslint-plugin-prettier": "^3.3.1",
    "eslint-plugin-react": "^7.23.1",
    "husky": "^6.0.0",
    "mocha": "^8.3.2",
    "prettier": "^2.0.5",
    "snowpack": "^3.0.1",
    "snowpack-plugin-svgr": "^0.1.2",
    "storybook-css-modules-preset": "^1.0.7",
    "typescript": "^4.0.0"
  }
```
### Pyhton
1. Brython  
Используется для просчета логики игры ГО