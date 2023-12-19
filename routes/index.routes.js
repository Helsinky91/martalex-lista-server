const router = require("express").Router();
const isLogged = require("../middlewares/auth");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//set up for auth.routes.js to start "/auth/..."
const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

//set up for cosplay.routes.js to start "/cosplay/..."
const cosplayRoutes = require("./cosplay.routes");
router.use("/cosplay", cosplayRoutes);


//set up for profile.routes.js to start "/profile/..."
const profileRoutes = require("./profile.routes");
router.use("/profile", isLogged, profileRoutes);



module.exports = router;
