# **news-explorer-frontend**

[![React](https://img.shields.io/badge/-react-464646??style=flat-square&logo=react)](https://ru.reactjs.org/)
[![JavaScript](https://img.shields.io/badge/-JavaScript-464646??style=flat-square&logo=javascript)](https://www.javascript.com/)
[![Node.js](https://img.shields.io/badge/-Node.js-464646??style=flat-square&logo=Node.js)](https://nodejs.org/ru/)
[![Express](https://img.shields.io/badge/-Express-464646??style=flat-square&logo=Express)](https://expressjs.com/ru/)
[![MongoDB](https://img.shields.io/badge/-MongoDB-464646??style=flat-square&logo=MongoDB)](https://www.mongodb.com/2)
[![CSS](https://img.shields.io/badge/-CSS-464646??style=flat-square&logo=css3)](https://www.w3.org/Style/CSS/specs.ru.html)
[![HTML](https://img.shields.io/badge/-HTML-464646??style=flat-square&logo=HTML5)](https://www.w3.org/TR/html52/introduction.html#introduction)

Проект **news-explorer-frontend** предсталяет собой фронтенд проекта [**news-explorer**](https://www.sm2-news-explorer.students.nomoredomains.icu).
Фронтенд сделан с использованием библиотеки React. 


**New-explorer** - это сервис, в котором можно найти новости по запросу и сохранить в личном кабинете.
Поиск осуществляется по ключевым словам, вводимым в поисковую строку. 
После подтверждения, по указанному ключевому слову (фразе) осуществляется запрос к API сервиса NewsAPI, который возвращает результат на главную страницу.
Сохранение новостей реализовано с помощью обращения к API бэкенда проекта ([**news-explorer-api**](https://github.com/SergeyMMedvedev/news-explorer-api)), сделанного с помощью фреймворка Express.
Возможность сохранения новостей доступна только зарегистрированным пользователям.

Верстка сайта адаптивная под различные разрешения. Применена методолгия БЭМ.
 
## Начало

Клонирование проекта:
```
git clone https://github.com/SergeyMMedvedev/news-explorer-api.git
```

Установка зависимостей:
```
npm install
```

Запуск приложение в режиме разработки:
```
npm start
```
Сборка проекта в указанную папку для дальнейшего размещения на сервере:
```
npm run build
```
Сборка проекта и автоматическое размещение на сервере:
```
npm run deploy
```

## Автор

* **Сергей Медведев** - [SergeyMMedvedev](https://github.com/SergeyMMedvedev)

**Адреса сайта:**
* Фронтенд:
https://sm2-news-explorer.students.nomoredomains.icu
* Бэкенд:
https://api.sm2-news-explorer.students.nomoredomains.icu
