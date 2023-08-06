const express = require('express');
const {login, logout, signup } = require('../controllers/auth');


const router = express.Router()

router.post('/login', login);

router.get("/logout", logout);

router.post("/signup", signup);


module.exports = router