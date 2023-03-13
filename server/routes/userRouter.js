const Router = require("express");
const router = new Router();
const UserController = require("../controllers/userController");
const authMidlware = require("../midlware/AuthMidlware");

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.get("/auth", authMidlware, UserController.checkUser);

// **
// router.delete("/");
module.exports = router;
