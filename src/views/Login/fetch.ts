import { EfetuarLoginRequest, EfetuarLoginResponse } from '../../models';
import { apiUrl } from '../../utils'

export const efetuarLogin: (login: string, password: string) => Promise<EfetuarLoginResponse | null> = (login, password) => {
  return new Promise(async (resolve) => {
    const url = "/efetuar-login";

    const json: EfetuarLoginRequest = {
      login,
      password
    }

    fetch(`${apiUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json)
    })
      .then(res => res.json())
      .then((response: EfetuarLoginResponse) => {
        resolve(response);
        return;
      })
      .catch(err => {
        resolve(null);
        return;
      });
  })
}