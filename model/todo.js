import { de } from "date-fns/locale";
import mongoose from "mongoose";
import { maxLength } from "zod";

const TodoSchema = new mongoose.Schema({
    title: {
        type : String,
        required: [true,"Title is required"],
        trim: true,
        maxLength: [100, "Title cannot exceed 100 characters"],
    },
    description:{
        type:String,
        trim: true ,
        maxLength: [500, "Description cannot exceed 500 characters"],
    },
    completed:{
        type:Boolean,
        default: false,
    },
    priority:{
        type: String,
        enum: ["low", "medium", "high"],
        defautl: "medium"
    },
},{
    timestamps: true, 
},
)

export default mongoose.models.Todo || mongoose.model("Todo",TodoSchema);