const express = require("express");
const mainCtrl = require("../controller/mainCtrl")

const router = express.Router()

router.get('/', mainCtrl.home);
router.get('/about', mainCtrl.about);

module.exports = router;
