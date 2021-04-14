const express = require("express");
const mongoose = require("mongoose");
const blogs = require("./routes/blogs");
const admin = require("./routes/admin");
const user = require("./routes/user");
require("dotenv").config();

const finduser = require('./middleware/finduser');

const app = express();

mongoose
    .connect("mongodb+srv://ad1234:ad1234@cluster1.bqwhs.mongodb.net/examblog?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => console.log("connected to mongoDB"))
    .catch((e) => {
        console.log(e);
        return process.exit(1);
    });

app.set("view engine", "ejs");

require('./middleware/setup')(app);

app.use("/blogs", blogs);
app.use("/admin", admin, admin);
app.use("/user", user);

app.use((_req, res) => {
    res.redirect("/blogs");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));