const expresss = require("express");
const router = expresss.Router();

const {getAllProducts, getAllProductsStatic} = require("../controllers/products");

router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

module.exports = router;
