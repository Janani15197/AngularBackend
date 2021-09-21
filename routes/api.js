const express = require('express')
const jwt =require('jsonwebtoken')
const router = express.Router()

const mongoose = require('mongoose')

const User = require('../models/user')

const db="mongodb+srv://janani:jana1597@eventsdb.mvhje.mongodb.net/eventsdb?retryWrites=true&w=majority"

mongoose.connect(db, err =>{
    if(err){
        console.log('Not connected ' +err)

    }
    else{
        console.log(' connected1')
    }
}) 


function verifyToken(req,res,next){
    if(!req.headers.authorization){
        console.log('error')
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === null){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token,'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId =payload.subject
    next()
}

router.get('/',(req,res) => {
    res.send('From API')
})

router.post('/register',(req,res) => {
    let userData =req.body
    let user = new User(userData)
    user.save((error,registeredUser) =>{
        if(error){
            console.log(error)
        }
        else{
            let payload ={subject:registeredUser._id}
            let token =jwt.sign(payload,'secretKey')

            res.status(200).send({token})
        }
    })
})


router.post('/login',(req,res) => {
    let userData =req.body
   
    User.findOne({email:userData.email},(error,user) => {
   
        if(error){
            console.log(error)
            console.log('invlid...')
        }
        else{
            if(!user){
            res.status(401).send('Invalid email')
            }
            else{
                if(user.password != userData.password){
                    res.status(401).send('Invalid password')
                }
                else{
                    let payload ={subject:user._id}
                 let token =jwt.sign(payload,'secretKey')

                    res.status(200).send({token})
                }
            }
        }
    })
})

router.get('/events',(req,res) => {
    let events = [{
        "_id" :"1",
        "name":"Chennai",
        "description":"something happens",
        "date":"2021-09-16"
        },
        {
        "_id" :"2",
        "name":"Chennai",
        "description":"something happens",
        "date":"2021-09-16"
        },
        {
        "_id" :"3",
        "name":"Chennai",
        "description":"something happens",
        "date":"2021-09-16"
        },
        {
        "_id" :"4",
        "name":"Chennai",
        "description":"something happens",
        "date":"2021-09-16"
        },
        {
        "_id" :"5",
        "name":"Chennai",
        "description":"something happens",
        "date":"2021-09-16"
        }
    ]
   res.json(events)
    
})

router.get('/special',verifyToken,(req,res) => {
    let events = [{
        "_id" :"1",
        "name":"Chennai",
        "description":"something happens",
        "date":"2021-09-16"
        },
        {
        "_id" :"2",
        "name":"Chennai",
        "description":"something happens",
        "date":"2021-09-16"
        },
        {
        "_id" :"3",
        "name":"Chennai",
        "description":"something happens",
        "date":"2021-09-16"
        },
        {
        "_id" :"4",
        "name":"Chennai",
        "description":"something happens",
        "date":"2021-09-16"
        },
        {
        "_id" :"5",
        "name":"Chennai",
        "description":"something happens",
        "date":"2021-09-16"
        }
    ]
   res.json(events)
    
})


module.exports = router