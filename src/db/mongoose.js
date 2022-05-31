const mongoose = require('mongoose')
const valids= require('validator')
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

// mongoose.connect('mongodb://127.0.0.1/task-manager-app',{
//     useNewUrlParser: true,
//     useCreateIndex: true
// })
//
// const Task = mongoose.model('Tasks', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// })
// const task = new Task({description: 'Wel done!', completed: true})
//
// task.save().then(result => {
//     console.log(result)
// }).catch(error => {
//     console.log(error)
// })

