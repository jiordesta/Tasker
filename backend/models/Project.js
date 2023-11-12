import mongoose from "mongoose";
const ProjectSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    owner:{type: mongoose.Types.ObjectId},
    members:[{type: mongoose.Types.ObjectId}],
    image:{type:String},
    start:{type:String},
    end:{type:String},
    created:{type:Date, default:Date.now}
})
export default mongoose.model('Project', ProjectSchema)