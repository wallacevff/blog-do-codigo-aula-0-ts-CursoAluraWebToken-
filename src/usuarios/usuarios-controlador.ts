import { UsuarioModelo } from "./usuarios-modelo";
import { InvalidArgumentError, InternalServerError } from "../erros";
import { Response, Request } from "express";

export class UsuarioControlador {
    static async adiciona(req: Request, res: Response) {
        const { nome, email, senha } = req.body
        try {
            const usuario = new UsuarioModelo({
                nome,
                email,
                senha
            });

            await usuario.adiciona();

            res.status(201).json();
        } catch (erro) {
            if (erro instanceof InvalidArgumentError) {
                res.status(422).json({ erro: erro.message });
            } else if (erro instanceof InternalServerError) {
                res.status(500).json({ erro: erro.message });
            } else {
                if(erro instanceof Error)
                    res.status(500).json({ erro: erro.message });
            }
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
                throw new Error();
            };
            await usuario.deleta()
            res.status(200).send();
        } catch (erro) {
            if(erro instanceof Error)
                res.status(500).json({ erro: erro.message });
        }
    }

}

