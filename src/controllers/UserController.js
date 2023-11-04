import { UserSchema } from "../models/index.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { defaultInternalErrorMessage } from "../constant/index.js";
import {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/index.js";

export const userController = {
  signIn: async (req, resp) => {
    try {
      const { email, password } = req.body;
      const user = await UserSchema.findOne({ email });

      if (!user)
        return resp.status(404).send({ message: "Usuário não encontrado." });

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword)
        return resp.status(422).send({ message: "Senha inválida." });

      const accessToken = generateToken(user._id, user.email);
      const refreshToken = generateRefreshToken(user._id, user.email);

      resp.status(200).json({
        message: "Autenticação realizada com sucesso.",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      resp.status(500).send({
        message: defaultInternalErrorMessage,
      });
    }
  },
  signUp: async (req, resp) => {
    try {
      const { email, password } = req.body;

      let user = await UserSchema.findOne({ email });

      if (!user) {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        user = await UserSchema.create({
          email,
          password: passwordHash,
        });

        return resp
          .status(201)
          .send({ message: "Cadastro efetuado com sucesso." });
      } else if (user) {
        return resp.status(422).send({ message: "Usuário já cadastrado." });
      }
    } catch (error) {
      resp.status(500).send({
        message: defaultInternalErrorMessage,
      });
    }
  },
  refreshToken: async (req, resp) => {
    try {
      const refreshToken = req.body.refreshToken;

      const decodedRefreshToken = verifyRefreshToken(refreshToken);

      if (!decodedRefreshToken) {
        return resp
          .status(401)
          .json({ message: "Refresh token expirado ou inválido." });
      }

      const newAccessToken = generateToken(
        decodedRefreshToken._id,
        decodedRefreshToken.email
      );

      resp.status(200).json({
        message: "Token de acesso atualizado com sucesso",
        accessToken: newAccessToken,
      });
    } catch (error) {
      resp.status(500).send({ message: defaultInternalErrorMessage });
    }
  },
  getUser: async (req, resp) => {
    try {
      const { id } = req.params;
      const validId = mongoose.Types.ObjectId.isValid(id);
      let user;

      if (validId) {
        user = await UserSchema.findById(id, "-password");
      }
      if (!user)
        return resp.status(404).send({ message: "Usuário não encontrado." });
      return resp.status(200).send(user);
    } catch (error) {
      resp.status(500).send({
        message: defaultInternalErrorMessage,
      });
    }
  },
};
