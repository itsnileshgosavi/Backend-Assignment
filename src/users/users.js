import express from "express";
const usersRouter = express.Router();
import {
  putRequestValidator,
  postRequestValidator,
} from "../middleware/requestValidator.js";

//storing users in an array
const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    hobby: "Cycling",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    hobby: "Reading",
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    hobby: "Hiking",
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.johnson@example.com",
    hobby: "Painting",
  },
  {
    id: 5,
    firstName: "Daniel",
    lastName: "Garcia",
    email: "daniel.garcia@example.com",
    hobby: "Photography",
  },
  {
    id: 6,
    firstName: "Sophia",
    lastName: "Martinez",
    email: "sophia.martinez@example.com",
    hobby: "Cooking",
  },
  {
    id: 7,
    firstName: "David",
    lastName: "Wilson",
    email: "david.wilson@example.com",
    hobby: "Running",
  },
  {
    id: 8,
    firstName: "Ava",
    lastName: "Miller",
    email: "ava.miller@example.com",
    hobby: "Swimming",
  },
  {
    id: 9,
    firstName: "James",
    lastName: "Taylor",
    email: "james.taylor@example.com",
    hobby: "Traveling",
  },
  {
    id: 10,
    firstName: "Olivia",
    lastName: "Thomas",
    email: "olivia.thomas@example.com",
    hobby: "Gaming",
  },
];

//fetching all users at http://localhost:3300/users
usersRouter.get("/", (req, res) => {
  res.send(users);
});

//fetching single user at http://localhost:3300/users/id
usersRouter.get("/:id", (request, response) => {
  const id = request.params.id; //getting user id from url
  const user = users.find((user) => user.id == id); // searching user in the array
  if (!user) {
    response.status(404).json({ message: "user with this id does not exists" }); //if user not found responding with 404
  } else {
    response.send(user); //if user found sending user as response
  }
});

//creating a new user with post request at http://localhost:3300/users/register
usersRouter.post("/register", postRequestValidator, (req, res) => {
  const { firstName, lastName, email, hobby } = req.body; //capturing user data from request body

  //creating a new user object
  const newuser = {
    id: users.length + 1,
    firstName: firstName,
    lastName: lastName,
    email: email,
    hobby: hobby,
  };
  users.push(newuser); //adding new user to the array
  res.send(users); //sending all users as response
});

//Updating the data of an existing user at route http://localhost:3300/users/id
usersRouter.put("/:id", putRequestValidator, (req, res) => {
  const newData = req.body; //capturing user data from request body
  const id = req.params.id; //getting user id from url
  const user = users.find((user) => user.id == id); //searching user in the array

  if (!user) {
    res.status(404).json({ message: "user does not exist with this id" }); //if user not found responding with 404
  } else {
    //updating user data
    const keys = Object.keys(newData);
    keys.forEach((key) => {
      user[key] = newData[key];
    });
    res.send(users);//sending all users as response
  }
});

//Delete single user by id at route http://localhost:3300/users/id

usersRouter.delete("/:id", (req, res) => {
  const user = users.find((user) => user.id == req.params.id); //searching user in the array
  if (!user) {
    res.status(404).json({ message: "no user found with this id" });//if user not found responding with 404
  } else {
    const index = users.indexOf(user);//finding index of user in the array
    users.splice(index, 1);//deleting user from the array
    res.send(users);//sending all users as response
  }
});

export default usersRouter;
