import express from "express";
import usersRouter from "./users/users.js";
import requestLogger from "./middleware/requestLogger.js";

const app = express();//initializing express

//middlewares
app.use(express.json());
app.use(requestLogger);

//routes
app.use("/users", usersRouter);
app.get("/", (req, res) => res.send("Welcome to Backend Assignment"));


//listening
app.listen(3300, () => console.log("Server started on port 3300"));