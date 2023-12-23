const Cosplay = require("../models/Cosplay.model");
const router = require("express").Router();

//GET "api/cosplay/cosplay-list" --> shows a list of all cosplays
router.get("/cosplay-list", async (req, res, next) => {
    try {
        const response = await Cosplay.find()

        //this code is to retrieve data from JSON in dif order
    //     const totalCosplays = await Cosplay.countDocuments();
    // const randomOffset = Math.floor(Math.random() * totalCosplays);

    // const response = await Cosplay.find()
    //   .skip(randomOffset)
    //   .limit(300); // Adjust the limit based on your needs

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
      const response = await Cosplay.findById(cosplayId)//.populate("choosedBy");
      // console.log("cosplay details route: ", response)
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });


// PATCH "/api/cosplay/:cosplayId/choose-cosplay" --> adds one cosplay to your profile
router.patch("/:cosplayId/choose-cosplay", async (req, res, next) => {
    const { userId } = req.payload;
    try {
      await Cosplay.findByIdAndUpdate(req.params.cosplayId, {
        $addToSet: { choosedBy: userId }
      });
  
      res.status(200).json({ message: "Cosplay added to profile successfully" });
    } catch (err) {
      next(err);
    }
  });


//! FALTA UN-CHOOSE COSPLAY ROUTE

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