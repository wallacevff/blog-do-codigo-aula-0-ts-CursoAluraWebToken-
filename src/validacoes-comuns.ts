import {InvalidArgumentError} from "./erros";
export function campoStringNaoNulo(valor: any, nome: string) {
    if (typeof valor !== 'string' || ((valor as unknown ) as number) === 0)
      throw new InvalidArgumentError(`É necessário preencher o campo ${nome}!`);
}

export function campoTamanhoMinimo(valor: any, nome : string, minimo : number){
    if (valor.length < minimo)
      throw new InvalidArgumentError(
        `O campo ${nome} precisa ser maior que ${((minimo as unknown) as string)} caracteres!`
      );
}

export function campoTamanhoMaximo(valor: any, nome : string, maximo : number){
    if (valor.length > maximo)
      throw new InvalidArgumentError(
        `O campo ${nome} precisa ser menor que ${((maximo as unknown) as string)} caracteres!`
      );
}