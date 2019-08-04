//var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

bcrypt.genSalt(12,(err,salt)=>{

    bcrypt.hash("secret123",salt,(err,hash)=>{
        
    console.log(hash)

    })
    
})


bcrypt.compare("secret123","$2a$12$gA6ly4GZbjNvDkmQ3Z2zieklpHYA67Ef7df3cPZPWiFcUatV6MV0K",(err,res)=>{
    console.log(res)
})