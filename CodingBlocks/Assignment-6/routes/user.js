const express = require("express");
const {
    login,
    handleLogin
} = require('../controllers/user');

const router = express.Router();

router.get("/login", login);
router.post("/sign", handleLogin);

module.exports = router;