import { PostControlador as postsControlador } from "./post-controlador";
import { Express } from "express";
import { MiddlewaresAutenticacao } from "../usuarios"
export function PostRotas(app: Express) {
    app
        .route('/post')
        .get(MiddlewaresAutenticacao.bearer, postsControlador.lista)
        .post(
            MiddlewaresAutenticacao.bearer,
            postsControlador.adiciona);
};
