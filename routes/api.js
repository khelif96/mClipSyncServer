// Dependencies
const express = require('express');
const router = express.Router();

const apiHome = require('../controller/apiHome');
const clipBoardManager = require('../controller/clipBoardManager');
// API
// Base API Route
router.get('/', apiHome.getApi);
router.post('/', apiHome.postApi);

router.get('/readClipBoard', clipBoardManager.getClipBoardContents);
router.post('/writeClipBoard', clipBoardManager.writeClipBoardContents);



module.exports = router;
