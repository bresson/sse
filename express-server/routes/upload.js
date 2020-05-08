var express = require('express');
var router = express.Router();
var multer = require('multer')
var upload = multer({ dest: './uploads/' })


/* GET upload page. */
router.get('/', function (req, res, next) {
    res.json({
        msg: "hwllo wolrd!"
    })
    // res.render('index', { title: 'Express' });
});

router.post('/', upload.single('Icon'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any

    console.log(req.body, req.file)

    const host = req.hostname;
    const filePath = req.protocol + "://" + host + '/' + req.file.path;

    console.log(filePath)
    // res.json({ name: req.body.name, img: filePath })
    res.json({ name: req.body.name })
})

module.exports = router;