import { ListWorkingSessionRes } from "../../models";
import { apiUrl, tokenKey } from "../../utils";
var ls = require('local-storage');

export const listWorkingSessions: () => Promise<ListWorkingSessionRes | null> = () => {
  return new Promise(async (resolve) => {
    const url = "/list-working-sessions";
    const token = ls.get(tokenKey);

    fetch(`${apiUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token == null ? '' : token,
      },
    })
      .then(res => res.json())
      .then((response: ListWorkingSessionRes) => {
        resolve(response);
        return;
      })
      .catch(err => {
        resolve(null);
        return;
      });
  })
}