//var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");
var jwt = require('jsonwebtoken')

let data = {
    name:"pranav madhani"
}
var token = jwt.sign(data,"secret123")
console.log(token);

let decode = jwt.decode(token,"secret123")
console.log(decode)
