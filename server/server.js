var {
  mongoose
} = require('./db/mongoose')
var {
  Todo
} = require('./models/todo')
var {
  User
} = require('./models/users')

var express = require('express')
var bodyParser = require('body-parser')
var obID = require('mongodb').ObjectID;
const port = process.env.PORT || 3000;
const _ = require('lodash');
var app = express();
app.use(bodyParser.json());
var jwt = require('jsonwebtoken')


app.post('/api/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  console.log(req.body)

  todo.save().then((doc) => {
    res.send(doc)
  }, (err) => {

    res.status(400).send(err);
  })
})

app.get('/api/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos
    })
    console.log(todos.length)
  }, (err) => {

    res.status(400).send(err);
  })
})



app.get('/api/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!obID.isValid(id))
    return res.status(404).send('invalid ID')


  Todo.findById(id).then((doc) => {

    if (!doc) return res.status(404).send();


    console.log(doc)
    res.send({
      doc
    })

  }).catch((err) => {

    res.status(400).send();
  });
})


app.delete('/api/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!obID.isValid(id))
    return res.status(404).send('invalid ID')



  Todo.findByIdAndDelete(id).then((doc) => {

    if (!doc) return res.status(404).send({

      message: 'error: the node is either already deleted or not present'

    });

    console.log('success....')
    console.log(doc)
    res.send({
      doc
    })

  }).catch((err) => {


    res.status(400).send({

    });
  });
})


app.patch('/api/todos/:id', (req, res) => {

  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed'])
  if (!obID.isValid(id)) {
    return res.status(404).send('invalid ID')
  }
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {
    $set: body
  }, {
    new: true
  }).then((todo) => {

    if (!todo)
      return res.status(404).send();

    res.send({
      todo
    })

  }).catch((err) => {
    res.status(400).send()
  })

})

/***********USERS API **************************** */


app.post('/api/register', (req, res) => {
  var required_fields = _.pick(req.body, ['email', 'password'])
  var _id = _.pick(req.body, ["_id"]);


  var user = new User({
    email: required_fields.email,
    password: required_fields.password
  });

  user.save().then((creds) => {
    //console.log(creds)
    
      var token = jwt.sign({id:creds._id.toHexString(),email:creds.email},"secret123");
      res.status(200)
      .header('x-auth',token)
      .send({
        id:creds._id,
        email: creds.email
      })

 
    

  }).catch((err)=>
  {
    res.status(400).send(err) 
  })
})










/*******************CONNECTION ESTABLISHMENT PHASE*************** */

app.listen(port, () => {
  console.log(`connection established at ${port}`)
})


module.exports = {
  app
}