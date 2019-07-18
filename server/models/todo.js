var mongoose = require('mongoose');

var Todo = mongoose.model('Todo',
{
    text:{
     type: String ,
     required: true,
     min: 1,
    max: 20,
    trim: true  
    },
    completed:
    {
        type: Boolean,
        default:false

    },
    completedAt:{
        type: Date,
        default: null
    }

})

// var t1 = new Todo({
//     text:"cocked dinner",
//      completed: true,
//      completedAt: new Date().getTime()
// })

// t1.save().then((doc)=>
// {
//    // console.log(doc)
// },(err)=>{

//     console.log("not done")
// })

module.exports={
    Todo
}