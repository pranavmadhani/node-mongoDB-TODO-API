var mongoose = require('mongoose');
var validator = require('validator')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

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


UserSchema.methods.generateAuthToken = function(){

    var user = this;
    var access = 'auth';
    var token =jwt.sign({_id:user._id.toHexString(),access},"secret123").toString();
   
    user.tokens = user.tokens.concat([{access,token}]);
    
  return user.save().then(()=>{
        return token;
     })



}


UserSchema.statics.findByCredentials = function(email,password){
var User = this;
return User.findOne({email}).then((user)=>
{
    if(!user) return Promise.reject();
    
    return new Promise((resolve,reject)=>{
       
        bcrypt.compare(password,user.password,(err,res)=>{

            if(res)
        {
            resolve(user)
        }
        else{
            reject()
        }

        })
        
    })
})

}


UserSchema.statics.findByToken = function(token){
var User = this;
console.log(User);
var decoded;

try {

    decoded = jwt.decode(token,"secret123");
    
} catch (error) {
    
    return Promise.reject();
}

return User.findOne({

    _id: decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'

});

}


UserSchema.pre('save',function(next){
    var user = this;

    if(user.isModified('password') )
    {

        bcrypt.genSalt(12,(err,salt)=>{

            bcrypt.hash(user.password,salt,(err,encryptPass)=>{
                
            console.log(encryptPass)
            user.password = encryptPass;
                next();
            })
            
        })

        
    }

    else{

        
      //  console.log('inside else')
        next()
    }
})
var User = mongoose.model('User',UserSchema);


module.exports={
    User
}