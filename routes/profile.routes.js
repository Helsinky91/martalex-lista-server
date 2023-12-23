const router = require("express").Router();
const User = require("../models/User.model");


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


module.exports = router;