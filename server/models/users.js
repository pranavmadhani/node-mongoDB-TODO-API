var mongoose = require('mongoose');
var validator = require('validator')
var jwt = require('jsonwebtoken')

var UserSchema = new  mongoose.Schema({

    email:{
        type: String,
        required: true,
        min:1,
        trim: true,
        unique:true,
        validate:{
            validator:(value)=>{

              return  validator.isEmail(value);

            },message: `{value} is not a valid email`
        }
    },
    password:{
      type:String,
      required: true,
      min:6  
    },
    tokens:[
        {
        access:{
            type:String,
            required:true
        },
       token: {
           type:String,
           required: true

        }

    }
]



});

var User = mongoose.model('User',UserSchema);

UserSchema.methods.generateAuthToken = function()
{
    var user = this;
    var access= "auth"
    var token = jwt.sign({_id:user._id.toHexString(),access},'secret123').toString();
    user.tokens = user.tokens.concat([{access,token}]);
  
  return  user.save().then(()=>{
    return token;

    })
}

module.exports={
    User
}