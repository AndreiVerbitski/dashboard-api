import express from 'express';
// Это Роутер, я его могу привязать к приложению с помощью use()
import { userRouter} from "./users/users.js";

const port = 8000
const app = express()
/*
Пример обработчика запросов. ПО классике в стрелочной функции три параметра
request, response, и next() передает запрос дальше
Пример использования:
Единая точка для логирования запросов в базу
БЛагодарю use() можем задать такой обработчик глобально на все приложение

P.S use() Обработчик мы можем определить не только на уровне приложения, но и на уровне роутера

 */
app.use((req, res, next) => {
    console.log('Время: ',  Date())
    //Передаем управление следующему обработчику
    next()

})
/*
Обработчик можно задать на отдельную ручку.
app.use('/hello', (req, res, next) => {
    console.log('Время: ',  Date())
    //Передаем управление следующему обработчику
    next()

})

 */

// Если пользователь отправит запрос на endpoint /users он попадет в роутер.
// Чтобы роутер обработал запрос надо указать доп endpoint. Либо /login, либо /register
app.use('/users', userRouter)

app.get('/hello', (req, res) => {
    // res.status(201).send({ success: true })
    throw Error('Ты вошел не в ту дверь!)')
})

/*
Middleware обработчики должны быть всегда в самом конце. Чтобы обрабатывать запросы после того как мы их получим!
 */
app.use((err, req, res, next) => {
    console.log(err.message)
    //Передаем управление следующему обработчику
    res.status(500).send(err.message)

})

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`)
})

// app.all('/hello', (req, res, next) => {
//     console.log('All')
//     next()
// })