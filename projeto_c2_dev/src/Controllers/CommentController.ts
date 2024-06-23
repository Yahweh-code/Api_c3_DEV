import { Request, Response } from "express";
import CommentDataBaseService from "../services/CommentDataBaseService";

class CommentController {
  async listComments(req: Request, res: Response) {
    try {
      const comments = await CommentDataBaseService.listDBComments();
      res.json({
        status: "ok",
        comments: comments,
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async createComment(req: Request, res: Response) {
    const body = req.body;
    if (!body.content || !body.postId || !body.userId) {
      return res.status(400).json({
        status: "error",
        message: "Falta parâmetros",
      });
    }

    try {
      const newComment = await CommentDataBaseService.insertDBComment({
        content: body.content,
        postId: body.postId,
        userId: body.userId,
      });
      res.json({
        status: "ok",
        newComment: newComment,
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async updateComment(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Faltou o ID",
      });
    }

    const { content } = req.body;
    if (!content) {
      return res.status(400).json({
        status: "error",
        message: "Falta parâmetros",
      });
    }

    try {
      const updatedComment = await CommentDataBaseService.updateDBComment(
        { content: content },
        parseInt(id)
      );
      res.json({
        status: "ok",
        updatedComment: updatedComment,
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async deleteComment(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Faltou o ID",
      });
    }

    try {
      const response = await CommentDataBaseService.deleteDBComment(parseInt(id));
      if (response) {
        res.json({
          status: "ok",
          message: "Comentário deletado com sucesso",
        });
      } else {
        res.status(500).json({
          status: "error",
          message: "Erro ao deletar o comentário",
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

export default new CommentController();
