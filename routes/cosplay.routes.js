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


// PATCH "/api/cosplay/:cosplayId/choose-cosplay" --> adds one cosplay to your profile
router.patch("/:cosplayId/choose-cosplay", async (req, res, next) => {
    const { cosplayId } = req.params;
    try {

      // if (!req.payload._id) {
      //   return res.status(404).json({ message: 'User not found' });
      // }

      await User.findByIdAndUpdate(req.payload._id, {       
        $addToSet: { cosplayId : cosplayId }
      });

      await Cosplay.findByIdAndUpdate(cosplayId, {
        choosedBy: req.payload._id
      });
  
      res.status(200).json({ message: "Cosplay added to profile successfully" });
    } catch (err) {
      next(err);
    }
  });


// PATCH "/api/cosplay/:cosplayId/unchoose-cosplay" --> removes one cosplay from your profile
router.patch("/:cosplayId/unchoose-cosplay", async (req, res, next) => {
  const { cosplayId } = req.params;
  try {
      
      // if (!req.payload._id) {
      //     return res.status(404).json({ message: 'User not found' });
      // }

      // Remove the cosplayId from the user's cosplayId array
      await User.findByIdAndUpdate(req.payload._id, {
          $pull: { cosplayId: cosplayId }
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


//POST "api/cosplay/create-cosplay" --> create new cosplay (receives details from new cosplay in FE and creates new cosplay in DB)
// router.post("/create-cosplay", async (req, res, next) => {
//     const {name, image, description, choosedBy, link1, link2 } = req.body;

//     //get data from FE to send BE
//     const newCosplay = {
//         name: name,
//         image,

//         description: description,
//         // choosedBy: _id,
//         link1,
//         link2,
//     };
//     console.log("newCosplay", newCosplay);

//     try {
//         await Cosplay.create(newCosplay);
//         res.status(201).json("New cosplay created in DB");
//     } catch (err){
//         console.log("an error when creating cosplay occurred");
//         next(err);
//     }
// });

module.exports = router;