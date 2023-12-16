const router = require("express").Router();

//GET "api/cosplay/cosplay-list" --> shows a list of all cosplays
router.get("/cosplay-list", async (req, res, next) => {
    // try {
    //     const response = await 
    // }
    console.log("postman accediendo a la ruta");
    res.json("todo bien x aquí");
});


//cosplay-group --> to show by grouping ?





module.exports = router;