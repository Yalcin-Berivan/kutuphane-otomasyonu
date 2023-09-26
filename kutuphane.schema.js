const mongoose=require("mongoose");
const Books =new mongoose.Schema({
    personalNameSurname:String,
    scholl:String,
    schollNo:Number,
    isActive:Boolean,
    bookId:Number,
    authorNameSurname:String,
    bookName:String,
    tcId:Number,
    createdAt:Date,
    updatedAt:Date
});
const KutuphaneModel=mongoose.model("book",Books);
module.exports=KutuphaneModel;