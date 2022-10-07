### Команди:

- `npm install` &mdash; встановити базові залежності проекту
- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно
  виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними
  виправленнями простих помилок

Перед запуском сервера потрібно створити файл .env і прописати
MONGO_URL=mongodb+srv://<<username>>:<<password>>@cluster0.ygcc5.mongodb.net/test?retryWrites=true&w=majority
щоб підключитися до MongoDB.

Після запуску сервера переглядаємо документацію по запитах можна переглянути за
адресою (https://localhost:8080/api/docs/).

Або можна просто скористатися Back-End from heroku
[документацію по запитах](https://https://backend-superheros.herokuapp.com/api/docs/).
