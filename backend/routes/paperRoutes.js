const express = require("express")
const router = express.Router()
const {newPaper, updatePaper, deletePaper} = require("../controllers/paperControllers.js")
const {requireAuth} = require("../middlewares/requireAuthMiddleware.js")

router.post("/paper/new",requireAuth ,newPaper)
router.put("/paper/:id", requireAuth, updatePaper)
router.delete("/paper/:id", requireAuth, deletePaper)


module.exports = router