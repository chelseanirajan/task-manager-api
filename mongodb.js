// CURD create read update delte

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if(error){
       return console.log('Unable to connect to database')
    }
    const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //     name: 'Nirajan',
    //     age: 27
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert user')
    //     }
    //
    //     console.log(result.ops)
    //
    // })
    // db.collection('users').insertMany([
    //     {
    //         name: 'Rashika',
    //         age: 28
    //     },
    //     {
    //         name: 'Niva',
    //         age: 25
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert documents!')
    //     }
    //     console.log(result.ops);
    // })
    // db.collection('tasks').insertMany([
    //     {
    //         description: 'You are ready to go',
    //         completed: true
    //     },
    //     {
    //         description: 'You arenot ready to go',
    //         completed: false
    //     },
    //     {
    //         description: 'You are ready',
    //         completed: false
    //     }
    // ],(error, result) => {
    //     if(error){
    //         return console.log('Unable to insert documents!');
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').findOne({_id: new ObjectID("628649395fe18527d0965cd7")}, (error, user) => {
    //     if(error){
    //         return console.log('Unable to fetch');
    //     }
    //     console.log(user);
    // })
    // db.collection('users').find({age: 27}).toArray((error, users) => {
    //     if(error){
    //         return console.log('user')
    //     }
    //         console.log(users)
    // })
    // db.collection('tasks').findOne({_id: new ObjectID('628653200ac3e45178809aab')}, (error, task) =>{
    //     if(error){
    //         return console.log('Unable to find task')
    //     }
    //     console.log(task)
    // })
    // db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
    //     if(error){
    //         return console.log('Unable to find tasks')
    //     }
    //     console.log(tasks)
    // })
    // client.close()

   // db.collection('users').updateOne({
   //      _id: new ObjectID("628649395fe18527d0965cd7")
   //  }, {
   //      $inc: {
   //          age: 1
   //      }
   //  }).then((result) => {
   //      console.log(result)
   //  }).catch((error) => {
   //      console.log(error)
   //      }
   //  )
   //  db.collection('tasks').updateMany({
   //      completed: false
   //  },{
   //      $set: {
   //          completed: true
   //      }
   //  }).then(result => {
   //      console.log(result)
   //  }).catch(error => {
   //      console.log(error)
   //  })
   //  db.collection('users').deleteMany({
   //      age: 55
   //  }).then((result) => {
   //      console.log(result)
   //  }).catch((error)=>{
   //      console.log(error)
   //  })
    db.collection('tasks').deleteOne({
        _id: new ObjectID('628653200ac3e45178809aac')
    }).then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
        }
    )
})

