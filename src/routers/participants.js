const express =require('express')
const router = new express.Router()
require('../db/mongoose')
const Participant = require('../models/participants')

const p1 = new Participant({
    name:"ABC",
    email:'ABC@g.com',
    event:'A',
    slot :1
})

const p2 = new Participant({
    name:"LMN",
    email:'LMN@g.com',
    event:'B',
    slot :2
})

const p3 = new Participant({
    name:"XYZ",
    email:'XYZ@g.com',
    event:'C',
    slot :3
})

const p4 = new Participant({
    name:"ABC",
    email:'XYZ@g.com',
    event:'C',
    slot :2
})

const p5 = new Participant({
    name:"ABC",
    email:'XYZ@g.com',
    event:'C',
    slot :3
})

const p6 = new Participant({
    name:"ABC",
    email:'g.com',
    event:'C',
    slot :1
})

router.get('/save' ,(req,res)=>{
    var parti = [p1,p2,p3,p4,p5,p6]
    var i ;
    for(i of parti){
        i.save().then(()=>{
            console.log(i)
            res.send(i)
        }).catch((e)=>{
            res.send(e)
        })
     }
    
})


// '/participants?name=abc&slot=1&event=A
router.get('/participants' ,async(req,res)=>{

    var name = req.query.name
    var event =req.query.event
    var slot =req.query.slot
    var email = req.query.email
    console.log(name)
    console.log(event)
    console.log(slot)
    console.log(email)



    try{
        const participants = await Participant.find({})
        

        if(name){
            if(event){
                if(slot){
                    const ns_match = await Participant.find({name , slot ,event})
                    res.send(ns_match)   
                }
                const ne_match = await Participant.find({name , event})
                res.send(ne_match)

            }
            if(slot){
                const ns_match = await Participant.find({name , slot})
                res.send(ns_match)   
            }
            const name_match = await Participant.find({name})
            res.send(name_match)
        }


        if(event){
            if(name){
                const en_match = await Participant.find({event ,name})
                res.send(en_match)
            }
            if(slot){
                const es_match = await Participant.find({event ,slot})
                res.send(es_match)   
            }
            const event_match = await Participant.find({event})
            res.send(event_match)
        }
        
        if(slot){
            if(name){
                const sn_match = await Participant.find({slot ,name})
                res.send(sn_match)
            }
            if(event){
                const se_match = await Participant.find({slot , event})
                res.send(se_match)   
            }
            const slot_match = await Participant.find({slot})
            res.send(slot_match)
        }

        // if(name != undefined && event!=undefined && slot !=undefined){
        //     const match = Participant.find({name,event,slot})
        //     res.send(match)
        // }
        res.send(participants)

    }catch(e){
        res.status(500).send(e)
    }
   
})

//participant/id 5fa8b0aa62a7111b2cf4607b

router.get('/participant/:id', async(req,res)=>{
    const _id =req.params.id
    console.log(_id)
    try{
        const participant = await Participant.findById({_id})
        if(!participant){
            res.send("Error")
        }
        res.send(participant)
    }catch(e){
        console.log(e)
        res.send(e)
    }
})

module.exports = router