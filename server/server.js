var{mongoose} = require('./db/mongoose')
var{Todo} = require('./models/todo')
var{User}  = require('./models/users')
var express = require('express')
var bodyParser = require('body-parser')
var obID= require('mongodb').ObjectID;
const port = process.env.PORT||3000;
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

app.get('/api/todos',(req,res)=>{
  Todo.find().then((todos)=>
  {
      res.send({todos})
      console.log(todos.length)
  },(err)=>{
  
      res.status(400).send(err);
  }
  )
})



app.get('/api/todos/:id',(req,res)=>{
  var id=req.params.id;
 
  if(!obID.isValid(id))
  return res.status(404).send('invalid ID')

  
  Todo.findById(id).then((doc)=>{

    if(!doc)return res.status(404).send(); 

    
    console.log(doc)
    res.send({doc})

  }).catch((err)=>{
    
   res.status(400).send();
  });
})


app.delete('/api/todos/:id',(req,res)=>
{
  var id=req.params.id;
 
  if(!obID.isValid(id))
  return res.status(404).send('invalid ID')

  

  Todo.findByIdAndDelete(id).then((doc)=>{

    if(!doc)return res.status(404).send({

      message:'error: the node is either already deleted or not present'

    }); 

    console.log('success....')
    console.log(doc)
    res.send({doc})


  }).catch((err)=>{
    

    res.status(400).send({
      
    });
   });
})





app.listen(port,()=>
{
    console.log(`connection established at ${port}` )
})
 

module.exports={
  app
}