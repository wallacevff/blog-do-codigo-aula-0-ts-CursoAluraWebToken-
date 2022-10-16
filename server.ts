import { app } from "./app";
import { Request, Response } from "express";
import { Roteador } from "./rotas";
import dotenv from "dotenv";
import morgan from "morgan";
import moment from "moment-timezone";

morgan.token('date', (req: Request, res : Response) => {
    return moment().tz('America/Fortaleza').format("DD/mm/yyyy HH:MM:SS");
});

dotenv.config({ path: "./.env" });
app.use(morgan("combined"));
Roteador.rotear(app);
app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}`));
