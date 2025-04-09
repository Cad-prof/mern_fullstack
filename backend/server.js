// const express = require("express");   
import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json()); // Allows us to use json data in the body of the requestes req.body

app.use('/api/products', productRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("\n Server is running on port http://localhost:"+PORT);
});

// usxBoZpFgBoJfwll