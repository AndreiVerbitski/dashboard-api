import express from 'express'

// К этому роутеру я привязал несколько методов. Теперь я могу этот роутер привязать к основному приложению
const userRouter = express.Router()

userRouter.use((req, res, next) => {
    console.log('Обработчик users: ',  Date())
    //Передаем управление следующему обработчику
    next()

})

userRouter.post('/login', (req, res) => {
    res.send('login')
})

userRouter.post('/register', (req, res) => {
    // res.send('register')
    throw new Error('Ты не будешь здесь регистрироваться!!!=)')
})

userRouter.use('/register', (err, req, res, next) => {
    res.status(403).send(err.message)
})

export { userRouter }