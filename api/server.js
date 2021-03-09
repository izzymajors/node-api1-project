// BUILD YOUR SERVER HERE
//IMPORTS
const express = require('express');
const User = require('./users/model')


//INSTANCE OF EXPRESS APP
const server = express()

//GLOBAL MIDDLEWARE
server.use(express.json())



//[GET] | /api/users     | Returns an array users.
server.get('/api/users', (req, res) => {
    // res.status(200).json('it works!!!')
    User.find()
    .then(users => {
        console.log(users)
        res.status(200).json({message: 'yay', users })
    })
    .catch(err => {
      res.status(500).json({message: err.message })  
    })
})


// | POST| /api/users     | Creates a user using the information sent inside the `request body`.  
server.post('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const changes = req.body

const stuff = await User.update(id, changes)

console.log(stuff)
   
})

//| GET    | /api/users/:id | Returns the user object with the specified `id`.   
server.get('/api/users/:id', (req, res ) => {
   const id = req.params.id
   User.findById(id)
   .then(user => {
       console.log('we are getting --->', user)
       if(!user) {
           res.status(404).json({message: `User with id ${user} not in db`})
       } else {
           res.json(user)
       }
   })
   .catch(err => {
    res.status(500).json({message: err.message }) 
   })
})

//| DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user. 

server.delete('/api/users/:id', async (req, res ) => {
    try{
        const result = await User.delete(req.params.id);
        throw new Error( 'something died trying ')
    }catch(err) {
        res.status(500).json({message: err.message})
    }
})


//| PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |


server.use('*', (req, res) => {
    res.status(404).json({ message: 'resource not found in url'})
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
