const express = require("express");
const { manageLike, removeLike } = require("../controllers/likeControllers.js");
const { requireAuth } = require("../middlewares/requireAuthMiddleware.js");

const router = express.Router({ mergeParams: true });

router.post("/", requireAuth, manageLike);
// router.delete("/:id", requireAuth, removeLike);

module.exports = router;
