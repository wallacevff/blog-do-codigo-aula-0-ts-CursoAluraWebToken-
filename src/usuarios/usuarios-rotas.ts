import { UsuarioControlador } from "./usuarios-controlador";
import { Express } from "express";
import passport from "passport";

export function UsuarioRotas(app: Express) {
    app.route("/usuario/login")
        .post(passport
            .authenticate(
                'local',
                { session: false }
            ),
            UsuarioControlador.login);

    app.route("/usuario")
        .post(UsuarioControlador.adiciona)
        .get(UsuarioControlador.lista);
    app.route("/usuario/:id")
        .delete(UsuarioControlador.deleta);
}