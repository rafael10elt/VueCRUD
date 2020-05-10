<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Vue CRUD</a>
      </div>
    </nav>

    <div class="container">
      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo
          <b>{{erro.field}}</b>
          - {{erro.defaultMessage}}
        </li>
      </ul>

      <form @submit.prevent="salvar">
        <label>Nome</label>
        <input type="text" placeholder="Nome" v-model="pessoa.nome" />
        <label>Email</label>
        <input type="email" placeholder="nome@email.com" v-model="pessoa.email" />
        <label>Telefone</label>
        <input type="tel" placeholder="81 999999999" v-model="pessoa.telefone" />

        <button class="waves-effect waves-light btn-small">
          Salvar
          <i class="material-icons left">save</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>EMAIL</th>
            <th>TELEFONE</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="pessoa of pessoas" :key="pessoa.id">
            <td>{{ pessoa.nome }}</td>
            <td>{{ pessoa.email }}</td>
            <td>{{ pessoa.telefone }}</td>
            <td>
              <button @click="editar(pessoa)" class="waves-effect btn-small blue darken-1">
                <i class="material-icons">create</i>
              </button>
              <button @click="remover(pessoa)" class="waves-effect btn-small red darken-1">
                <i class="material-icons">delete_sweep</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Pessoa from "./services/pessoa";

export default {
  data() {
    return {
      pessoa: {
        id: "",
        nome: "",
        email: "",
        telefone: ""
      },
      pessoas: [],
      errors: []
    };
  },

  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      Pessoa.listar().then(resposta => {
        this.pessoas = resposta.data;
      });
    },
    salvar() {
      if (!this.pessoa.id) {
        Pessoa.salvar(this.pessoa)
          .then(resposta => {
            this.pessoa = {};
            alert("Salvo com sucesso!");
            console.log(resposta.data);
            this.listar();
            this.errors = [];
          })
          .catch(e => {
            this.errors = e.response.data.errors;
          });
      } else {
        Pessoa.atualizar(this.pessoa)
          .then(resposta => {
            this.pessoa = {};
            alert("Atualizado com sucesso!");
            console.log(resposta.data);
            this.listar();
            this.errors = [];
          })
          .catch(e => {
            this.errors = e.response.data.errors;
          });
      }
    },
    editar(pessoa) {
      this.pessoa = pessoa;
    },
    remover(id) {
      if (confirm("Deseja exluir o registro?")) {
        Pessoa.apagar(id)
          .then(resposta => {
            console.log(resposta.data);
            this.listar();
            this.errors = [];
          })
          .catch(e => {
            this.errors = e.response.data.errors;
          });
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>