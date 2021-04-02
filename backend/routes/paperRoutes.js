const express = require("express");
const router = express.Router();
const {
  newPaper,
  updatePaper,
  deletePaper,
  getAllPapers,
  getPaper,
  // getUserPapers,
} = require("../controllers/paperControllers.js");
const { addReview } = require("../controllers/reviewControllers.js");
const { requireAuth } = require("../middlewares/requireAuthMiddleware.js");
const reviewRoute = require("./reviewRoutes");
const likeRoute = require("../routes/likeRoute.js");

// router.post("/paper/new", requireAuth, newPaper);
// router.put("/paper/:id", requireAuth, updatePaper);
// router.delete("/paper/:id", requireAuth, deletePaper);
// router.get("/papers", getAllPapers);
// router.get("/paper/:id", getPaper);
// router.get("/user/papers", requireAuth, getUserPapers);

router.use("/:paperId/reviews", reviewRoute);
router.use("/:paperId/likes", likeRoute);

//api/v1/papers
router.route("/").get(getAllPapers).post(requireAuth, newPaper);
//api/v1/papers/:id
router
  .route("/:id")
  .get(getPaper)
  .delete(requireAuth, deletePaper)
  .put(requireAuth, updatePaper);

module.exports = router;
