const mongoose =require("mongoose")

//define schema
const CategorieSchema = new mongoose.Schema({
   cat_name:{
        type: String,
        required: true
    }
},{timestamps:true})

//create collection
const CategorieModel = mongoose.model('categorie',CategorieSchema)//Category is the name of collection
module.exports=CategorieModel