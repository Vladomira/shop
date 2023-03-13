const Router = require("express");
const router = new Router();
const DeviceRouter = require("../controllers/deviceController");
const checkRole = require("../midlware/checkRoleMidlware");

router.post("/", checkRole("ADMIN"), DeviceRouter.create);
router.get("/", DeviceRouter.getAll);
router.get("/:id", DeviceRouter.getById);

// **
// router.delete("/");
module.exports = router;
