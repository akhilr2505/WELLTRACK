const express = require('express');
const cors = require("cors");
const mongodb = require("mongodb");
const MongodbClient = mongodb.MongoClient;
const app = express();
app.use(cors());
app.use(express.json());
const Database = "DB";
const url = "mongodb+srv://dbWeight:1234567890@cluster0.hngzp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.post("/adddata", async (req,res) =>
{
    try 
    {
        let connection = await MongodbClient.connect(url);
        let db = connection.db(Database);
        await db.collection("employeeDB").insertOne(req.body);
        connection.close();
        res.status(200).json({alert:"done"});
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json(req.body);  
    }
});
app.get("/readdata", async (req,res) =>
{
    try
    {
        let connection = await MongodbClient.connect(url);
        let db = connection.db(Database);
        let collection = db.collection("employeeDB");
        collection.find({}).toArray((error, result) => 
        {
            if(error) 
            {
                return res.status(500).send(error);
            }
            res.send(result);
        });
        connection.close();
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({alert:"error"});
    }
});
const port = process.env.PORT || 8080;
app.listen(port);
