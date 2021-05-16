import { Status } from "../../utils";
import { User } from "../User";

export interface EfetuarLoginResponse {
  status: Status, 
  message: string,
  token: string,
  user: User
}