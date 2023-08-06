const express = require('express');
const multer = require('multer');
const path = require('path');

const app  = express();

app.use(express.static(path.resolve(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
}); 

const upload = multer({ storage: storage }).single('file');

module.exports = { upload  };