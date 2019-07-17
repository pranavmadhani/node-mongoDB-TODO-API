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




db.collection('Todos').findOneAndDelete({text: "eat lunch"}).then((data)=>{


    console.log("deleted success",data) // check
    

}).catch(function(err) {
    console.log(err.message); // some coding error in handling happened
  })
   

client.close();
})