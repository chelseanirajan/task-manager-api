const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Taskk = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express();
const port = process.env.PORT

// Incoming request convert to json format
app.use(express.json())

app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on prt ' +port)
})


// const jwt = require('jsonwebtoken')
// const myFunction = async () => {
//     const token = jwt.sign({'_id': 'abc123'}, 'thisismynewcourse', {expiresIn: '7 days'})
//     console.log(token)
//
//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
//
// }
// myFunction()
