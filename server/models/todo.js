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



module.exports={
    Todo
}