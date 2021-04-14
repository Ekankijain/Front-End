const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
    try {
        const useR = await User.find({});
        let pname = "Login";
        if (useR.length === 0) {
            pname = "Sign";
        }
        res.render("user/login", {
            pname
        });
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.handleLogin = async (req, res) => {
    try {
        let {
            username,
            password,
        } = req.body;
        const useR = await User.find({});
        if (useR.length === 0) {
            password = await bcrypt.hash(password, 10);
            const user = new User({
                username,
                password,
            });
            await user.save();
            req.session.admin = true;
            res.redirect("/admin");
        } else {
            const truth = await bcrypt.compare(password, useR[0].password);
            if (truth) {
                req.session.admin = true;
                res.redirect("/admin");
            } else {
                res.status(400).send("Invalid user or password");
            }
        }
    } catch (e) {
        res.status(500).send(e);
    }
}