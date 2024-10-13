import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import { config } from "dotenv";


/*
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env', //A long, random string
  baseURL: 'http://localhost:3000', // The URL where the application is served
  clientID: 'oVmDhzDw3rQwuURL85u7YXm42eQLFuwu',//The Client ID found in your Application settings
  issuerBaseURL: 'https://dev-rgyrohrkp1xr7ptn.us.auth0.com' //The Domain as a secure URL found in your Application settings
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

*/

config(); // Load environment variables from .env file

const app = express();
const port = 5000;
const uri = process.env.MONGODB_URI;
console.log(uri);

app.use(cors());
console.log(process.env.MONGODB_URI);


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
        const database = client.db("Collection");
        const collect = database.collection("Users");
        const analog = await collect.find({}).toArray();
        //console.log(analog);
        res.json(analog);
    } catch (error) {
        console.error("Error trying to retrieve data for Analog:", error);
    }
  });


  app.get("/creepypasta", async (req, res) => {
    try {
        const database = client.db("Collection");
        const collect = database.collection("Users");
        const analog = await collect.find({}).toArray();
        res.json(analog);
    } catch (error) {
        console.error("Error trying to retrieve data for Creepypasta:", error);
    }
  });