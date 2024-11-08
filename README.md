Декомпозиция монолитного фронтенда

Так как занимаюсь бэкендом, то сильно далек от фронтенд технологий. Потратил на декомпозицию микрофронтендов неделю по 2-3 часа в день. Постарался донести идею, но код не запустится, да и цели у меня такой не было.

### **1. Функциональность Mesto**

[![FastPic.Ru](https://i124.fastpic.org/thumb/2024/1103/26/_e127f4631b9ad50434187f83fb448d26.jpeg)](https://fastpic.org/view/124/2024/1103/_e127f4631b9ad50434187f83fb448d26.png.html)

Применим стратегию вертикальной нарезки, так как можно выделить отдельные бизнес-функции или клиентские пути. Также интерфейс не самый простой.

В качестве метода интеграции микрофронтенда используем Run time — объединение во время выполнения. Это позволит развёртывать модули независимо, обновлять модули без переразвёртывания всего приложения и производить масштабирование более гибко. Например, может быть огромный наплыв пользователей, который активно начнут наполнять свои галереи.

Module Federation основан на функции lazy loading. Она позволяет приложению загружать фрагменты кода по требованию.
shared dependencies киллер фича.

**Микрофронтенд 0**: container-microfrontend — объединяет все микрофронтенды и общие библиотеки.

**Микрофронтенд 1: Загрузка фотографий \ Удаление фотографий.**
Кнопка +.
По нажатию открывается форма с двумя полями. Во второе вставляется ссылка на фото. По сабмиту происходит событие обновления области с галереей. То есть должны быть подписчик событий «фото добавлено» и «фото удалено». Подписчик перерисовывает область с галереей.
Нажатие на пиктограмму корзины на фото и опять подписчик, который слушал событие перерисовывает область с галереей.

**Микрофронтенд 2: Сбор и учёт лайков под фото.**
Функционал, который позволяет ставить и снимать лайк в области галерии у изображения.

**Микрофронтенд 3: Создание профиля и его редактирование.**
Форма по кнопке редактировать профиль с полями, которая позволяет поменять имя и подпись. Плюс в функционал этого микрофронтенда будет входить проверка авторизации и вывод аватары.

**Микрофронтенд 4: Галерея пользователя.**
Обновляет своё состояние по событию.

**Микрофронтенд 5: Аутентификация и авторизация**

### 2. Выбираю Module Federation

Module Federation:
- объединяет разные модули приложения в единое целое и позволяет им использовать общий код.
- команды, которые разрабатывают разные микрофронтенды, смогут получить доступ к коду друг друга до развёртывания.
- Возможность использовать разные версии библиотек без конфликтов
- Независимость разработки и развёртывания микрофронтендов
- Оптимизация использования ресурсов за счёт ленивой загрузки модулей
- Module Federation использует функцию shared dependencies, чтобы модули использовали общие зависимости

Компоненты подписываются на нужные события, чтобы обновлять своё состояние. Можно использовать стратегию управления состоянием на основе API, но для этого нужно реализовать взаимодействие на основе Websocket. Лучше применить стратегию Pub/Sub

#### Наблюдения:

В `frontend/src/components/App.js` лежит обработчики событий.
`frontend/src/components/Main.js` — Вывод блока с аватаром и редактирование профиля, а также отображение галереи с кнопкой добавить.
`frontend/src/components/ProtectedRoute.js` содержит проверку авторизации.

Container-microfrontend — основа для сборки всех микрофронтендов.
Не разобрался как обратно из container-microfrontend отдать события в компонент Login. Например, `onLogin`. По ходу надо использовать Redux. CurrentUserContext тоже не докрутил.
Добавил Like компонент, который использует cards-microfrontend.

#### Репозиторий:

https://github.com/DuSk1/architecture-sprint-1

Смержил в main, ветку sprint_1 не удалял.


