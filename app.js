const express = require('express')
const port =process.env.PORT || 3000

const app = express()
app.use(express.json())

const participant_router = require('../web1/src/routers/participants')

app.use(participant_router)

app.get('/',(req,res)=>{
    res.send("Working")
})

app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`)
})

// C:/Users/akash/mongodb/bin/mongod --dbpath=/Users/akash/mongodb-data