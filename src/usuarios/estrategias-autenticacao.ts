import passport from "passport";
import { Strategy as LocalStrategy, IStrategyOptions } from "passport-local";
import { UsuarioModelo as Usuario, UsuarioModelo } from "./usuarios-modelo";
import { InvalidArgumentError } from "../erros";
import {Strategy as BearerStrategy} from "passport-http-bearer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function verificausuario(usuario: Usuario | null) {
    if (!usuario) {
        throw new InvalidArgumentError("Não existe usuário com esse e-mail.");
    }
    return usuario;
}

function senhaEmBranco(...params: any[]): null | InvalidArgumentError {
    if (!params) {
        throw new InvalidArgumentError("Senha em branco!")
    }
    for (let i: number = 0; i < params.length; i++) {
        if (!params[i] == null || params[i] == "") {
            throw new InvalidArgumentError("Senha em branco!");
        }
    }
    return null;
}
async function verificaSenha(senha?: string | null, senhaHash?: string | null) {
    senhaEmBranco(senha, senhaHash);
    const senhaValida: boolean = await bcrypt.compare(senha as string, senhaHash as string);
    if (!senhaValida) {
        throw new InvalidArgumentError("E-mail ou senha iválidos!");
    }
}


passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    } as IStrategyOptions, async (email: string | null, senha: string | null, done: CallableFunction) => {
        const usuario: Usuario | null = await Usuario.buscaPorEmail((email as unknown) as string | null);
        try {
            verificausuario(usuario);
            await verificaSenha(senha, usuario?.senhaHash);
            done(null, usuario);
        }
        catch (erro) {
            done(erro);
        }
    })
);

passport.use(
    new BearerStrategy( async (token: string, done : CallableFunction) => {
        try{
            const payload = jwt.verify(token, process.env.SECRET as string);
            const usuario : Usuario | null = await Usuario.buscaPorId((payload as Usuario).id as number);
            done(null, usuario);
        }
        catch(erro){
            done(erro);
        }
    })
);
