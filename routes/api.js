// Dependencies
const express = require('express');
const router = express.Router();

const apiHome = require('../controller/apiHome');
const clipBoardManager = require('../controller/clipBoardManager');
const auth = require('../controller/auth');

// API
// Base API Route
router.get('/', apiHome.getApi);
router.post('/', apiHome.postApi);

router.post('/register', auth.register);
router.post('/login', auth.login);

router.get('/readClipBoard', auth.verifyToken, clipBoardManager.getClipBoardContents);
router.post('/writeClipBoard', auth.verifyToken, clipBoardManager.writeClipBoardContents);



module.exports = router;
