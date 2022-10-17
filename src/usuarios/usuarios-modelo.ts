const usuariosDao = require('./usuarios-dao');
import { InvalidArgumentError } from "../erros";
import * as validacoes from "../validacoes-comuns";
import bcrypt from "bcrypt";

export class UsuarioModelo {
  id: number;
  nome: string;
  email: string;
  senhaHash: string;

  constructor(usuario: any) {
    this.id = usuario.id;
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.senhaHash = usuario.senhaHash;

    this.valida();
  }

  async adiciona() {
    if (await UsuarioModelo.buscaPorEmail(this.email)) {
      throw new InvalidArgumentError('O usuário já existe!');
    }

    return usuariosDao.adiciona(this);
  }

  async adicionaSenha(senha: string) {
    validacoes.campoStringNaoNulo(senha, 'senha');
    validacoes.campoTamanhoMinimo(senha, 'senha', 8);
    validacoes.campoTamanhoMaximo(senha, 'senha', 64);
    this.senhaHash = await UsuarioModelo.gerarSenhaHash(senha);
  }

  valida() {
    validacoes.campoStringNaoNulo(this.nome, 'nome');
    validacoes.campoStringNaoNulo(this.email, 'email');
  }


  async deleta() {
    return usuariosDao.deleta(this);
  }

  static async buscaPorId(id: number) {
    const usuario: UsuarioModelo = await usuariosDao.buscaPorId(id);
    if (!usuario) {
      return null;
    }

    return new UsuarioModelo(usuario);
  }

  static async buscaPorEmail(email: string | null) {
    const usuario: UsuarioModelo = await usuariosDao.buscaPorEmail(email);
    if (!usuario) {
      return null;
    }

    return new UsuarioModelo(usuario);
  }

  static lista() {
    return usuariosDao.lista();
  }

  static gerarSenhaHash(senha: string): Promise<string> {
    const custoHash: number = 12;
    return bcrypt.hash(senha, custoHash);
  }
}


