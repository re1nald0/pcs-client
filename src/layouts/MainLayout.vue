<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-tabs v-model="tab1"
                align="justify"
                mobile-arrows
                outside-arrows
                inline-label>
          Doar Faz Bem
          <div v-if="this.$q.cookies.get('token') !== null && this.$q.cookies.get('token') !== undefined">
            <q-route-tab to="/" name="principal" icon="home" label="Principal" />
          </div>
        </q-tabs>
        <q-space />
        <q-btn @click="openConfigurarUrlModal()" class="q-ma-xs" color="black" label="Configurar Endereço" />
        <div v-if="this.$q.cookies.get('token') !== null && this.$q.cookies.get('token') !== undefined">
          <q-btn @click="logout()" class="q-ma-xs" color="black" label="Logout" />
        </div>
        <div v-else>
          <q-btn @click="openCadastrarUsuarioModal()" class="q-ma-xs" color="black" label="Registrar Usuário" />
          <q-btn @click="openLoginModal()" class="q-ma-xs" color="black" label="Login" />
        </div>
      </q-toolbar>
    </q-header>

    <q-dialog v-model="showConfigurarUrlModal" persistent>
      <q-card style="width: 100%;">
        <q-card-section>
          <div class="text-h6">Configurar URL</div>
        </q-card-section>

        <q-card-section>
            <div class="row items-start q-gutter-xs">
              <q-input
                    class="col-xs-12 col-sm-12 col-md-12"
                    v-model="url"
                    label="URL"
                    color="black"
                    outlined
              />
              <div class="text-subtitle1">Ex.: http://127.0.0.1:8000</div>
            </div>
        </q-card-section>

        <q-card-actions align="right">
          <div style="q-gutter-xs">
            <q-btn flat @click="usarUrlPadrao()" class="q-ma-xs" color="black" label="Usar Padrão" />
            <q-btn flat label="Cancelar" color="black" v-close-popup />
            <q-btn @click="salvarUrl()" label="Salvar" color="green"/>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showCadastrarUsuarioModal" @hide="clearUsuarioData()" persistent>
      <q-card style="width: 100%;">
        <q-card-section>
          <div class="text-h6">Cadastrar Usuário</div>
        </q-card-section>

        <q-card-section>
            <div class="row items-start q-gutter-xs">
              <q-input
                  class="col-xs-12 col-sm-12 col-md-8"
                  v-model="usuario.nome"
                  label="Nome"
                  color="black"
                  outlined
                  :rules="[val => !!val || 'campo obrigatorio']"
              />
              <q-input
                    class="col-xs-12 col-sm-12 col-md-3"
                    v-model="usuario.cpf"
                    label="CPF"
                    color="black"
                    outlined
                    :rules="[val => !!val || 'campo obrigatorio']"
              />
              <q-input
                    class="col-xs-12 col-sm-12 col-md-8"
                    v-model="usuario.endereco"
                    label="Endereço"
                    color="black"
                    outlined
                    :rules="[val => !!val || 'campo obrigatorio']"
              />
              <q-input
                    class="col-xs-12 col-sm-12 col-md-3"
                    v-model="usuario.telefone"
                    label="Telefone"
                    color="black"
                    outlined
                    :rules="[val => !!val || 'campo obrigatorio']"
              />
              <q-input
                    class="col-xs-12 col-sm-12 col-md-7"
                    v-model="usuario.email"
                    label="Email"
                    color="black"
                    outlined
                    :rules="[val => !!val || 'campo obrigatorio']"
              />
              <q-input
                    type="password"
                    class="col-xs-12 col-sm-12 col-md-4"
                    v-model="usuario.senha"
                    label="Senha"
                    color="black"
                    outlined
                    :rules="[val => !!val || 'campo obrigatorio']"
              />
              <q-select v-model.number="usuario.tipo"
                        :options="tiposUsuario"
                        :option-label="(props) => props.nome"
                        :rules="[val => !!val || 'campo obrigatorio']"
                        class="col-xs-12 col-sm-12 col-md-11"
                        label="Tipo de Usuário"
                        color="black"
                        outlined 
                        />
              <q-select v-model="usuario.tipo_doacao"
                        :options="tiposDoacao"
                        :option-label="(props) => props.nome"
                        :rules="[val => !!val || 'campo obrigatorio']"
                        class="col-xs-12 col-sm-12 col-md-11"
                        label="Doação"
                        color="black"
                        multiple
                        outlined
                        use-chips
                        />
              <div class="text-subtitle1">* Todos os campos são obrigatórios</div>
            </div>
        </q-card-section>

        <q-card-actions align="right">
          <div style="q-gutter-xs">
            <q-btn flat label="Cancelar" color="black" v-close-popup />
            <q-btn @click="cadastrarusuario()" label="Salvar" color="green"/>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showLoginModal" @hide="clearUsuarioData()" persistent>
      <q-card style="width: 100%;">
        <q-card-section>
          <div class="text-h6">Login</div>
        </q-card-section>

        <q-card-section>
            <div class="row items-start q-gutter-xs">
              <q-input
                    class="col-xs-12 col-sm-12 col-md-12"
                    v-model="usuario.cpf"
                    label="CPF"
                    color="black"
                    outlined
                    :rules="[val => !!val || 'campo obrigatorio']"
              />
              <q-input
                    type="password"
                    class="col-xs-12 col-sm-12 col-md-12"
                    v-model="usuario.senha"
                    label="Senha"
                    color="black"
                    outlined
                    :rules="[val => !!val || 'campo obrigatorio']"
              />
            </div>
        </q-card-section>

        <q-card-actions align="right">
          <div style="q-gutter-xs">
            <q-btn flat label="Cancelar" color="black" v-close-popup />
            <q-btn @click="login()" label="Entrar" color="green"/>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      showConfigurarUrlModal: false,
      showCadastrarUsuarioModal: false,
      showLoginModal: false,
      url: '',
      usuario: {
        nome: '',
        cpf: '',
        senha: '',
        email: '',
        telefone: '',
        endereco: '',
        tipo: -1,
        tipo_doacao: []
      },
      tiposUsuario: [
        {value: 0, nome: 'Doador'},
        {value: 1, nome: 'Receptor'}
      ],
      tiposDoacao: [
        {value: 'CESTA', nome: 'Cesta'},
        {value: 'REMEDIO', nome: 'Remédio'},
        {value: 'ROUPA', nome: 'Roupa'}
      ]
    }
  },
  methods: {
    openConfigurarUrlModal() {
      this.showConfigurarUrlModal = true
    },
    openCadastrarUsuarioModal() {
      this.showCadastrarUsuarioModal = true
    },
    openLoginModal() {
      this.showLoginModal = true
    },
    usarUrlPadrao() {
      this.$q.localStorage.remove('url')
      this.url = ''

      this.$router.go()
    },
    salvarUrl() {
      if(this.url !== '') {
        this.$q.localStorage.set('url', this.url)
      }

      this.showConfigurarUrlModal = false
      this.$router.go()
    },
    resolveTipoDoacao() {
      console.log('usuario tipo doacao')
      console.log(this.usuario.tipo_doacao)

      let doacoesStringfied = ''
      let counter = 0
      this.usuario.tipo_doacao.forEach(doacao => {
        if(counter === 0) {
          doacoesStringfied = doacoesStringfied + doacao.value
          counter++
        } else {
          doacoesStringfied = doacoesStringfied + ', ' + doacao.value
          counter++
        }
      })

      return doacoesStringfied
    },
    async cadastrarusuario() {
      if(!this.validadeUsuarioData()) {
        this.$q.notify({
          position: 'top',
          message: 'Verifique se deixou dados faltando',
          color: 'red'
        })
      } else {
        console.log(this.usuario)

        await this.$axios({
          method: 'post',
          url: '/usuarios',
          data: {
            nome: this.usuario.nome,
            cpf: this.usuario.cpf,
            senha: this.usuario.senha,
            email: this.usuario.email,
            telefone: this.usuario.telefone,
            endereco: this.usuario.endereco,
            tipo: this.usuario.tipo.value,
            tipo_doacao: this.resolveTipoDoacao()
          }
        }).then(response => {
            console.log('---CREATE USER RESPONSE--')
            console.log(response.data)

            this.showCadastrarUsuarioModal = false

            this.$q.notify({
              position: 'top',
              message: 'Usuário cadastrado com sucesso!',
              color: 'green'
            })
          }).catch(error => {
            console.log(error)

            this.showCadastrarUsuarioModal = false
            this.$q.notify({
              position: 'top',
              message: 'Ocorreu algum erro! Tente novamente',
              color: 'red'
            })
          })
      }
    },
    async login() { 
      if(!this.validadeLoginData()) {
        this.$q.notify({
          position: 'top',
          message: 'Verifique se deixou dados faltando',
          color: 'red'
          })
      } else {
        await this.$axios({
          method: 'post',
          url: '/login',
          data: {
            cpf: this.usuario.cpf,
            senha: this.usuario.senha
          }
        }).then(response => {
            console.log('---RESPONSE LOGIN--')
            console.log(response.data)

            this.$q.localStorage.set('usuario', response.data.usuario)
            this.$q.cookies.set('token', response.data.token)
            this.showLoginModal = false

            this.$router.go()
          }).catch(error => {
            console.log(error)

            this.showLoginModal = false
            this.$q.notify({
              position: 'top',
              message: 'Ocorreu algum erro! Tente novamente',
              color: 'red'
            })
          })
      }
    },
    async logout() {
      await this.$axios({
          method: 'post',
          url: '/logout',
          headers: {
            token: this.$q.cookies.get('token')
          }
        }).then(response => {
            console.log('---RESPONSE LOGOUT--')
            console.log(response.data)

            this.$q.localStorage.remove('usuario')
            this.$q.cookies.remove('token')

            this.$router.go()
          }).catch(error => {
            console.log(error)

            this.$q.notify({
              position: 'top',
              message: 'Ocorreu algum erro! Tente novamente',
              color: 'red'
            })
          })
    },
    validadeUsuarioData() {
      return (
        this.usuario.nome !== '' &&
        this.usuario.cpf !== '' &&
        this.usuario.senha !== '' &&
        this.usuario.email !== '' &&
        this.usuario.telefone !== '' &&
        this.usuario.endereco !== '' &&
        this.usuario.tipo !== -1 &&
        this.usuario.tipo_doacao.length > 0
      )
    },
    validadeLoginData() {
      return (
        this.usuario.cpf !== '' &&
        this.usuario.senha !== ''
      )
    },
    clearUsuarioData() {
      this.usuario.nome = ''
      this.usuario.cpf = ''
      this.usuario.senha = ''
      this.usuario.email = ''
      this.usuario.telefone = ''
      this.usuario.endereco = ''
      this.usuario.tipo = -1
      this.usuario.tipo_doacao = []
    },
    clearUrlData() {
      this.url = ''
    }
  },
  mounted: function() {
    console.log('aqui')
    console.log(this.$q.localStorage.getItem('url'))
    if(this.$q.localStorage.getItem('url') !== null && this.$q.localStorage.getItem('url') !== undefined) {
      this.url = this.$q.localStorage.getItem('url')
    }
  }
}
</script>
