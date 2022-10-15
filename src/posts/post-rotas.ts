import { PostControlador as postsControlador } from "./post-controlador";
import { Express } from "express";
export function PostRotas(app : Express) {
    app
        .route('/post')
        .get(postsControlador.lista)
        .post(postsControlador.adiciona);
};
