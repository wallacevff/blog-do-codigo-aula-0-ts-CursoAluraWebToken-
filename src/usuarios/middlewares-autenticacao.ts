import passport, { AuthenticateOptions } from "passport";
import { Request, Response } from "express";

export class MiddlewaresAutenticacao {
    static local = (req: Request, res: Response, next: CallableFunction) => {
        passport.authenticate('local', { session: false },
            (erro, usuario, info) => {
                if (erro && erro.name === "InvalidArgumentError") {
                    return res.status(401).json({ erro: erro.message });
                }
                if (erro) {
                    return res.status(500).json({ erro: erro.message });
                }
                if (!usuario) {
                    return res.status(401).json({ erro: "Usuário ou senha em brancos" });
                }
                req.user = usuario;
                return next();
            })(req, res, next);
    }

    static bearer = (req: Request, res: Response, next: CallableFunction) => {
        passport.authenticate(
            'bearer',
            {
                session: false
            } as AuthenticateOptions,
            (erro, usuario, info) => {
                if (erro && erro.name === "JsonWebTokenError") {
                    return res.status(401).json({ erro: erro.message });
                }
                if (erro) {
                    res.status(500).json({erro : erro.message})
                }
                if(!usuario){
                    return res.status(401).json({erro : "Requisição mal formatada"});
                }

                req.user = usuario;
                return next();
            }
        )(req, res, next)
    }
}
