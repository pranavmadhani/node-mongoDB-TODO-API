var{mongoose} = require('./../server/db/mongoose')
var{Todo} = require('./../server/models/todo')
var{User} = require('./../server/models/users')

var obID= require('mongodb').ObjectID;


// if(!obID.isValid(id) )
// {
//     console.log("ID is not valid")
// }

// Todo.find({
//     _id:id
// }).then( (todos)=>{

//     console.log(todos)

// }   ).catch((err)=>{
//     console.log(err)
// })

let id ='5d3003c180ff2133a8a430fba';
status = false;
if(obID.isValid(id))
{
 status = true;
}

User.findById(id).then((res)=>
{
    if(!res){
        console.log("invalid")
    }
    
    console.log('result is: ',res);
}).catch((err)=>{
   // console.log(err)
});