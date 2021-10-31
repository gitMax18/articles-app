const express = require("express");
const { addLike, removeLike } = require("../controllers/likeControllers.js");
const { requireAuth } = require("../middlewares/requireAuthMiddleware.js");

const router = express.Router({ mergeParams: true });

router.get("/", requireAuth, addLike);
router.delete("/", requireAuth, removeLike);

module.exports = router;
