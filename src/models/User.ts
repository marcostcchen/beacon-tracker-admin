import { Roles } from "../utils";

export interface User {
  id: number,
  name: string,
  password:string,
  login: string,
  idRole: Roles
}