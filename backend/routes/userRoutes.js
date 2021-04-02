const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUserProfil,
  updateUserPassword,
  deleteUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userControllers.js");
const { requireAuth } = require("../middlewares/requireAuthMiddleware.js");
const paperRoutes = require("./paperRoutes");
const { route } = require("./reviewRoutes.js");

//api/v1/user
router.put("/update/profil", requireAuth, updateUserProfil);
router.put("/update/password", requireAuth, updateUserPassword);

//auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.route("/:id").get(requireAuth, getUser).delete(requireAuth, deleteUser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);

module.exports = router;
