const Cosplay = require("../models/Cosplay.model");
const User = require("../models/User.model");
const router = require("express").Router();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//GET "api/cosplay/cosplay-list" --> shows a list of all cosplays
router.get("/cosplay-list", async (req, res, next) => {
    try {
        const response = await Cosplay.find()
        const shuffledCosplays = shuffleArray(response);
    
    // console.log("cosplaylist: ", response);
        // res.status(200).json(response)
        res.status(200).json(shuffledCosplays)
        
    } catch(err){
        next(err)
    }
});

//GET "api/cosplay/cosplay-list" --> shows a list of all cosplays
router.get("/cosplay-list-choosed", async (req, res, next) => {
  try {
      // const response = await Cosplay.find() 
      const response = await Cosplay.find({ choosedBy: { $ne: null } }).sort('serie');
      // console.log("cosplaylist: ", response);
      res.status(200).json(response)
  } catch(err){
      next(err)
  }
});


// GET "/api/cosplay/:cosplayId/details" -> shows detailed cosplay
router.get("/:cosplayId/details", async (req, res, next) => {
    const { cosplayId } = req.params;
  
    try {
      const response = await Cosplay.findById(cosplayId).populate("choosedBy");
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });


// // PATCH "/api/cosplay/:cosplayId/choose-cosplay" --> adds one cosplay to your profile
// router.patch("/:cosplayId/choose-cosplay", async (req, res, next) => {
//     const { cosplayId } = req.params;
//     try {

//       // await User.findByIdAndUpdate(req.payload._id, {       
//       //   $addToSet: { cosplayId : cosplayId }
//       // });
//       await User.findByIdAndUpdate(req.payload._id, { cosplayId: cosplayId });

//       await Cosplay.findByIdAndUpdate(cosplayId, {
//         choosedBy: req.payload._id
//       });
  
//       res.status(200).json({ message: "Cosplay added to profile successfully" });
//     } catch (err) {
//       next(err);
//     }
//   });

// PATCH "/api/cosplay/:cosplayId/choose-cosplay" --> adds one cosplay to your profile
router.patch("/:cosplayId/choose-cosplay", async (req, res, next) => {
  const { cosplayId } = req.params;
  try {
      const cosplay = await Cosplay.findById(cosplayId);

      // Check if the cosplay is already chosen
      if (cosplay.choosedBy) {
          return res.status(400).json({ message: "This cosplay has already been chosen." });
      }

      // Update the user's cosplayId
      await User.findByIdAndUpdate(req.payload._id, { cosplayId: cosplayId });

      // Update the cosplay's choosedBy
      await Cosplay.findByIdAndUpdate(cosplayId, {
          choosedBy: req.payload._id
      });

      // Fetch the updated data
      const updatedCosplay = await Cosplay.findById(cosplayId).populate("choosedBy");

      res.status(200).json({ message: "Cosplay added to profile successfully", cosplay: updatedCosplay });
  } catch (err) {
      next(err);
  }
});


// PATCH "/api/cosplay/:cosplayId/unchoose-cosplay" --> removes one cosplay from your profile
router.patch("/:cosplayId/unchoose-cosplay", async (req, res, next) => {
  const { cosplayId } = req.params;
  try {
      
      // Remove the cosplayId from the user's cosplayId array
      // await User.findByIdAndUpdate(req.payload._id, {
      //     $pull: { cosplayId: cosplayId }
      // });

      await User.findByIdAndUpdate(req.payload._id, {
        cosplayId: null
      });

      // Remove the choosedBy information from the cosplay
      await Cosplay.findByIdAndUpdate(cosplayId, {
          choosedBy: null
      });

      res.status(200).json({ message: "Cosplay removed from profile successfully" });
  } catch (err) {
      next(err);
  }
});



module.exports = router;