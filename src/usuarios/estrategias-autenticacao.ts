import passport from "passport";
import passportLocal, { Strategy as LocalStrategy, IStrategyOptions, VerifyFunction } from "passport-local";
import { UsuarioModelo as Usuario } from "./usuarios-modelo";
import { InvalidArgumentError } from "../erros";
import { Request } from "express";
import bcrypt from "bcrypt";
import { callbackify } from "util";
//const LocalStrategy = passportLocal.Strategy;

function verificausuario(usuario: Usuario | null) {
    if (!usuario) {
        throw new InvalidArgumentError("Não existe usuário com esse e-mail.");
    }
    return usuario;
}

function senhaEmBranco(...params: any[]): null | InvalidArgumentError {
    //console.log(params[0]);
    //console.log(params[1]);
    if (!params) {
        throw new InvalidArgumentError("Senha em branco!")
    }
    for (let i: number = 0; i < params.length - 1; i++) {
        //console.log(params.length);
        if (!(params[i])) {
            throw new InvalidArgumentError("Senha em branco!");
        }
    }
    return null;
}
async function verificaSenha(senha?: string | null, senhaHash?: string | null) {
    //console.log(senhaEmBranco(senha, senhaHash));
    //senhaEmBranco(senha, null);
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
    } as IStrategyOptions, async ( email: string | null, senha: string | null, done) => {
        const usuario: Usuario | null = await Usuario.buscaPorEmail((email as unknown) as string | null);
        try {
            verificausuario(usuario);
            await verificaSenha(senha, usuario?.senhaHash);
            done(null, usuario);
        }
        catch (erro) {
            console.log("Erro...")
            done(erro);
        }
    })
)
