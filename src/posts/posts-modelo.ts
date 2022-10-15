import * as postDao from "./posts-dao";
import * as validacoes from "../validacoes-comuns";
export class PostModelo {
    titulo: string;
    conteudo: string;

    constructor(post: any) {
        this.titulo = post.titulo;
        this.conteudo = post.conteudo;
        this.valida();
    }
    adiciona() {
        return postDao.adciona(this)
    }
    valida() {
        validacoes.campoStringNaoNulo(this.titulo, 'título');
        validacoes.campoTamanhoMinimo(this.titulo, 'título', 5);
        validacoes.campoStringNaoNulo(this.conteudo, 'conteúdo');
        validacoes.campoTamanhoMaximo(this.conteudo, 'conteúdo', 140)
    }

    static lista() {
        return postDao.lista();
    }
}