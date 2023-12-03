<p align="center">
  <a href="https://github.com/DAWN-LV/aqm-backend" target="blank">
    <img src="https://github.com/DAWN-LV/aqm-backend/raw/master/src/common/images/Logo.png?raw=true" width="250" alt="AtmoSense Logo"/>
  </a>
</p>

<details>
  <summary>
    <h2>Модель проекта</h2>
  </summary>

  <p align="center">
    <a href="https://lucid.app/lucidchart/f50687e3-ca8d-4006-92a6-79743d0dfecf/edit?view_items=Xv1Sjn5sZt9H&invitationId=inv_160e4e53-1fce-4aa5-a0ea-1828c28fd23f" target="blank">
      <img src="https://github.com/DAWN-LV/aqm-backend/raw/master/src/common/images/Model.png?raw=true" width="800" alt="Model"/>
    </a>
  </p>
</details>

## Language / Valoda / Язык

- [English](README.md)
- [Latvian](README.lv.md)
- [Russian](README.ru.md)

## Описание проекта

Проект "atmo-sense-backend" представляет собой бэкэнд-приложение, разработанное с использованием фреймворка [Nest.js](https://github.com/nestjs/nest). Это приложение предназначено для взаимодействия с фронтендом, работы с базой данных и подключения к сенсорам на Raspberry Pi.

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
$ git clone https://github.com/DAWN-LV/atmo-sense-backend.git
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

## Наши проекты

- [Frontend](https://github.com/DAWN-LV/aqm-frontend)
- [Raspberry pi client](https://github.com/PepeWarrior69/aqm-sensor-client)

## Контакты
Если у вас есть какие-либо вопросы или предложения, свяжитесь с нами:

- Email: vitalijs.pankovs@gmail.com
- Ссылка на GitHub: [GitHub](https://github.com/DAWN-LV)
