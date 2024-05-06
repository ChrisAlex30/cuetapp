const path = require('path');
const express=require('express')
const app=express()

const cors=require('cors')
const cuetpapers=require("./connection.js")

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.get('/api/cuet/:subject/:paper',async(req,res)=>{
    try {
        let {subject,paper}=req.params
        console.log(req.params);
        if(!subject || !paper)
        return res.status(401).json({ msg: "Please Try Again" });

        await cuetpapers.updateOne(
            { subject: subject },
            { $inc: { [`Papers.${paper}.freq`]: 1 } }
        );


        let result = await cuetpapers.findOne(
            {
                subject: subject,
                [`Papers.${paper}`]: { $exists: true }
            },
            { [`Papers.${paper}`]: 1 }
        );

        if(!result)
        return res.status(200).json({ msg: [] });
    
        return res.status(200).json({ msg: [result] });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server Error' });
    }
})


app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) =>
res.sendFile(
    path.resolve(__dirname, '../', 'client', 'dist', 'index.html')
)
);

const port=3000
app.listen(port,()=> {
    console.log(`server is running in port:`,port)
})
