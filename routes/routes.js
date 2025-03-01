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
  getClientHistory,
} = require("../controllers/saleController");
const { createClient, getClients } = require("../controllers/clientController");
const {
  createDebt,
  getDebtsByClient,
  payDebt,
  getAllDebtors,
} = require("../controllers/debtController");
const auth = require("../middlewares/authMiddleware");
const {
  getRate,
  updateRate,
  createRate,
} = require("../controllers/UsdController");
const {
  getPromos,
  createPromo,
  updatePromo,
  deletePromo,
} = require("../controllers/promoController");
const { addBrak, getBrakHistory } = require("../controllers/brakController"); // Brak controllerlarini import qilish

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
router.get("/clients/:clientId/history", auth, getClientHistory);

// Client routes
router.post("/clients", auth, createClient);
router.get("/clients", auth, getClients);

// Debt routes
router.post("/debts", auth, createDebt);
router.get("/debts/client/:clientId", auth, getDebtsByClient);
router.put("/debts/pay/:id", auth, payDebt);
router.get("/debts/debtors", auth, getAllDebtors);

// USD rate routes
router.post("/usd", auth, updateRate);
router.post("/usd/create", auth, createRate);
router.get("/usd", auth, getRate);

// Promo routes
router.get("/promo", auth, getPromos);
router.post("/promo", auth, createPromo);
router.put("/promo/:id", auth, updatePromo);
router.delete("/promo/:id", auth, deletePromo);

// Brak routes
router.post("/brak/add", auth, addBrak); // Brak mahsulot qo'shish
router.get("/brak/history", auth, getBrakHistory); // Brak mahsulotlar tarixi

module.exports = router;
