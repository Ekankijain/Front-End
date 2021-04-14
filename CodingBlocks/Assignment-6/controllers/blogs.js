const Blogs = require('../models/blogs');

exports.getBlogs = async (_req, res) => {
    try {
        const blogs = await Blogs.find({})
            .select('_id title snippet createdAt')
            .sort('-createdAt');
        res.render('blogs/blogs', {
            blogs
        });
        //res.send(blogs);
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.getBlog = async (req, res) => {
    try {
        const blog = await Blogs.findById(req.params.id)
            .select('_id title snippet content createdAt');
        res.render('blogs/blog', {
            blog
        });
    } catch (e) {
        res.status(500).send(e);
    }
}