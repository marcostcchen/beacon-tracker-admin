import { Roles } from "../utils";

export interface User {
  idUser: number,
  name: string,
  login: string,
  idRole: Roles
}