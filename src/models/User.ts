import { WorkSession } from ".";
import { Roles } from "../utils";

export interface User {
  id: string,
  name: string,
  password?:string,
  login?: string,
  idRole?: Roles,
  workSessions?: Array<WorkSession>,
  userId_OneSignal: string, 
}