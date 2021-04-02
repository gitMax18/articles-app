const express = require("express");
const {
  addReview,
  deleteReview,
  updateReview,
} = require("../controllers/reviewControllers.js");
const { requireAuth } = require("../middlewares/requireAuthMiddleware.js");

const router = express.Router({ mergeParams: true });

router.route("/").post(requireAuth, addReview);
router.route("/:id").delete(requireAuth, deleteReview).put(requireAuth, updateReview);

module.exports = router;
