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


export const enviarNotificacao: (titulo: string, descricao: string, userId: string) => Promise<ListarUltimasLocalizacoesRes | null> = (titulo, descricao, userId) => {
  return new Promise(async (resolve) => {
    const url = "https://onesignal.com/api/v1/notifications";

    const json = {
      "app_id": "b3e53c7e-4779-4ec1-b23c-d2ebd098a66b",
      "include_player_ids": [userId],
      "data": { "description": "Enviar Notificacao" },
      "headings": { "en": titulo, "pt": titulo },
      "contents": { "en": descricao, "pt": descricao }
    }

    fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': oneSignalToken,
      },
      body: JSON.stringify(json)
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