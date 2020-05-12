<template>
  <!-- Container Principal: App -->
  <div id="app">
    <!--Área de navegação simples, usada como cabeçalho: navbar-->
    <CNavbar class="container-fluid w-100 p-4 text-center text-light" color="info">
      <!--Logomarca do cabeçalho-->
      <CNavbarBrand>
        <!--Logotipo e Texto da logomarca-->
        <img src="./assets/logo.png" width="60px" />
        <h2 class="font-weight-bold font-italic text-center">Vue CRUD</h2>
      </CNavbarBrand>
    </CNavbar>
    <!--Row-Linha de ajuste do grid-->
    <CRow class="mt-4 mr-3 bg-light w-100">
      <!--Col- Coluna de ajuste do grid destinadoo ao formulário-->
      <CCol lg="4">
        <!--Área de do template do formulário-->
        <div
          class="bg-dark text-light w-75 shadow p-1 mb-5 ml-5 mt-5 bg-dark rounded"
          style="height:370px"
        >
          <!--Formulário e seus componentes-->
          <CForm class="mt-2" @submit.prevent="salvar">
            <CCol lg="12" class="mt-3 text-center">
              <h4 class="font-weight-bold mt-4">NOME</h4>
              <CInput type="text" placeholder="Nome" v-model="pessoa.nome" />
            </CCol>
            <CCol lg="12">
              <h4 class="font-weight-bold">EMAIL</h4>
              <CInput type="email" placeholder="nome@email.com" v-model="pessoa.email" />
            </CCol>
            <CCol lg="12">
              <h4 class="font-weight-bold">TELEFONE</h4>
              <the-mask
                class="shadow bg-light rounded"
                mask="(##) #####-####"
                placeholder="(xx) xxxxx-xxxx"
                v-model="pessoa.telefone"
                style="width:392px;height:35px;font-size:14px;"
              />
            </CCol>
            <CButton
              class="btn btn-success btn-lg text-center mt-4"
              type="submit"
              title="salvar_registro"
            >
              <SaveIcon size="24" style="margin-right:4px" />Salvar
            </CButton>
            <CButton
              class="btn btn-danger btn-lg ml-3 text-center mt-4"
              type="reset"
              title="limpar_conteudo"
            >
              <RepeatIcon size="24" style="margin-right:4px" />Limpar
            </CButton>
          </CForm>
        </div>
        <!--Col- Coluna de ajuste do grid destinadoo a tabela-->
      </CCol>
      <CCol lg="8" class="bg-secondary mt-3">
        <!--Cabeçalho da tabela com os títulos das colunas-->
        <table class="table table-hover mt-3">
          <thead>
            <tr class="bg-dark text-light">
              <th scope="col">NOME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">TELEFONE</th>
              <th scope="col">OPÇÕES</th>
            </tr>
          </thead>
          <!--Linhas de conteúdo da tabela-->
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
  </div>
</template>

<script>
// Importando a classe Pessoa, responsável pelas requisições HTTP(GET,PUT,DELETE,POST).
import Pessoa from "./services/pessoa";
// Importando os componentes do pacote @coreui/vue.
import {
  CButton,
  CNavbar,
  CRow,
  CCol,
  CInput,
  CForm,
  CNavbarBrand
} from "@coreui/vue";
// Importando os componentes do pacote vue-feather-icons.
import { Trash2Icon, EditIcon, SaveIcon, RepeatIcon } from "vue-feather-icons";
// Importando os componentes do pacote vue-the-mask, responsável pelo tratamento do campo Telefone.
import { TheMask } from "vue-the-mask";
// Exportação dos componentes para disponibilizá´los para uso.
export default {
  components: {
    CButton,
    CForm,
    CNavbar,
    CRow,
    CCol,
    CInput,
    Trash2Icon,
    EditIcon,
    SaveIcon,
    RepeatIcon,
    CNavbarBrand,
    TheMask
  },
  //Função Data, responsável pelo controle de dados da aplicação.
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
  // Função Mounted() para iniciar manualmente a compilação.
  mounted() {
    this.listar();
  },
  // A área de methods é onde são declarados todos os métodos da aplicação.
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
/* Folha de estilização da página */
/* Importando a fonte Roboto do Google */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");
/*Padronização inicial do html. */
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}
/*Estilização do elemento app */
#app {
  font: 400 18px Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}
</style>