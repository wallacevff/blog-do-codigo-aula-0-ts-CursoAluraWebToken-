const usuariosDao = require('./usuarios-dao');
import { InvalidArgumentError } from "../erros";
import * as validacoes from "../validacoes-comuns";

export class UsuarioModelo {
    id : number;
    nome : string;
    email : string;
    senha : string;

  constructor(usuario : any) {
    this.id = usuario.id;
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.senha = usuario.senha;

    this.valida();
  }

  async adiciona() {
    if (await UsuarioModelo.buscaPorEmail(this.email)) {
      throw new InvalidArgumentError('O usuário já existe!');
    }

    return usuariosDao.adiciona(this);
  }

  valida() {
    validacoes.campoStringNaoNulo(this.nome, 'nome');
    validacoes.campoStringNaoNulo(this.email, 'email');
    validacoes.campoStringNaoNulo(this.senha, 'senha');
    validacoes.campoTamanhoMinimo(this.senha, 'senha', 8);
    validacoes.campoTamanhoMaximo(this.senha, 'senha', 64);
  }

  
  async deleta() {
    return usuariosDao.deleta(this);
  }
  
  static async buscaPorId(id : number) {
    const usuario : UsuarioModelo = await usuariosDao.buscaPorId(id);
    if (!usuario) {
      return null;
    }
    
    return new UsuarioModelo(usuario);
  }
  
  static async buscaPorEmail(email : string) {
    const usuario : UsuarioModelo = await usuariosDao.buscaPorEmail(email);
    if (!usuario) {
      return null;
    }
    
    return new UsuarioModelo(usuario);
  }

  static lista() {
    return usuariosDao.lista();
  }
}


