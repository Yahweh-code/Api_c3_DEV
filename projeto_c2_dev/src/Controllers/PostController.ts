import { Request, Response } from "express";
import PostDataBaseService from "../services/PostDataBaseService";

class PostController {
  async listPosts(req: Request, res: Response) {
    try {
      const posts = await PostDataBaseService.listDBPosts();
      res.json({
        status: "ok",
        posts: posts,
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async createPost(req: Request, res: Response) {
    const body = req.body;

    if (!body.title || !body.content || !body.authorId) {
      return res.status(400).json({
        status: "error",
        message: "Falta parâmetros",
      });
    }

    try {
      const newPost = await PostDataBaseService.insertDBPost({
        title: body.title,
        content: body.content,
        author: { connect: { id: parseInt(body.authorId) } }, 
      });
      res.json({
        status: "ok",
        newPost: newPost,
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async updatePost(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Faltou o ID",
      });
    }

    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        status: "error",
        message: "Falta parâmetros",
      });
    }

    try {
      const updatedPost = await PostDataBaseService.updateDBPost(
        { title: title, content: content },
        parseInt(id)
      );
      res.json({
        status: "ok",
        updatedPost: updatedPost,
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async deletePost(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Faltou o ID",
      });
    }

    try {
      const response = await PostDataBaseService.deleteDBPost(parseInt(id));
      if (response) {
        res.json({
          status: "ok",
          message: "Post deletado com sucesso",
        });
      } else {
        res.status(500).json({
          status: "error",
          message: "Erro ao deletar o post",
        });
      }
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

export default new PostController();
