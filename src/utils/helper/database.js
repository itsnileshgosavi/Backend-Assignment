import mongoose from "mongoose";
const mongodbURL ="mongodb://localhost:27017/backend-assignment";
const connectToDatabase = async () => {
    try {
        const { connection }=await mongoose.connect(mongodbURL);
        if(connection._readyState===1 && connection._hasOpened===true){
            console.log("MongoDB database connected");
        }else{
            console.log("MongoDB database connection failed");
        }
    } catch (error) {
        console.error(error);
        console.log("MongoDB database connection failed");
    }
}


export default connectToDatabase