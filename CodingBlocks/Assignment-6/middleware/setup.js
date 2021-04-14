const morgan = require("morgan");
const express = require("express");
const session = require("express-session");

module.exports = (app) => {
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: true,
        })
    );
    app.use(session({
        secret: "blog-session",
        resave: false,
        saveUninitialized: true
    }));
    app.use(express.static("public"));
}