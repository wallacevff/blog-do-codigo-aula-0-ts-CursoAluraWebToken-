//import posts from "./src/posts";
import *  as usuarios from "./src/usuarios";
import { Express, Request, Response } from "express";


 class Roteador {
    static rotear(app: Express) : void{
        app.get('/', (req: Request, res : Response) => { res.send("Eae!") });
        // posts.rotas(app);
         usuarios.UsuarioRotas.UsuarioRotas(app); 
    }
}


export { Roteador };
