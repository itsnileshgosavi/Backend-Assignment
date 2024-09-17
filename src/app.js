import express from "express";
import usersRouter from "./users/users.js";
import requestLogger from "./middleware/requestLogger.js";

const app = express();//initializing express

//middlewares
app.use(express.json()); //middleware to parse json
app.use(requestLogger); //middleware to log requests

//routes
app.use("/users", usersRouter);//routes to handle user data related requests
app.get("/", (req, res) => res.send("Welcome to Backend Assignment"));//routes to handle home page request


//listening
app.listen(3300, () => console.log("Server is running on port 3300"));