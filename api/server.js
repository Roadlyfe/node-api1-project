// BUILD YOUR SERVER HERE
const express = require('express');
const res = require('express/lib/response');
const User = require('./users/model')
const server = express();
server.use(express.json());

//GET
server.get('/', (req, res) => {
    console.log('recieved a request')
    res.status(200).json({message: 'recieved a request!'})
})

server.get('/api/users', (req, res) => {
    User.find()
    .then(result => {
        res.json(result);
    })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
    .then(result => {
        if(result == null) {
            res.status(404).json({message:"The user with the specified ID does not exist" })
            return;
        }
        res.json(result)
    })
    .catch(result => {
        res.status(500).json({ message:"The user information could not be retrieved" });
    });
}) 


server.post('/api/users', (req, res) => {
    User.insert(req.body)
    .then(result => {
        if(req.body.name == null  || req.body.bio == null) {
            res.status(400).json({ message: "Please provide name and bio for the user"})
        } else {
        res.status(201).json(result);
        }
    })
    .catch(result => {
        res.status(500).json({ message: 'there was an error while saving the user to the database' })
    });
});


server.put('/api/users/:id', (req, res) => {
    User.update(req.params.id, req.body).then(result => {
        if(result == null) {
            res.status(404).json({message: "The user with the specified ID does not exist"})
            return;
        } else if(req.body.name == null  || req.body.bio == null){
            res.status(400).json({ message: "Please provide name and bio for the user"})
        }else {
        res.json(result)
        }
    })  
})

server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id)
    .then(result => {
        if(result == null) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
        res.json(result);
        }
    });
});
module.exports = server; // EXPORT YOUR SERVER instead of {}
