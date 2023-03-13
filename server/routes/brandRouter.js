const Router = require("express");
const router = new Router();
const BrandRouter = require("../controllers/brandController");
const checkRole = require("../midlware/checkRoleMidlware");

router.post("/", checkRole("ADMIN"), BrandRouter.create);
router.get("/", BrandRouter.getAll);

// **
// router.delete("/");
module.exports = router;
