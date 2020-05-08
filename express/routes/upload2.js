var express = require('express');
var router = express.Router();
var multer = require('multer')


// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

// Init upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },

    fileFilter: function (req, file, cb) {
        sanitizeFile(file, cb);
    }
}).single('Icon')

/* GET upload page. */
router.get('/', function (req, res, next) {
    res.json({
        msg: "upload2"
    })
    // res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
    console.log(req.params)
    // res.send('done');
    upload(req, res, (err) => {
        if (err) {
            res.send("error!")
        } else {

            res.json({ name: req.param.name })

        }

    })
})


function sanitizeFile(file, cb) {
    // Define the allowed extension
    let fileExts = ['png', 'jpg', 'jpeg', 'gif']

    // Check allowed extensions
    let isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase());
    // Mime type must be an image
    let isAllowedMimeType = file.mimetype.startsWith("image/")

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true) // no errors
    }
    else {
        // pass error msg to callback, which can be displaye in frontend
        cb('Error: File type not allowed!')
    }
}
module.exports = router;