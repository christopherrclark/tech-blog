const router = require("express").Router();
const { Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const post = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const posts = post.map((post) => post.get({ plain: true }));
    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/new", withAuth, async (req, res) => {
  res.render("newpost", {
    layout: "dashboard",
  });
});

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      res.render("editpost", {
        layout: "dashboard",
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
