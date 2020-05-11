<template>
  <div id="app">
    <CNavbar class="container-fluid w-100 p-4 text-center text-light" color="info">
      <h1>Vue CRUD</h1>
    </CNavbar>
    <CContainer>
      <CRow class="container-fluid mt-5">
        <CCol lg="12">
          <ul>
            <li v-for="(erro, index) of errors" :key="index">
              campo
              <b>{{erro.field}}</b>
              - {{erro.defaultMessage}}
            </li>
          </ul>
          <form @submit.prevent="salvar">
            <CCol>
              <h4 class="font-weight-bold">NOME</h4>
              <CInput type="text" placeholder="Nome" v-model="pessoa.nome" />
            </CCol>
            <CCol>
              <h4 class="font-weight-bold">EMAIL</h4>
              <CInput type="email" placeholder="nome@email.com" v-model="pessoa.email" />
            </CCol>
            <CCol>
              <h4 class="font-weight-bold">TELEFONE</h4>
              <CInput type="tel" placeholder="81 999999999" v-model="pessoa.telefone" />
            </CCol>
            <CButton
              class="btn btn-success btn-lg text-center"
              type="submit"
              title="salvar_registro"
            >
              <SaveIcon size="24" style="margin-right:4px" />Salvar
            </CButton>
            <CButton
              class="btn btn-danger btn-lg ml-3 text-center"
              type="reset"
              title="limpar_conteudo"
            >
              <RepeatIcon size="24" style="margin-right:4px" />Limpar
            </CButton>
          </form>
        </CCol>
      </CRow>
      <CRow class="bg-light mt-5">
        <CCol lg="12">
          <table class="table table-hover mt-5">
            <thead>
              <tr class="bg-dark-gray text-info">
                <th scope="col">NOME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">TELEFONE</th>
                <th scope="col">OPÇÕES</th>
              </tr>
            </thead>

            <tbody>
              <tr scope="row" v-for="pessoa of pessoas" :key="pessoa.id">
                <td>{{ pessoa.nome }}</td>
                <td>{{ pessoa.email }}</td>
                <td>{{ pessoa.telefone }}</td>
                <td>
                  <CButton @click="editar(pessoa)" title="Editar">
                    <EditIcon size="24" />
                  </CButton>
                  <CButton @click="remover(pessoa)" title="Apagar">
                    <Trash2Icon size="24" />
                  </CButton>
                </td>
              </tr>
            </tbody>
          </table>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import Pessoa from "./services/pessoa";
// Registering a single component
import { CButton, CNavbar, CContainer, CRow, CCol, CInput } from "@coreui/vue";
import { Trash2Icon, EditIcon, SaveIcon, RepeatIcon } from "vue-feather-icons";

export default {
  name: "App",
  components: {
    CButton,
    CNavbar,
    CContainer,
    CRow,
    CCol,
    CInput,
    Trash2Icon,
    EditIcon,
    SaveIcon,
    RepeatIcon
  },
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
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}
#app {
  font: 400 18px Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  margin-top: 30px;
}
</style>