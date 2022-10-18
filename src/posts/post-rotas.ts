import { PostControlador as postsControlador } from "./post-controlador";
import { Express } from "express";
import passport, { session } from "passport";

export function PostRotas(app: Express) {
    app
        .route('/post')
        .get(postsControlador.lista)
        .post(
            passport.authenticate('bearer', { session: false }),
            postsControlador.adiciona);
};
