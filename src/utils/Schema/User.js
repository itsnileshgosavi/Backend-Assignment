import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hobby: {
        type: String,
        required: true
    }
});
 export const User = mongoose.model("User", userSchema);
    