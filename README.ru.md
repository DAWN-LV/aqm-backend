<p align="center">
  <a href="https://github.com/DAWN-LV/aqm-backend" target="blank"><img src="https://github.com/DAWN-LV/aqm-backend/blob/master/src/common/images/Logo.png?raw=true" width="350" alt="AQM Logo" /></a>
</p>

## Language

- [English](README.md)
- [Latvian](README.lv.md)
- [Russian](README.ru.md)

## Описание проекта

Проект "AQM-Backend" представляет собой бэкэнд-приложение, разработанное с использованием фреймворка [Nest.js](https://github.com/nestjs/nest). Это приложение предназначено для взаимодействия с фронтендом, работы с базой данных и подключения к сенсорам на Raspberry Pi.

## Описание проекта

- RESTful API для взаимодействия с фронтендом.
- Использование выбранной базы данных (например, PostgreSQL, MongoDB, MySQL) для хранения данных приложения.
- Подключение и взаимодействие с сенсорами на Raspberry Pi для сбора данных.
- Легко расширяемая архитектура приложения благодаря Nest.js.

## Требования

Перед началом работы у вас должны быть установлены следующие компоненты:

- [Node.js](https://nodejs.org/en) (рекомендуется LTS-версия)
- [npm](https://www.npmjs.com/) (устанавливается вместе с Node.js)
- [Nest.js](https://nestjs.com/)
- [InfluxDB](https://www.influxdata.com/)
- Raspberry Pi

## Установка

Склонируйте репозиторий:

```bash
$ git clone https://github.com/DAWN-LV/aqm-backend.git
$ cd ваш-проект
```

Установите зависимости:

```bash
$ npm install
```

## Конфигурация

Создайте файл .env в корне проекта и укажите в нем необходимые настройки, такие как параметры базы данных и настройки подключения к Raspberry Pi.

Пример файла .env:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=ваш_логин
DB_PASSWORD=ваш_пароль
```

## Запуск

Запустите бэкэнд сервера с помощью следующей команды:

```bash
$ npm run start
```

По умолчанию, сервер будет запущен на порту 3000.

## Контакты
Если у вас есть какие-либо вопросы или предложения, свяжитесь с нами:

- Email: vitalijs.pankovs@gmail.com
- Ссылка на GitHub: [GitHub](https://github.com/DAWN-LV)