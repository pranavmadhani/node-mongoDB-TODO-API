const MongoClient = require('mongodb').MongoClient

MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, client) => {
    if (error) {
        return console.log("unable to connect to mongoDB server..", error)
    }
    console.log("connected....")
    const db = client.db('TodoApp')


    // db.collection('Todos').insertOne({

    //     text: "something to insert",
    //     completed: false

    // }, (err, success) => {
    //     if (error) {
    //         return console.log("unable to insert todo.")
    //     }

    //     console.log(JSON.stringify(success.ops, undefined, 2))

    // })

    db.collection('Users').insertOne({

        name: "pranav madhani",
        age: 23,
        location:" India"

    }, (err, success) => {
        if (err) {
            return console.log("unable to insert users.")
        }

        console.log(JSON.stringify(success.ops, undefined, 2))

    })

    client.close();


})