import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    fname:{type:String},
    lname:{type:String},
    description:{type:String, default:'This is a sample description!'},
    username:{type:String},
    password:{type:String},
    image:{type:String},
    earnings:{type:Number, default:0}
})
export default mongoose.model('User', UserSchema)