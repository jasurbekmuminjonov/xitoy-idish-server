const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  createWarehouse,
  getWarehouses,
  updateWarehouse,
  deleteWarehouse,
} = require("../controllers/warehouseController");
const {
  createProduct,
  getProducts,
  getProductsByWarehouse,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const {
  sellProduct,
  getSalesHistory,
} = require("../controllers/saleController");
const auth = require("../middlewares/authMiddleware");
const { getRate, updateRate, createRate } = require("../controllers/UsdController");

const router = express.Router();

// User routes
router.post("/users/register", registerUser);
router.post("/users/register-seller", auth, registerUser);
router.post("/users/login", loginUser);
router.get("/users", auth, getUsers);
router.put("/users/admin/:id", auth, updateUser);
router.delete("/users/admin/:id", auth, deleteUser);

// Warehouse routes
router.post("/warehouses/add", auth, createWarehouse);
router.get("/warehouses", auth, getWarehouses);
router.put("/warehouses/:id", auth, updateWarehouse);
router.delete("/warehouses/:id", auth, deleteWarehouse);

// Product routes
router.post("/products/add", auth, createProduct);
router.get("/products", auth, getProducts);
router.get("/products/warehouse/:id", auth, getProductsByWarehouse); // Get products by warehouse
router.put("/products/:id", auth, updateProduct);
router.delete("/products/:id", auth, deleteProduct);

// Sales routes
router.post("/sales/sell", auth, sellProduct);
router.get("/sales/history", auth, getSalesHistory);

router.post("/usd", auth, updateRate);
router.post("/usd/create", auth, createRate);
router.get("/usd", auth, getRate);

module.exports = router;
