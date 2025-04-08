// const express = require("express");   
import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js"

dotenv.config();

const app = express();

//Middleware
app.use(express.json()); // Allows us to use json data in the body of the requestes req.body

app.get("/api/products/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({success: true, data: products});
  } catch (error) {
    console.log("Error fetching products:", error.message);
    res.status(500).json({success: false, message: "Server Error"});
  }
});

app.post("/api/products", async (req, res) => {
  const product = req.body; // data sent by the user

  if(!product.name || !product.price || !product.image){
    return res.status(400).json({success: false, message:"Please provide all fields"});
  }
  
  const newProduct = new Product(product); // 

  try{ // tracking errors, when a product is being saved 
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct});
  } catch (error) { 
    console.error("Error in create product:", error.message);
    res.status(500).json({success: false, message:"Server error"});
  }
});

app.delete("/api/products/:id", async (req, res) => { // :id --> dynamic variable
  const {id} = req.params;
  
  try{
    await Product.findByIdAndDelete(id);
    res.status(200).json({success: true, message: "Product successfully deleted"});
  } catch (error) {
    console.log("Error in deleting product:", error.message);
    res.status(404).json({success:false, message:"Product Not Found"});
  }
});




app.listen(5000, () => {
  connectDB();
  console.log("\n Server is running on port http://localhost:5000/");
});

// usxBoZpFgBoJfwll