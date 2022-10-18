import { PostControlador as postsControlador } from "./post-controlador";
import { Express } from "express";
import passport, { session } from "passport";
import { MiddlewaresAutenticacao } from "../usuarios"
export function PostRotas(app: Express) {
    app
        .route('/post')
        .get(postsControlador.lista)
        .post(
            MiddlewaresAutenticacao.bearer,
            postsControlador.adiciona);
};
