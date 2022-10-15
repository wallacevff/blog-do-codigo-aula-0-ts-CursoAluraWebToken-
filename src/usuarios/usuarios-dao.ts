import { db } from "../../database";
import { InternalServerError } from "../erros";
import { UsuarioModelo } from "./usuarios-modelo";

export function adiciona(usuario: UsuarioModelo) {
  return new Promise((resolve, reject) => {
    db.run(
      `
          INSERT INTO usuarios (
            nome,
            email,
            senha
          ) VALUES (?, ?, ?)
        `,
      [usuario.nome, usuario.email, usuario.senha],
      erro => {
        if (erro) {
          reject(new InternalServerError('Erro ao adicionar o usuário!'));
        }

        return resolve(usuario);
      }
    );
  });
}

export function buscaPorId(id: number) {
  return new Promise((resolve, reject) => {
    db.get(
      `   SELECT *
          FROM usuarios
          WHERE id = ?
        `,
      [id],
      (erro, usuario) => {
        if (erro) {
          return reject('Não foi possível encontrar o usuário!');
        }

        return resolve(usuario);
      }
    );
  });
}

export function buscaPorEmail(email: string) {
  return new Promise((resolve, reject) => {
    db.get(
      `
          SELECT *
          FROM usuarios
          WHERE email = ?
        `,
      [email],
      (erro, usuario) => {
        if (erro) {
          return reject('Não foi possível encontrar o usuário!');
        }

        return resolve(usuario);
      }
    );
  });
}

export function lista() {
  return new Promise((resolve, reject) => {
    db.all(
      `
          SELECT * FROM usuarios
        `,
      (erro, usuarios) => {
        if (erro) {
          return reject('Erro ao listar usuários');
        }
        return resolve(usuarios);
      }
    );
  });
}

export function deleta(usuario : UsuarioModelo){
  return new Promise((resolve, reject) => {
    db.run(
      `
          DELETE FROM usuarios
          WHERE id = ?
        `,
      [usuario.id],
      erro => {
        if (erro) {
          return reject('Erro ao deletar o usuário');
        }
        return resolve(usuario);
      }
    );
  });
}
