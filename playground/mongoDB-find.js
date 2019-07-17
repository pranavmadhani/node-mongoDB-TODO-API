const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, client) => {
    if (error) {
        return console.log("unable to connect to mongoDB server..", error)
    }
    console.log("connected to server")
    const db = client.db('TodoApp')


//    db.collection('Todos').find({
//        _id:new ObjectID('5d2eaa38682cde16b8189cbe')}
//        ).toArray().then((docs)=>
//    {
   
//     console.log(JSON.stringify(docs,undefined,2))

//    },(err)=>{
//        console.log('unable to fetch',err)
//    });




db.collection('Users').find({location: "India"})
.toArray().then((doc)=>
{
console.log("Users")
console.log(JSON.stringify(doc,undefined,2))

},(err)=>{
    console.log('unable to fetch',err)
});

    client.close();


})