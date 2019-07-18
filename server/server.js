var{mongoose} = require('./db/mongoose')
var{Todo} = require('./models/todo')
var{User}  = require('./models/users')
var express = require('express')
var bodyParser = require('body-parser')


var app=express();
app.use(bodyParser.json());


app.post('/api/todos',(req,res)=>
{
  var todo = new Todo({
      text: req.body.text
  });
console.log(req.body)


  

  todo.save().then((doc)=>
{
    res.send(doc)
},(err)=>{

    res.status(400).send(err);
}
)
})


app.listen(3000,()=>
{
    console.log("connection established at 3000")
})
 