export class InvalidArgumentError extends Error {
    constructor(mensagem : string) {
      super(mensagem);
      this.name = 'InvalidArgumentError';
    }
  }
  
 export class InternalServerError extends Error {
    constructor(mensagem : string) {
      super(mensagem);
      this.name = 'InternalServerError';
    }
  }
  