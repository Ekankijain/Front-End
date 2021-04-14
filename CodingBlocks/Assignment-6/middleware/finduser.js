const User = require("../models/user");

module.exports = async (req, res, next) => {
    if (req.session.admin) {
        next();
    } else {
        res.redirect('/user/login');
    }
};