const Router = require("express");
const router = new Router();
const TypeController = require("../controllers/typeController");
const checkRole = require("../midlware/checkRoleMidlware");

router.post("/", checkRole("ADMIN"), TypeController.create);
router.get("/", TypeController.getAll);

// **
// router.delete("/");
module.exports = router;
