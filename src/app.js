import express from "express";
import usersRouter from "./routes/users/users.js";
import requestLogger from "./middleware/requestLogger.js";
import connectToDatabase from "./utils/helper/database.js";
const app = express();//initializing express


//connecting to database
connectToDatabase();

//middlewares
app.use(express.json()); //middleware to parse json
app.use(requestLogger); //middleware to log requests

//routes
app.use("/users", usersRouter);//routes to handle user data related requests
app.get("/", (req, res) => res.send("Welcome to Backend Assignment"));//routes to handle home page request


//listening
app.listen(3300, () => console.log("Server is running at \x1b[31m http://localhost:3300 \x1b[0m"));