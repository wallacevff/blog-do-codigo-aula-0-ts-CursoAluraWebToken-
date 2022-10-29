//import { redisClient as blacklist } from "./blacklist";
import { promisify } from "util";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createHash } from "crypto";

const blacklist = require("./blacklist");

const existsAsync: Function = promisify(blacklist.exists).bind(blacklist);
const setAsync: Function = promisify(blacklist.set).bind(blacklist);
function geraTokenHash(token: string): string {
    return createHash('sha256').update(token).digest('hex');
}

export class Blacklist {
    conect(): void {
        blacklist.connect();
    }

    adiciona: Function = async (token: string) => {
        //this.conect();
        const dataExpiracao: number = (jwt.decode(token) as JwtPayload).exp as number;
        const tokenHash = geraTokenHash(token);
        await setAsync(tokenHash, "");

        blacklist.expireat(tokenHash, dataExpiracao);
    };

    contemToken: Function = async (token: string) => {
        const tokenHash = geraTokenHash(token);
        existsAsync(tokenHash);
        const resultado: number = await existsAsync(tokenHash);
        return resultado === 1;
    }


}
const manipulaBlacklist: Blacklist = new Blacklist();
//manipulaBlacklist.conect();
export { manipulaBlacklist };