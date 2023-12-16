const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const cosplayRoutes = require("./cosplay.routes");
router.use("/cosplay", cosplayRoutes);


module.exports = router;
