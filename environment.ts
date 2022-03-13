import { Constants } from "./constants";

export class Environment {
    static tableSASUrl = process.env[Constants.tableSASUrl];
}