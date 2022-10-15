import { PostModelo } from "./posts-modelo";
import { InvalidArgumentError, InternalServerError } from "../erros";
import { Response, Request } from "express";

export class PostControlador {
    static async adiciona(req: Request, res: Response) {
        try {
            const post = new PostModelo(req.body);
            await post.adiciona();

            res.status(201).send(post);
        } catch (erro) {
            if (erro instanceof InvalidArgumentError) {
                res.status(422).json({ erro: erro.message });
            } else if (erro instanceof InternalServerError) {
                res.status(500).json({ erro: erro.message });
            } else {
                res.status(500).json({ erro: ((erro as unknown) as Error).message });
            }
        }
    }

    static async lista(req: Request, res: Response) {
        try {
            const posts = await PostModelo.lista();
            res.send(posts);
        } catch (erro) {
            erro = (erro as unknown) as Error;
            return res.status(500).json({ erro: erro });
        }
    }
}