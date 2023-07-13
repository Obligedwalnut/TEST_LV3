const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const { Op } = require("sequelize");

// 게시글 작성
const createNewPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = new Posts({ title, content });
    await post.save();
    res
      .status(201)
      .json({ id: post.id, title: post.title, content: post.content });
  } catch (error) {
    res.status(401).json({ message: "게시글을 작성할 수 없습니다." });
  }
};

// 게시글 전체 조회
const getAllPosts = async (req, res) => {
  const posts = await Posts.findAll({
    attributes: ["id", "title", "content"],
  });
  return res.status(200).json({ data: posts });
};

// 게시글 수정
const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  const post = await Posts.findOne({
    where: { id: postId },
  });

  if (!post) {
    return res.status(404).json({ message: "게시글이 존재하지 않습니다." });
  }

  post.title = title;
    post.content = content;
    await post.save();

  return res
    .status(200)
    .json({ id: post.id, title: post.title, content: post.content });
};

// 게시글 삭제
const deletePostById = async (req, res) => {
  
  
  try {
    const {postId} = req.params
    const post = await Posts.findOne({where: { id: postId }});

    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }
    const deletePost = await Posts.destroy({where: {id:postId}})
    if(deletePost){
        return res.status(200).json({message : "success"})
    }else {
        return res.status(401).json({message: "게시글이 정상적으로 삭제되지 않았습니다."})
    }


    // await post.remove();

    // res.json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};

router.post("/api/posts", createNewPost);
router.get("/api/posts", getAllPosts);
router.put("/api/posts/:postId", updatePost);
router.delete("/api/posts/:postId", deletePostById);

module.exports = router;
