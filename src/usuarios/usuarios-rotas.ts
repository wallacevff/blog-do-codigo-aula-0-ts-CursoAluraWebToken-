import { UsuarioControlador } from "./usuarios-controlador";
import { Express } from "express";
export function UsuarioRotas(app : Express) {
    app.route("/usuario")
       .post(UsuarioControlador.adiciona)
       .get(UsuarioControlador.lista);
    app.route("/usuario/:id").delete(UsuarioControlador.deleta)
}