import { UsuarioModelo } from "./usuarios-modelo";
import { InvalidArgumentError, InternalServerError } from "../erros";
import { Response, Request, Express } from "express";
import jasonwebtoken, { JwtPayload, SignOptions } from "jsonwebtoken";
import { manipulaBlacklist } from "../../redis/manipula-blacklist";

import path from "path";
const rootDir: string = path.resolve('./');
export class UsuarioControlador {
    static criaTokenJWT(usuario: UsuarioModelo) {
        const payload: JwtPayload = {
            id: usuario.id
        };
        const token: string = jasonwebtoken.sign(payload, process.env.SECRET as string, ({ expiresIn: "15m" } as unknown) as SignOptions);
        return token;
    }

    static async adiciona(req: Request, res: Response) {
        const { nome, email, senha } = req.body
        try {
            const usuario = new UsuarioModelo({
                nome,
                email,

            });
            await usuario.adicionaSenha(senha);
            await usuario.adiciona();

            res.status(201).json();
        } catch (erro) {
            if (erro instanceof InvalidArgumentError) {
                res.status(422).json({ erro: erro.message });
            } else if (erro instanceof InternalServerError) {
                res.status(500).json({ erro: erro.message });
            } else {
                if (erro instanceof Error)
                    res.status(500).json({ erro: erro.message });
            }
        }
    }

    static login(req: Request, res: Response) {
        const token: string = UsuarioControlador.criaTokenJWT((req.user as unknown) as UsuarioModelo);
        res.set('Authorization', token);
        res.status(204).send();
    }

    static async logout(req: Request, res: Response) {
        try {
            const token: string = (req as any).token;
            await manipulaBlacklist.adiciona(token);
            res.status(204).send();
        }
        catch (e) {
            res.status(500).send((e as Error).message);
        }
    }

    static async lista(req: Request, res: Response) {
        const usuarios = await UsuarioModelo.lista();
        res.json(usuarios);
    }

    static async deleta(req: Request, res: Response) {
        const usuario = await UsuarioModelo.buscaPorId((req.params.id as unknown) as number);
        try {
            if (!usuario) {
                throw new Error("Usuário não existe na base de dados");
            };
            await usuario.deleta()
            res.status(200).send();
        } catch (erro) {
            if (erro instanceof Error)
                res.status(500).json({ erro: erro.message });
        }
    }

}

