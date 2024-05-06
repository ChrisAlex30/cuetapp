const mongoose=require('mongoose')

//mongoose.connect('mongodb://localhost/cuetdb',)
mongoose.connect('mongodb+srv://alex15530:IQ_Classes1@apps.moxew.mongodb.net/cuetapp')


const cuetpapersschema = new mongoose.Schema({
    subject: {
        type:String
    },
    Papers: {}
})


module.exports = mongoose.model("cuetpapers", cuetpapersschema);