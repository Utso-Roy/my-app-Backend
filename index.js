const express = require("express");
const cors = require("cors");
const { MongoClient,ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
console.log("Mongo URI : ", MONGO_URI);

app.use(cors());
app.use(express.json());


const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function connectDB() {
  try {
    await client.connect();

    console.log("MongoDB connected successfully");
 
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});