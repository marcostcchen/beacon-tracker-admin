import { WorkingStatus } from "../utils";

export interface WorkSession {
  startTime: Date,
  status: WorkingStatus,
  beaconsRssi: {
    RSSIBeaconId1?: number,
    RSSIBeaconId2?: number,
    RSSIBeaconId3?: number,
  }
  regionName: string,
  measureTime: Date
}