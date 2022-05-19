const express = require('express');
const router = express.Router();
const siteController = require('../app/controller/SiteController');

router.get('/site/search', siteController.search);
router.get('/site/detail', siteController.detail);
router.get('/site/style', siteController.style);
router.get('/', siteController.home);
router.get('*', siteController.notpage);


module.exports = router;