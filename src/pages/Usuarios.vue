<template>
  <q-page>
    <q-table
    title="Usuários"
    :data="usuarios"
    :columns="usuariosTableColumns"
    row-key="name"
    class="full-width"
    >
    <template v-slot:top>
        <q-btn color="green"
            icon="add"
            label="Cadastrar Usuário"
            class="col-xs-12 col-sm-12 col-md-2"
            @click="showCadastrarUsuarioModal = true"
            />
    </template>

    <template v-slot:body-cell-editar="props">
        <q-td :props="props">
            <q-btn dense round flat color="primary" @click.stop="openEditarUsuarioModal(props)" icon="edit"></q-btn>
        </q-td>
    </template>

    <template v-slot:body-cell-remover="props">
        <q-td :props="props">
            <q-btn dense round flat color="red" @click.stop="removerUsuario(props)" icon="delete"></q-btn>
        </q-td>
    </template>
    </q-table>

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
              <!-- <q-select v-model="usuario.tipo_doacao"
                        :options="tiposDoacao"
                        :option-label="(props) => props.nome"
                        :rules="[val => !!val || 'campo obrigatorio']"
                        class="col-xs-12 col-sm-12 col-md-11"
                        label="Doação"
                        color="black"
                        multiple
                        outlined
                        use-chips
                        /> -->
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

    <q-dialog v-model="showEditarUsuarioModal" @hide="clearUsuarioData()" persistent>
      <q-card style="width: 100%;">
        <q-card-section>
          <div class="text-h6">Editar Usuário</div>
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
              <div class="text-subtitle1">* Todos os campos são obrigatórios</div>
            </div>
        </q-card-section>

        <q-card-actions align="right">
          <div style="q-gutter-xs">
            <q-btn flat label="Cancelar" color="black" v-close-popup />
            <q-btn @click="editarUsuario()" label="Salvar" color="green"/>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      showCadastrarUsuarioModal: false,
      showEditarUsuarioModal: false,
      usuarios: [],
      usuarioLoggado: {
        nome: '',
        cpf: '',
        senha: '',
        email: '',
        telefone: '',
        endereco: '',
        tipo: -1,
      },
      usuario: {
        nome: '',
        cpf: '',
        senha: '',
        email: '',
        telefone: '',
        endereco: '',
        tipo: -1,
      },
      tiposUsuario: [
        {value: 0, nome: 'Doador'},
        {value: 1, nome: 'Receptor'},
        {value: 2, nome: 'Administrador'}
      ],
      tiposDoacao: [
        {value: 'CESTA', nome: 'Cesta'},
        {value: 'REMEDIO', nome: 'Remédio'},
        {value: 'ROUPA', nome: 'Roupa'}
      ],
      usuariosTableColumns: [
        {
          name: 'nome',
          required: true,
          label: 'Nome',
          align: 'left',
          field: row => row.nome,
          format: val => `${val}`
        },
        { name: 'cpf', align: 'center', label: 'CPF', field: row => row.cpf },
        { name: 'email', align: 'center', label: 'Email', field: row => row.email },
        { name: 'telefone', align: 'center', label: 'Telefone', field: row => row.telefone },
        { name: 'endereco', align: 'center', label: 'Endereço', field: row => row.endereco },
        {
            name: 'tipo',
            align: 'center',
            label: 'Tipo',
            field: row => row.tipo === 0 ? 'Doador' : row.tipo === 1 ? 'Receptor' : 'Administrador'
        },
        { name: 'editar', align: 'center', label: 'Editar Usuário', field: 'editar' },
        { name: 'remover', align: 'center', label: 'Remover Usuário', field: 'remover' }
      ]
    }
  },
  methods: {
    openCadastrarUsuarioModal() {
      this.showCadastrarUsuarioModal = true
    },
    openEditarUsuarioModal(props) {
      const index = this.usuarios.map(function (o) { return o.id }).indexOf(props.row.id)
      const tipo_usuario_index = this.tiposUsuario.map(function (o) { return o.value }).indexOf(props.row.tipo)

      console.log('hehe')
      this.usuario.id = this.usuarios[index].id
      this.usuario.nome = this.usuarios[index].nome
      this.usuario.cpf = this.usuarios[index].cpf
      // this.usuario.senha = this.usuarios[index].senha
      this.usuario.senha = ''
      this.usuario.email = this.usuarios[index].email
      this.usuario.telefone = this.usuarios[index].telefone
      this.usuario.endereco = this.usuarios[index].endereco
      this.usuario.tipo = this.tiposUsuario[tipo_usuario_index]

      this.showEditarUsuarioModal = true
    },
    async getUsuarios() {
      await this.$axios({
          method: 'get',
          url: '/usuarios',
          headers: {
            token: this.$q.cookies.get('token')
          }
        }).then(response => {
            console.log('---GET USERS RESPONSE--')
            console.log(response.data)
            
            this.usuarios = response.data
          }).catch(error => {
            console.log(error)

            this.$q.notify({
              position: 'top',
              message: 'Ocorreu algum erro!',
              color: 'red'
            })
          })
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
            tipo: this.usuario.tipo.value
            // tipo_doacao: this.resolveTipoDoacao()
          }
        }).then(response => {
            console.log('---CREATE USER RESPONSE--')
            console.log(response.data.usuario)

            this.showCadastrarUsuarioModal = false

            this.$q.notify({
              position: 'top',
              message: 'Usuário cadastrado com sucesso!',
              color: 'green'
            })

            this.usuarios.push(response.data.usuario)
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
    async editarUsuario() {
      if(!this.validadeUpdateUsuarioData()) {
          this.$q.notify({
            position: 'top',
            message: 'Verifique se deixou dados faltando',
            color: 'red'
          })
      } else {
        const user = this.$q.localStorage.getItem('usuario')
        const index = this.usuarios.map(function (o) { return o.id }).indexOf(this.usuario.id)
        let senha = this.usuario.senha === '' ? null : this.usuario.senha
        await this.$axios({
          method: 'put',
          url: '/usuarios',
          headers: {
            token: this.$q.cookies.get('token')
          },
          data: {
            id: this.usuario.id,
            nome: this.usuario.nome,
            cpf: this.usuario.cpf,
            email: this.usuario.email,
            senha: senha,
            telefone: this.usuario.telefone,
            endereco: this.usuario.endereco,
            tipo: this.usuario.tipo.value,
          }
        }).then(response => {
            console.log('---UPDATE USUARIO RESPONSE--')
            console.log(response.data)

            this.showEditarUsuarioModal = false
            this.$q.notify({
              position: 'top',
              message: 'Usuário atualizado com sucesso!',
              color: 'green'
            })

            this.usuarios[index].id = response.data.id
            this.usuarios[index].nome = response.data.nome
            this.usuarios[index].cpf = response.data.cpf
            this.usuarios[index].email = response.data.email
            this.usuarios[index].telefone = response.data.telefone
            this.usuarios[index].endereco = response.data.endereco
            this.usuarios[index].tipo = response.data.tipo
          }).catch(error => {
            console.log(error)

            this.showEditarUsuarioModal = false
            this.$q.notify({
              position: 'top',
              message: 'Ocorreu algum erro! Tente novamente',
              color: 'red'
            })
          })
      }
    },
    removerUsuario: async function (props) {
      const index = this.usuarios.map(function (o) { return o.id }).indexOf(props.row.id)
      const id = props.row.id

      this.$q.dialog({
        title: 'Confirmar',
        color: 'red',
        message: 'Realmente deseja remover este usuário?',
        cancel: true,
        persistent: true
      }).onOk(async (props) => {
        await this.$axios({
          method: 'delete',
          url: '/usuarios/' + id,
          headers: {
            token: this.$q.cookies.get('token')
          },
        })
          .then(response => {
            console.log(response)

            this.usuarios.splice(index, 1)
            this.$q.notify({
              position: 'top',
              message: 'Usuário removido!',
              color: 'green'
            })
          })
          .catch(error => {
            console.log(error)

            this.$q.notify({
              position: 'top',
              message: 'Erro ao remover usuário!',
              color: 'red'
            })
          })
      }).onCancel(() => {})
        .onDismiss(() => {})
    },
    resolveTipoDoacao() {
      console.log('usuario tipo doacao')
      console.log(this.usuario.tipo_doacao)

      let doacoesStringfied = ''
      let counter = 0
      this.doacaoData.tipo_doacao.forEach(doacao => {
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
    validadeUsuarioData() {
      return (
        this.usuario.nome !== '' &&
        this.usuario.cpf !== '' &&
        this.usuario.senha !== '' &&
        this.usuario.email !== '' &&
        this.usuario.telefone !== '' &&
        this.usuario.endereco !== '' &&
        this.usuario.tipo !== -1
        // this.usuario.tipo_doacao.length > 0
      )
    },
    validadeUpdateUsuarioData() {
      return (
        this.usuario.nome !== '' &&
        this.usuario.cpf !== '' &&
        // this.usuario.senha !== '' &&
        this.usuario.email !== '' &&
        this.usuario.telefone !== '' &&
        this.usuario.endereco !== '' &&
        this.usuario.tipo !== -1
        // this.usuario.tipo_doacao.length > 0
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
      // this.usuario.tipo_doacao = []
    },
  },
  mounted: async function() {
      await this.getUsuarios()
  }
}
</script>
