const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const reviewsCollection = client.db('reviews_data').collection('reviews');
        app.get('/menu', async(req, res) =>{
            const query = {};
            const cursor = dbCollection.find(query);
            const menu = await cursor.toArray();
            res.send(menu);
        });

        app.get('/menu/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const menuId = await dbCollection.findOne(query);
            res.send(menuId);
        });

        app.post('/reviews', async(req, res)=>{
            const review = req.body;
            const result = await reviewsCollection.insertOne(review);
            res.send(result);
        })
         app.get('/reviews', async(req, res)=>{
            const id = req.params.id;
            let query = {item: id};
            if (req.query.item) {
                query = {
                    item: req.query.item
                }
            }
            const cursor = reviewsCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
            // const reviewId = await reviewsCollection.find(query);
            // res.send(reviewId);
         })

         app.get('/myreviews', async(req,res)=>{
            let query = {};
            if (req.query.email){
                query ={
                    email: req.query.email
                }
            }
            const cursor = reviewsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
         })

         app.get('/reviews/:id',async(req,res)=>{
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await reviewsCollection.findOne(query);
            res.send(result);
         })

         app.post('/menu', async(req, res)=>{
            const menu = req.body;
            const result = await dbCollection.insertOne(menu);
            res.send(result);
        })

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