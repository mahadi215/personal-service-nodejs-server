const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.x4kttba.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const dbCollection = client.db('cake_data').collection('menu');
        // const user = {email:"nahadi@gmail.com", name:"nahadi"};
        // const result = await userCollection.insertOne(user);
        // console.log(result);
    }
    finally{

    }

    
}
run().catch(err => console.log(err));



app.get('/', (req,res) => {
    res.send('hello from mongo server')
});

app.listen(port, ()=>{
    console.log(`listening port ${port}`);
})