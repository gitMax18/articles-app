const express = require("express");
const router = express.Router();
const {
  newPaper,
  updatePaper,
  deletePaper,
  getAllPapers,
  getPaper,
  getUserPapers,
  getAppInfos,
} = require("../controllers/paperControllers.js");
const { requireAuth } = require("../middlewares/requireAuthMiddleware.js");

router.post("/paper/new", requireAuth, newPaper);
router.put("/paper/:id", requireAuth, updatePaper);
router.delete("/paper/:id", requireAuth, deletePaper);
router.get("/papers", getAllPapers);
router.get("/paper/:id", getPaper);
router.get("/user/papers", requireAuth, getUserPapers);

// app infos

module.exports = router;
