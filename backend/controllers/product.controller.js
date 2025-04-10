
import Product from "../models/product.model.js";
import mongoose from "mongoose";


export const getProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({success: true, data: products});
    } catch (error) {
      console.log("Error fetching products:", error.message);
      res.status(500).json({success: false, message: "Server Error"});
    }
  } 


export const createProduct =  async (req, res) => {
  const product = req.body; // data sent by the user

  if(!product.name || !product.price || !product.image){
    return res.status(400).json({success: false, message:"Please provide all fields"});
  }
  
  const newProduct = new Product(product); // 

  try{ // tracking errors, when a product is being saved 
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct});
  } catch (error) { 
    console.error("Error creating product:", error.message);
    res.status(500).json({success: false, message:"Server error"});
  }
}


export const updateProduct = async (req, res) => {
    const {id} = req.params;
  
    const product = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"Invalid Product ID" });    
    }
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
      res.status(200).json({ success: true, data: updatedProduct});
    } catch (error) {
      res.status(500).json({success: false, message: "Server Error"});
      console.log("Error updating product: ", error.message);    
    }
  }

export const deleteProduct = async (req, res) => { // :id --> dynamic variable
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"Invalid Product ID" });    
    }

    try{
      await Product.findByIdAndDelete(id);
      res.status(200).json({success: true, message: "Product successfully deleted"});
    } catch (error) {
      console.log("Error in deleting product:", error.message);
      res.status(500).json({success: false, message:"Server Error"});
    }
  }