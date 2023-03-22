const Router = require("express");
const router = new Router();
const BasketController = require("../controllers/BasketController");
const authMidlware = require("../midlware/authMidlware");

router.post("/", authMidlware, BasketController.create);
router.get("/:id", authMidlware, BasketController.getBasketDevices);

// **
// router.delete("/");
module.exports = router;
