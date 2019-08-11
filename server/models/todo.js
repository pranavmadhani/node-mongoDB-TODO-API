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
    },
    _creator:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }

})




module.exports={
    Todo
}