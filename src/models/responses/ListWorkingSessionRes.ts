import { UserWorkSession } from "../UserWorkSession";
import { BaseResponse } from "./BaseResponse";

export interface ListWorkingSessionRes extends BaseResponse{
  usersWorkingSessions: Array<UserWorkSession>;
}