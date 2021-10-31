const express = require("express");
const {
  addReview,
  deleteReview,
  updateReview,
} = require("../controllers/reviewControllers.js");
const { requireAuth } = require("../middlewares/requireAuthMiddleware.js");

const router = express.Router({ mergeParams: true });

router.route("/").post(requireAuth, addReview).put(requireAuth, updateReview);

router.delete("/:id", requireAuth, deleteReview);
module.exports = router;
