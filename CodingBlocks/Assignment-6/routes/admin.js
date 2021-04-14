const express = require('express');
const {
    addBlog,
    newBlog,
    getAdmin,
    editBlog,
    updateBlog,
    delBlog
} = require('../controllers/admin');
const Blogs = require('../models/blogs');

const router = express.Router();

router.get('/', getAdmin);
router.get('/add', addBlog);
router.post('/new', newBlog);
router.get('/edit/:id', editBlog);
router.post('/edits', updateBlog);
router.delete('/del/:id', delBlog);

module.exports = router;