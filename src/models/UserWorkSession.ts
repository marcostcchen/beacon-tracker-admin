import { WorkSession } from "./WorkSession";

export interface UserWorkSession {
  name: string
  listWorkSessions: Array<WorkSession>
}