// this way if we add type=module in packagejson and node >13
import bodyParser from "body-parser";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
// or
// const express = require("express");
// const cors = require("cors");


const port = process.env.PORT || 5000;
const app = express();

dotenv.config();
app.use(cors());


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


// Router setup
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get('/',(req,res)=>{
  res.send('Hello to Memories API');
});

// Mongodb connection
const connectionURI = process.env.DB_URI;
mongoose
  .connect(connectionURI, {
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(port, () => {
      console.log("Server running at port " + port);
    })
  )
  .catch((err) => console.log(err.message));
