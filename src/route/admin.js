const express = require('express');
const router = express.Router();
const musicController = require('../app/controller/musicController');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../project_web_v5/src/public/img/')
    },
    filename: function(req, file, cb) {
        const { originalname } = file;
        cb(null, originalname);
    }
})
var upload = multer({ storage: storage })
router.get('/', musicController.manager);
//create
router.get('/create', musicController.create);
router.post('/create', upload.single('file'), musicController.store);
//update
router.get('/update/:id', musicController.edit);
router.put('/update/:id', musicController.update);
//delete
router.delete('/delete/:id', musicController.destroy);
router.delete('/delete/:id/force', musicController.forceDestroy);

module.exports = router;