import express from "express";
const usersRouter = express.Router();
import { User } from "../../utils/Schema/User.js";
import {
  putRequestValidator,
  postRequestValidator,
} from "../../middleware/requestValidator.js";

//fetching all users at http://localhost:3300/users
usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(404).json({ message: "no users found" }); //if user not found responding with 404
    } else {
      res.send(users); //if user found sending all users as response
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error: error }); //in case of error responding with 500
  }
});

//fetching single user at http://localhost:3300/users/id
usersRouter.get("/:id", async (request, response) => {
  const id = request.params.id; //getting user id from url
  try {
    const user = await User.findOne({ _id: id }); // searching user in the database
    if (!user) {
      response
        .status(404)
        .json({ message: "user with this id does not exists" }); //if user not found responding with 404
    } else {
      response.send(user); //if user found sending user as response
    }
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "Internal server error", success: false, error: error }); //in case of error responding with 500
  }
});

//creating a new user with post request at http://localhost:3300/users/register
usersRouter.post("/register", postRequestValidator, async (req, res) => {
  const { firstName, lastName, email, hobby } = req.body; //capturing user data from request body

  try {
    //creating a new user object
    const newuser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      hobby: hobby,
    };
    const user = new User(newuser);
    const created = await user.save();
    res
      .status(201)
      .json({
        message: "user created successfully",
        success: true,
        data: created,
      }); //sending the newly created user
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res
        .status(400)
        .json({ message: "account already exists with this email id", success: false });
    } else {
      res
        .status(500)
        .json({
          message: "Internal server error",
          success: false,
          error: error,
        });
    }
  }
});

//Updating the data of an existing user at route http://localhost:3300/users/id
usersRouter.put("/:id", putRequestValidator, async (req, res) => {
  const newData = req.body; //capturing user data from request body
  const id = req.params.id; //getting user id from url
  try {
    const user = await User.findOne({ _id: id }); //searching the user in the db

    if (!user) {
      res.status(404).json({ message: "user does not exist with this id", success: false }); //if user not found responding with 404
    } else {
      //updating user data
      const keys = Object.keys(newData);
      keys.forEach((key) => {
        user[key] = newData[key];
      });
      const updated = await user.save(); //saving the updated user
      res.json({
        message: "user updated successfully",
        success: true,
        updatedData: updated,
      }); //sending updated user as response
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error: error }); //in case of error responding with 500
  }
});

//Delete single user by id at route http://localhost:3300/users/id

usersRouter.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.params.id }); //deleting user from the db
    if (deletedUser.deletedCount == 0) {
      res
        .status(404)
        .json({ message: "no user found with this id", success: false }); //if user not found responding with 404
    } else {
      res.statusCode = 200;
      res.json({ message: "user deleted successfully", success: true }); //sending success response
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error: error }); //in case of error responding with 500
  }
});

export default usersRouter;
