const router = require("express").Router();
const { Comment } = require("../../models");

//Get all comments
router.get("/", async (req, res) => {
  try {
    let getAllComments = await Comment.findAll({});
    res.status(200).json(getAllComments);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Get a single comment
router.get("/:id", async (req, res) => {
  try {  
    const commentId = req.params.id;
    let comment = await Comment.findByPk(commentId);
    res.status(200).json(comment);
  }catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  
});

//Create a comment
router.post("/", async (req, res) => {
  if (req.session.logged_in) {

    try {
      let createdComment = await Comment.create({
        comment_date: req.body,
        comment_content: req.body.comment_content,
        user_id: req.session.user_id,
      });
      res.status(200).json(createdComment);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

//Update a comment
router.put("/:id", async (req, res) => {
  let commentId = req.params.id;

  try {
    //verify if update is uppercase or lowercase
    let commentToUpdate = await Comment.update(      
      { comment_text: req.body.comment_text },
      {
        where: { id: commentId },
      }

    );

    if (!commentToUpdate) {
      res.status(404).json({ message: "Post not found!" });
      return;
    } else {
      res.status(200).json(commentToUpdate);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Delete a specific comment
router.delete("/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    let destroyComment = await Comment.destroy({
      where: { id: postId },
    });
    if (!destroyComment) {
      res.status(404).json({ message: "Comment not found!" });
      return;
    } else {
      res.status(200).json(destroyComment);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
