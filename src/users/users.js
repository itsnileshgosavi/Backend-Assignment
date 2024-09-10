import express, { response } from "express";
const usersRouter = express.Router();
import requestValidator from "../middleware/requestValidator.js";

const users = [
    { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", hobby: "Cycling" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", hobby: "Reading" },
    { id: 3, firstName: "Michael", lastName: "Brown", email: "michael.brown@example.com", hobby: "Hiking" },
    { id: 4, firstName: "Emily", lastName: "Johnson", email: "emily.johnson@example.com", hobby: "Painting" },
    { id: 5, firstName: "Daniel", lastName: "Garcia", email: "daniel.garcia@example.com", hobby: "Photography" },
    { id: 6, firstName: "Sophia", lastName: "Martinez", email: "sophia.martinez@example.com", hobby: "Cooking" },
    { id: 7, firstName: "David", lastName: "Wilson", email: "david.wilson@example.com", hobby: "Running" },
    { id: 8, firstName: "Ava", lastName: "Miller", email: "ava.miller@example.com", hobby: "Swimming" },
    { id: 9, firstName: "James", lastName: "Taylor", email: "james.taylor@example.com", hobby: "Traveling" },
    { id: 10, firstName: "Olivia", lastName: "Thomas", email: "olivia.thomas@example.com", hobby: "Gaming" }
  ];

//fetching all users at http://localhost:3300/users
usersRouter.get("/", (req, res) => {
    res.send(users);
});

//fetching single user at http://localhost:3300/users/id
usersRouter.get("/:id", (request, response)=>{
    const id = request.params.id;
    const user = users.find((user)=>user.id==id);
    if(!user){
        response.status(404).json({message:"user with this id does not exists"})
    }else{
        response.send(user);
    }

});

//creating a new user with post request at http://localhost:3300/users/register
usersRouter.post("/register", requestValidator, (req, res)=>{
   const {name, email, hobby} =req.body;
   console.log(name)
   const newuser ={
    id:users.length +1,
    name:name,
    email:email,
    hobby:hobby
   }
   users.push(newuser);
   res.send(users);
});

//Updating the data of an existing user at route http://localhost:3300/users/id
usersRouter.put("/:id", requestValidator, (req, res)=>{
    const newData =req.body;
    const id = req.params.id;
    const user = users.find((user)=>user.id==id);
    
    if(!user){
        res.status(404).json({message:"user does not exist with this id"});
    }else{
        const keys = Object.keys(newData);
        keys.forEach((key)=>{
            user[key]=newData[key];
        });
        res.send(users)
    }
    
});

//Delete single user by id at route http://localhost:3300/users/id

usersRouter.delete("/:id", (req, res)=>{
    const user = users.find((user)=>user.id==req.params.id);
    if(!user){
        res.status(404).json({message:"no user found with this id"})
    }else{
        const index = users.indexOf(user);
        users.splice(index, 1);
        res.send(users);
    }
})


export default usersRouter;