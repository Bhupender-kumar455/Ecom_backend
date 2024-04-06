const express = require("express");
const {
  handleCreate,
  handleLogin,
  handleForgot,
  handleLogout,
  handleDashboard,
  handleAddToCart,
  handleAllCart,
} = require("../controller/user");
const verify = require("../middleware/user");
const Router = express.Router();

Router.post("/create", handleCreate);
Router.post("/login", handleLogin);
Router.post("/forgot", handleForgot);
Router.post("/verify", verify, (req, res) => {
  return res.json({ status: true, message: "authorized" });
});
Router.get("/logout", handleLogout);
Router.get("/dashbored", handleDashboard);
Router.post("/addToCart", handleAddToCart);
Router.post("/allCart", handleAllCart);

module.exports = Router;
