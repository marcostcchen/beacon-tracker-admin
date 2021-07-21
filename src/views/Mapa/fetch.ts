import { UserLastLocation } from "../../models";
import { apiUrl, Status, tokenKey } from "../../utils";
var ls = require('local-storage');

interface ListarUltimasLocalizacoesRes {
  status: Status,
  message: string,
  listUsuarios: Array<UserLastLocation>
}

export const listarUltimasLocalizacoes: () => Promise<ListarUltimasLocalizacoesRes | null> = () => {
  return new Promise(async (resolve) => {
    const url = "/listar-ultimas-localizacoes";
    const token = ls.get(tokenKey);

    fetch(`${apiUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token == null ? '' : token,
      },
      
    })
      .then(res => res.json())
      .then((response: ListarUltimasLocalizacoesRes) => {
        resolve(response);
        return;
      })
      .catch(err => {
        resolve(null);
        return;
      });
  })
}