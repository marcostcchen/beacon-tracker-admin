import { LastLocation } from "./LastLocation";

export interface UserLastLocation {
  id: string,
  name: string,
  lastLocation: LastLocation,
  isWorking: boolean,
  maxStayMinutes: number,
  startWorkingTime: string
}

