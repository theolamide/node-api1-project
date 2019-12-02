// implement your API here
const express=require('express'); 
const db=require('./data/db.js');

const server=express();
server.use(express.json());

server.get('/',(req,res)=>{
    res.send({api: 'Up and running!'})
})


const port=4000;
server.listen(port, ()=>
console.log(`\n ** API running on port ${port} **\n`))