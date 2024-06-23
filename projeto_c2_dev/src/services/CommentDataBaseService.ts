import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CommentDataBaseService {
  async listDBComments() {
    try {
      return await prisma.comment.findMany();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async insertDBComment(data: { content: string; postId: number; userId: number }) {
    try {
      const newComment = await prisma.comment.create({
        data: {
          content: data.content,
          post: {
            connect: { id: data.postId }
          },
          user: {
            connect: { id: data.userId }
          }
        }
      });
      return newComment;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateDBComment(comment: Prisma.CommentUpdateInput, id: number) {
    try {
      const updatedComment = await prisma.comment.update({
        data: comment,
        where: {
          id: id,
        },
      });
      return updatedComment;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteDBComment(id: number) {
    try {
      await prisma.comment.delete({
        where: {
          id: id,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new CommentDataBaseService();