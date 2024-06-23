import { Prisma, PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { validateHash } from "../utils/BcryptUtils";

const prisma = new PrismaClient();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';

class AuthService {
    constructor() {}

    async signIn(user: Prisma.UserWhereInput) {
        try {
            var userFound = await prisma.user.findFirstOrThrow({
                where: {
                    email: user.email
                }
            });
        } catch (error) {
            console.log(error);
            throw new Error("Erro ao buscar usuário...");
        }
        const passwordValidation = await validateHash(user.password as string, userFound.password);
        if (!passwordValidation) {
            throw new Error("Senha incorreta...");
        }
        try {
            const token = jwt.sign({ userId: userFound.id }, JWT_SECRET_KEY);
            return token;
        } catch (error) {
            console.log(error);
            throw new Error("Erro ao gerar token...");
        }
    }

    async signUp(user: Prisma.UserCreateInput) {
        try {
            const newUser = await prisma.user.create({
                data: user,
            });
            return newUser;
        } catch (error) {
            console.log(error);
            throw new Error("Erro ao criar usuário...");
        }
    }
}

export default new AuthService();