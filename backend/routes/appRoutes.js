const express = require("express");
const { getAppInfos } = require("../controllers/appcontrollers.js");

const router = express.Router();

router.get("/app/infos", getAppInfos);

module.exports = router;
