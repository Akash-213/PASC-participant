const mongoose =require('mongoose')

const participantSchema =mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        trim:true
    },
    event:{
        type:String,
        required:true,
        trim:true
    },
    slot:{
        type:Number,
        required:true
    },

},{
    timestamps:true
})

const Participant = mongoose.model('Participants',participantSchema)

module.exports = Participant