import { db } from "../../database";
import { InternalServerError } from "../erros";
import { PostModelo } from "./posts-modelo";
export function adciona(post: PostModelo): Promise<any> {
    return new Promise((resolve, reject) => {
        db.run(
            `
        INSERT INTO posts (
          titulo, 
          conteudo
        ) VALUES (?, ?)
      `,
            [post.titulo, post.conteudo],
            erro => {
                if (erro) {
                    return reject(new InternalServerError('Erro ao adicionar o post!'));
                }

                return resolve(post);
            }
        );
    });
}

export function lista() : Promise<any> {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM posts`, (erro, resultados) => {
            if (erro) {
                return reject('Erro ao listar os posts!');
            }

            return resolve(resultados);
        });
    });
}