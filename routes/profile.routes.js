const router = require("express").Router();
const alergies = require("../utils/alergies");
const attendance = require("../utils/attendance");
const User = require("../models/User.model");

//! ONLY ROLE = ADMIN
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
  
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });


  //! ONLY USER ROLE ADMIN OR USER ROLE LIMITED. EN FRONT FILTER FURTHER
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
//! PROFILE DELETE


//GET "/api/profile/alergies" --> shows alergies in profile
router.get("/alergies", async (req, res, next) => {
    res.status(200).json(alergies);
});

//GET "/api/profile/attendance" --> shows attendance in profile
router.get("/attendance", async (req, res, next) => {
    res.status(200).json(attendance);
});

module.exports = router;