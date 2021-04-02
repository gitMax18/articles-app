const express = require("express");
const { getAppInfos } = require("../controllers/appcontrollers.js");

const router = express.Router();

router.get("/", getAppInfos);

module.exports = router;
