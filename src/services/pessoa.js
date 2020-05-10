
import { api } from './config'

export default {

    salvar: (pessoa) => {
        return api.post('pessoa', pessoa);
    },

    atualizar: (pessoa) => {
        return api.put(`pessoa/${pessoa.id}`, pessoa);
    },

    listar: () => {
        return api.get('pessoa')
    },

    apagar: (pessoa) => {
        return api.delete(`pessoa/${pessoa.id}`, { data: pessoa })
    }
}