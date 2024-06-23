import { Request, Response } from "express";
import UserDataBaseService from "../services/UserDataBaseService";

class UserController {
  async listUsers(req: Request, res: Response) {
    try {
      const users = await UserDataBaseService.listDBUsers();
      res.json({
        status: "ok",
        users: users,
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async createUser(req: Request, res: Response) {
    const body = req.body;

    if (!body.email || !body.name) {
      return res.status(400).json({
        status: "error",
        message: "Falta parâmetros",
      });
    }

    try {
      const newuser = await UserDataBaseService.insertDBUser({
        name: body.name,
        email: body.email,
      });
      res.json({
        status: "ok",
        newuser: newuser,
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Faltou o ID",
      });
    }

    const { name, email } = req.body;
    if (!email || !name) {
      return res.status(400).json({
        status: "error",
        message: "Falta parâmetros",
      });
    }

    try {
      const updatedUser = await UserDataBaseService.updateDBUser(
        {
          name: name,
          email: email,
        },
        parseInt(id)
      );
      res.json({
        status: "ok",
        newuser: updatedUser,
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Faltou o ID",
      });
    }

    try {
      const response = await UserDataBaseService.deleteDBUser(parseInt(id));
      if (response) {
        res.json({
          status: "ok",
          message: "Usuário deletado com sucesso",
        });
      } else {
        res.status(500).json({
          status: "error",
          message: "Erro ao deletar o usuário",
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

export default new UserController();
