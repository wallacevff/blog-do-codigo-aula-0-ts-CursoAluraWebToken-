import { UsuarioControlador } from "./usuarios-controlador";
import { Express } from "express";
import passport from "passport";
import { MiddlewaresAutenticacao as middlewaresAutenticacao } from "./middlewares-autenticacao";
export function UsuarioRotas(app: Express) {
    app.route("/usuario/login")
        .post(middlewaresAutenticacao.local,
            UsuarioControlador.login);

    app.route("/usuario")
        .post(UsuarioControlador.adiciona)
        .get(UsuarioControlador.lista);
    app.route("/usuario/:id")
        .delete(
            passport.authenticate('bearer', { session: false }),
            UsuarioControlador.deleta);
}