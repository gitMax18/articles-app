const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUserProfil,
  updateUserPassword,
} = require("../controllers/userControllers.js");
const { requireAuth } = require("../middlewares/requireAuthMiddleware.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.put("/user/update/password", requireAuth, updateUserPassword);
router.put("/user/update", requireAuth, updateUserProfil);
router.get("/user/:id", requireAuth, getUser);

module.exports = router;
