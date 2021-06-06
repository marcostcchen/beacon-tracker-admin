import { Roles } from "../utils";

export interface User {
  idUser: number,
  name: string,
  password:string,
  login: string,
  idRole: Roles
}