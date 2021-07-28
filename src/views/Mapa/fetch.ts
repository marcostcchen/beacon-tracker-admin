import { UserLastLocation } from "../../models";
import { apiUrl, oneSignalToken, Status, tokenKey } from "../../utils";
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


export const listarNotificacoes: () => Promise<any | null> = () => {
  return new Promise(async (resolve) => {
    const url = "/listar-notificacoes";
    const token = ls.get(tokenKey);

    fetch(`${apiUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token == null ? '' : token,
      },

    })
      .then(res => res.json())
      .then((response: any) => {
        resolve(response);
        return;
      })
      .catch(err => {
        resolve(null);
        return;
      });
  })
}

export const enviarNotificacao: (titulo: string, descricao: string, userId: string, nome: string) => Promise<any | null> = (titulo, descricao, userId, nome) => {
  return new Promise(async (resolve) => {
    const url = "/enviar-notificacao";
    const token = ls.get(tokenKey);

    const json = {
      "userId_OneSignal": userId,
      "nome": nome,
      "horaEnvio": new Date(),
      "titulo": titulo,
      "descricao": descricao
    }

    fetch(`${apiUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token == null ? '' : token,
      },
      body: JSON.stringify(json)
    })
      .then(res => res.json())
      .then((response: any) => {
        resolve(response);
        return;
      })
      .catch(err => {
        resolve(null);
        return;
      });
  })
}