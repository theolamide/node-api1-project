// implement your API here
const express=require('express'); 
const db=require('./data/db.js');

const server=express();
server.use(express.json());

server.get('/',(req,res)=>{
    res.send({api: 'Up and running!'})
})

server.get('/users',(req,res)=>{
    db.find()
    .then(users => {
        res.status(200)
        .json(users)
    })
    .catch(error => {
        console.log('error on GET /users', error);
        res
        .status(500)
        .json({errorMessage: 'Error getting list of users from the database.'})
    })
})

server.post('/users', (req,res)=>{
    const userData=req.body;
    db.insert(userData)
    .then(user=>{
        res.status(201)
            .json(user);
    })
    .catch(error =>{
        console.log('Error on Post /user.', error);
        res.status(500)
            .json({errorMessage: 'Error adding user.'})
    })
})

server.delete('/users/:id',(req,res)=>{
    const id=req.params.id;

    db.remove(id)
    .then(removed =>{
        if(removed){
            res.status(200)
            .json({message: 'User removed.'})
        } else {
            res.status(404)
            .json({message: 'The user with the specified ID does not exist.'})
        } 
    })
    .catch(error =>{
        console.log('error on DELETE /users', error)
        res.status(500)
        .json({error: "The user could not be removed."})        
    })
})

server.put('/users/:id',(req,res)=>{
    const id=req.params.id;
    const body=req.body;

    if(!body.name||!body.bio){
        res.status(400)
        .json({errorMessage: "Please provide name and bio for the user."})
    }else {
        db.update(id,body)
        .then(user=>{
            if(user){
                res.status(200)
                .json({message: "User updated successfully."});
                } else {
                    res.status(404)
                    .json({message: "The user with the specified ID does not exist."});
                }
        })
        .catch(err => {
            console.log("error on PUT /users/:id", err);
            res.status(500)
            .json({ error: "The user information could not be modified." });
        });
    }
})

const port=4000;
server.listen(port, ()=>
console.log(`\n ** API running on port ${port} **\n`))