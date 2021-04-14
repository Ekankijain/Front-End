const Blogs = require('../models/blogs');

exports.getAdmin = async (_req, res) => {
    try {
        const blogs = await Blogs.find({})
            .select('_id title snippet createdAt')
            .sort('-createdAt');
        res.render('admin/admin', {
            blogs
        });
    } catch (e) {

        res.status(500).send(e);
    }
}

exports.addBlog = (_req, res) => {
    res.render('admin/add');
}

exports.newBlog = async (req, res) => {
    try {
        const {
            title,
            snippet,
            content
        } = req.body;
        const blog = new Blogs({
            title,
            snippet,
            content
        });
        await blog.save();
        res.redirect('/admin');
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.editBlog = async (req, res) => {
    try {
        const blog = await Blogs.findById(req.params.id)
            .select('_id title snippet content');
        res.render('admin/edit', {
            blog
        });
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const {
            _id,
            title,
            snippet,
            content
        } = req.body;
        const blog = await Blogs.findByIdAndUpdate({
            _id: _id
        }, {
            title,
            snippet,
            content
        })
        res.redirect('/admin');
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.delBlog = async (req, res) => {
    try {
        await Blogs.findByIdAndDelete(req.params.id);
        res.send("deleted");
    } catch (e) {
        res.status(500).send(e);
    }
}