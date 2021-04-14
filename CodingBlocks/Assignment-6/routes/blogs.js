const express = require('express');
const {
    getBlogs,
    getBlog
} = require('../controllers/blogs');
const Blogs = require('../models/blogs');

const router = express.Router();

router.get('/', getBlogs);
router.get('/blog/:id', getBlog);
router.get('/about', (_req, res) => {
    res.render('blogs/about')
})

module.exports = router;