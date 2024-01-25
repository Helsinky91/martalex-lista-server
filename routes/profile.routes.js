const router = require("express").Router();
const User = require("../models/User.model");
const attendance = require("../utils/attendance");
const bcrypt = require("bcryptjs");

//GET "/api/profile/list" --> show filtered profile list
router.get("/list", async (req, res, next) => {
    try{
        const response = await User.find().populate("cosplayId");
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

// GET "/api/profile/my-profile" -> shows loggedin user profile by ID of req.payload
router.get("/my-profile", async (req, res, next) => {
    try {
      const response = await User.findById(req.payload._id).populate("cosplayId");
      // console.log("Cosplay details:", response.cosplayId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });


// GET "/api/profile/:userId/details" -> shows one profile by ID
router.get("/:userId/details", async (req, res, next) => {
    const { userId } = req.params;
    try {
      const response = await User.findById(userId).populate("cosplayId");
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });


//! PROFILE EDIT
//PATCH "/api/profile/:userId/edit "  => edits and updates profile
router.patch("/:userId/edit", async (req, res, next) => {
  const { name, email, attendance, alergies } = req.body;
  const { _id } = req.payload;
  const { userId } = req.params;

  if (name === "") {
    res.status(400).json({ errorMessage: "Rellena el nombre" });
    return;
  } else if (email === "") {
    res.status(400).json({ errorMessage: "Rellena el email" });
    return;
  }

  //get the changes to edit the user
  const userUpdates = {
    name,
    email,
    attendance, 
    alergies,
  };
  try {
    if (_id === userId) {
      await User.findByIdAndUpdate(req.params.userId, userUpdates);
      res.status(200).json("User updated successfully");
      console.log("userUpdates in profile edit", userUpdates);
    }
  } catch (error) {
    next(error);
  }
});

// GET "/api/profile/attendance" -> shows attendance in profile
router.get("/attendance", async (req, res, next) => {
  // console.log("attendance", attendance)
  res.status(200).json(attendance);
});



//! PROFILE DELETE


module.exports = router;