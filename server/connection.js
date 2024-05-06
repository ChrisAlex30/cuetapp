const mongoose=require('mongoose')

//mongoose.connect('mongodb://localhost/cuetdb',)
mongoose.connect('mongodb+srv://abhay:Abhay%40123@cluster0.xowgujp.mongodb.net/cuetdb?retryWrites=true&w=majority').then()
.catch((err)=>{
console.log(err);
process.exit(1)
})


const cuetpapersschema = new mongoose.Schema({
    subject: {
        type:String
    },
    Papers: {}
})


module.exports = mongoose.model("cuetpapers", cuetpapersschema);