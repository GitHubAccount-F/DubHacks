import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import { config } from "dotenv";



config(); // Load environment variables from .env file



const app = express();
const port = 5000;
const uri = process.env.MONGODB_URI;
console.log(uri);

app.use(cors());
app.use(express.json());


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    console.log(process.env.MONGODB_URI);
});

//  Connect to Mondodb Cluster
const client = new MongoClient(uri);
const dbname = "DubHacks"


const connectToDatabase = async() => {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log(`Connected to cluster ${dbname}`);
        
    } catch (e) {
        console.error("Failed to connect:", e);
    }
};



// connect to database 
connectToDatabase();

// analog page
app.get("/analog", async (req, res) => {
    try {
        const database = client.db("horror");
        const collect = database.collection("Analog");
        const analog = await collect.find({}).toArray();
        //console.log(analog);
        res.json(analog);
    } catch (error) {
        console.error("Error trying to retrieve data for Analog:", error);
    }
  });


  app.get("/creepypasta", async (req, res) => {
    try {
        const database = client.db("horror");
        const collect = database.collection("Creepypasta");
        const analog = await collect.find({}).toArray();
        res.json(analog);
    } catch (error) {
        console.error("Error trying to retrieve data for Creepypasta:", error);
    }
  });