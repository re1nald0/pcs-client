<template>
  <q-page>
    <div v-if="usuarioLoggado.tipo === 0" class="row q-pa-md">
      <q-table
        title="Doações"
        :data="listaDoacoes"
        :columns="doacoesTableColumns"
        row-key="name"
        class="full-width"
      >
        <template v-slot:top>
          <q-btn color="green"
               icon="add"
               label="Cadastrar Doação"
               class="col-xs-12 col-sm-12 col-md-2"
               @click="showCadastrarDoacao = true"
               />
        </template>

        <template v-slot:body-cell-editar="props">
          <q-td :props="props">
              <q-btn dense round flat color="primary" @click.stop="openEditarDoacao(props)" icon="edit"></q-btn>
          </q-td>
        </template>

        <template v-slot:body-cell-remover="props">
          <q-td :props="props">
              <q-btn dense round flat color="red" @click.stop="removerDoacao(props)" icon="delete"></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <div v-if="usuarioLoggado.tipo === 1" class="row q-pa-md">
      <q-table
        title="Solicitações de Doação"
        :data="listaSolicitacoes"
        :columns="solicitacoesTableColumns"
        row-key="name"
        class="full-width"
      >
        <template v-slot:top>
          <q-btn color="green"
                 icon="add"
                 label="Cadastrar Solicitação de Doação"
                 class="col-xs-12 col-sm-12 col-md-3"
                 @click="showCadastrarSolicitacao = true"
                 />
        </template>

        <template v-slot:body-cell-buscarDoacoes="props">
          <q-td :props="props">
              <q-btn dense round flat color="black" @click.stop="openBuscarDoacoes(props)" icon="explore"></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <div v-if="usuarioLoggado.tipo === 2" class="row q-pa-md">
      <q-table
        title="Lista de Solicitações"
        :data="listaSolicitacoes"
        :columns="solicitacoesAdminTableColumns"
        row-key="name"
        class="full-width"
      >
        <template v-slot:body-cell-confirmarRecebimento="props">
          <q-td :props="props">
              <q-btn dense round flat color="black" @click.stop="confirmarRecebimento(props)" icon="done"></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="showCadastrarDoacao" @hide="clearDoacaoData()" persistent>
      <q-card style="width: 100%;">
        <q-card-section>
          <div class="text-h6">Cadastrar Doação</div>
        </q-card-section>

        <q-card-section>
            <div class="row items-start q-gutter-xs">
              <q-select v-model="doacaoData.tipo_doacao"
                        :options="tiposDoacao"
                        :option-label="(props) => props.nome"
                        :rules="[val => !!val || 'campo obrigatorio']"
                        class="col-xs-12 col-sm-12 col-md-8"
                        label="Tipo Doação"
                        color="black"
                        outlined
                        />
              <q-input
                    class="col-xs-12 col-sm-12 col-md-3"
                    v-model.number="doacaoData.quantidade_total"
                    type="number"
                    label="Quantidade"
                    color="black"
                    outlined
                    :rules="[val => !!val || 'campo obrigatorio']"
              />
              <q-input
                    class="col-xs-12 col-sm-12 col-md-6"
                    v-model="doacaoData.local"
                    label="Local para retirar"
                    color="black"
                    outlined
                    :rules="[val => !!val || 'campo obrigatorio']"
              />
              <q-input
                    class="col-xs-12 col-sm-12 col-md-5"
                    v-model="doacaoData.data"
                    label="Data (ex.: dd/mm/yyyy)"
                    color="black"
                    outlined
                    :rules="[val => !!val || 'campo obrigatorio']"
              />
              <!-- <q-input class="col-xs-12 col-sm-12 col-md-5" outlined v-model="doacaoData.data" mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="doacaoData.data">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Fechar" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input> -->
            </div>
        </q-card-section>

        <q-card-actions align="right">
          <div style="q-gutter-xs">
            <q-btn flat label="Cancelar" color="black" v-close-popup />
            <q-btn @click="cadastrarDoacao()" label="Salvar" color="green"/>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showAtualizarDoacao" @hide="clearDoacaoData()" persistent>
      <q-card style="width: 100%;">
        <q-card-section>
          <div class="text-h6">Atualizar Doação</div>
        </q-card-section>

        <q-card-section>
            <div class="row items-start q-gutter-xs">
              <q-select v-model="doacaoData.tipo_doacao"
                        :options="tiposDoacao"
                        :option-label="(props) => props.nome"
                        :rules="[val => !!val || 'campo obrigatorio']"
                        class="col-xs-12 col-sm-12 col-md-8"
                        label="Tipo Doação"
                        color="black"
                        outlined
                        />
              <q-input
                    class="col-xs-12 col-sm-12 col-md-3"
                    v-model.number="doacaoData.quantidade_total"
                    type="number"
                    label="Quantidade"
                    color="black"
                    outlined
                    :rules="[val => !!val || 'campo obrigatorio']"
              />
              <q-input
                    class="col-xs-12 col-sm-12 col-md-6"
                    v-model="doacaoData.local"
                    label="Local para retirar"
                    color="black"
                    outlined
                    :rules="[val => !!val || 'campo obrigatorio']"
              />
              <q-input
                    class="col-xs-12 col-sm-12 col-md-5"
                    v-model="doacaoData.data"
                    label="Data (ex.: dd/mm/yyyy)"
                    color="black"
                    outlined
                    :rules="[val => !!val || 'campo obrigatorio']"
              />
              <!-- <q-input class="col-xs-12 col-sm-12 col-md-5" outlined v-model="doacaoData.data" mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="doacaoData.data">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Fechar" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input> -->
            </div>
        </q-card-section>

        <q-card-actions align="right">
          <div style="q-gutter-xs">
            <q-btn flat label="Cancelar" color="black" v-close-popup />
            <q-btn @click="atualizarDoacao()" label="Salvar" color="green"/>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showCadastrarSolicitacao" @hide="clearSolicitacaoData()" persistent>
      <q-card style="width: 100%;">
        <q-card-section>
          <div class="text-h6">Cadastrar Solicitação de Doação</div>
        </q-card-section>

        <q-card-section>
            <div class="row items-start q-gutter-xs">
              <q-select v-model="solicitacaoData.tipo_doacao"
                        :options="tiposDoacao"
                        :option-label="(props) => props.nome"
                        :rules="[val => !!val || 'campo obrigatorio']"
                        class="col-xs-12 col-sm-12 col-md-6"
                        label="Tipo Doação"
                        color="black"
                        outlined
                        />
              <q-input
                    class="col-xs-12 col-sm-12 col-md-5"
                    v-model="solicitacaoData.data"
                    label="Data (ex.: dd/mm/yyyy)"
                    color="black"
                    outlined
                    :rules="[val => !!val || 'campo obrigatorio']"
              />
              <!-- <q-input class="col-xs-12 col-sm-12 col-md-5" outlined v-model="doacaoData.data" mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="doacaoData.data">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Fechar" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input> -->
            </div>
        </q-card-section>

        <q-card-actions align="right">
          <div style="q-gutter-xs">
            <q-btn flat label="Cancelar" color="black" v-close-popup />
            <q-btn @click="cadastrarSolicitacao()" label="Salvar" color="green"/>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showBuscarDoacoes" @hide="clearSolicitacaoData()" persistent>
      <q-card style="width: 100%;">
        <q-card-section>
          <div class="text-h6">Doações Disponíveis</div>
        </q-card-section>

        <q-card-section>
          <q-table
            title="Doações"
            :data="doacoesDisponiveis"
            :columns="buscarDoacoesTableColumns"
            row-key="name"
            class="full-width"
            >
              <template v-slot:body-cell-aceitar="props">
                <q-td :props="props">
                    <q-btn dense round flat color="black" @click.stop="aceitarDoacao(props)" icon="done"></q-btn>
                </q-td>
              </template>
            </q-table>
        </q-card-section>

        <q-card-actions align="right">
          <div style="q-gutter-xs">
            <q-btn flat label="Cancelar" color="black" v-close-popup />
            <!-- <q-btn @click="cadastrarSolicitacao()" label="Salvar" color="green"/> -->
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
      usuarios: [],
      showCadastrarDoacao: false,
      showAtualizarDoacao: false,
      showCadastrarSolicitacao: false,
      showBuscarDoacoes: false,
      doacoesDisponiveis: [],
      usuarioLoggado: {
        nome: '',
        cpf: '',
        senha: '',
        email: '',
        telefone: '',
        endereco: '',
        tipo: -1,
      },
      listaDoacoes: [],
      doacaoData: {
        id: 0,
        doadorId: null,
        tipo_doacao: null,
        data: '',
        local: '',
        quantidade_total: 0,
        quantidade_restante: 0
      },
      listaSolicitacoes: [],
      solicitacaoData: {
        id: 0,
        tipo_doacao: null,
        data: '',
        status: 0,
        receptorId: 0,
        doacaoId: 0
      },
      tiposDoacao: [
        {value: 'CESTA', nome: 'Cesta'},
        {value: 'REMEDIO', nome: 'Remédio'},
        {value: 'ROUPA', nome: 'Roupa'}
      ],
      doacoesTableColumns: [
        {
          name: 'tipo_doacao',
          required: true,
          label: 'Tipo de Doação',
          align: 'left',
          field: row => row.tipo_doacao,
          format: val => `${val}`
        },
        { name: 'quantidade', align: 'center', label: 'Quantidade', field: row => row.quantidade_total },
        { name: 'local', align: 'center', label: 'Local para Retirada', field: row => row.local },
        { name: 'data', align: 'center', label: 'Data para Retirada', field: row => row.data },
        { name: 'editar', align: 'center', label: 'Editar Doação', field: 'editar' },
        { name: 'remover', align: 'center', label: 'Remover Doação', field: 'remover' }
      ],
      solicitacoesTableColumns: [
        {
          name: 'tipo_doacao',
          required: true,
          label: 'Tipo de Solicitação',
          align: 'left',
          field: row => row.tipo_doacao,
          format: val => `${val}`
        },
        { name: 'data', align: 'center', label: 'Data', field: row => row.data },
        { name: 'status', align: 'center', label: 'Status', field: row => row.status },
        { name: 'buscarDoacoes', align: 'center', label: 'Buscar Doações', field: 'buscarDoacoes' },
        // { name: 'remover', align: 'center', label: 'Remover Doação', field: 'remover' }
      ],
      buscarDoacoesTableColumns: [
        {
          name: 'tipo_doacao',
          required: true,
          label: 'Tipo de Doação',
          align: 'left',
          field: row => row.tipo_doacao,
          format: val => `${val}`
        },
        { name: 'local', align: 'center', label: 'Local para Retirada', field: row => row.local },
        { name: 'data', align: 'center', label: 'Data para Retirada', field: row => row.data },
        { name: 'aceitar', align: 'center', label: 'Aceitar', field: 'aceitar' },
      ],
      solicitacoesAdminTableColumns: [
        {
          name: 'receptor',
          align: 'center',
          label: 'Receptor',
          field: row => {
            const index = this.usuarios.map(function (o) { return o.id }).indexOf(row.receptorId)
            return this.usuarios[index].nome
          }
        },
        {
          name: 'tipo_doacao',
          required: true,
          label: 'Tipo de Solicitação',
          align: 'left',
          field: row => row.tipo_doacao,
          format: val => `${val}`
        },
        { name: 'data', align: 'center', label: 'Data', field: row => row.data },
        { name: 'status', align: 'center', label: 'Status', field: row => row.status === 0 ? 'Não Confirmada' : 'Confirmada' },
        { name: 'confirmarRecebimento', align: 'center', label: 'Confirmar Recebimento', field: 'confirmarRecebimento' },
      ]
    }
  },
  methods: {
    async getDoacoes() {
      const user = this.$q.localStorage.getItem('usuario')
      await this.$axios({
          method: 'get',
          url: '/usuarios/' + user.id + '/doacoes',
          headers: {
            token: this.$q.cookies.get('token')
          }
        }).then(response => {
            console.log('---GET USER DOACOES RESPONSE--')
            console.log(response.data)
            
            this.listaDoacoes = response.data
          }).catch(error => {
            console.log(error)

            this.$q.notify({
              position: 'top',
              message: 'Ocorreu algum erro!',
              color: 'red'
            })
          })
    },
    async getAllSolicitacoes() {
      const user = this.$q.localStorage.getItem('usuario')
      await this.$axios({
          method: 'get',
          url: '/solicitacoes',
          headers: {
            token: this.$q.cookies.get('token')
          }
        }).then(response => {
            console.log('---GET ALL SOLICITACOES RESPONSE--')
            console.log(response.data)
            
            this.listaSolicitacoes = response.data
          }).catch(error => {
            console.log(error)

            this.$q.notify({
              position: 'top',
              message: 'Ocorreu algum erro!',
              color: 'red'
            })
          })
    },
    async confirmarRecebimento(props) {
      console.log(props)
      let solicitacao = props.row

      if(props.row.status === 0) {
        this.$q.dialog({
          title: 'Confirmar',
          color: 'green',
          message: 'Confirma o recebimento desta doação?',
          cancel: true,
          persistent: true
        }).onOk(async (props) => {
          await this.$axios({
            method: 'put',
            url: '/solicitacoes',
            headers: {
              token: this.$q.cookies.get('token')
            },
            data: {
              id: solicitacao.id,
              tipo_doacao: solicitacao.tipo_doacao,
              data: solicitacao.data,
              status: 1,
              receptorId: solicitacao.receptorId,
              doacaoId: solicitacao.doacaoId
            }
          })
            .then(response => {
              console.log(response)

              const solicitacao_index = this.listaSolicitacoes.map(function (o) { return o.id }).indexOf(response.data.id)
              this.listaSolicitacoes[solicitacao_index].status = 1
              
              this.$q.notify({
                position: 'top',
                message: 'Doação confirmada!',
                color: 'green'
              })
            })
            .catch(error => {
              console.log(error)

              this.$q.notify({
                position: 'top',
                message: 'Erro ao confirmar doacao!',
                color: 'red'
              })
            })
        }).onCancel(() => {})
          .onDismiss(() => {})
      } else {
        this.$q.notify({
          position: 'top',
          message: 'Doação já confirmada!',
          color: 'black'
        })
      }
    },
    async openBuscarDoacoes(props) {
      console.log(props)
      this.solicitacaoData.id = props.row.id
      this.solicitacaoData.tipo_doacao = props.row.tipo_doacao
      this.solicitacaoData.data = props.row.data
      this.solicitacaoData.status = 0
      this.solicitacaoData.receptorId = props.row.receptorId

      const user = this.$q.localStorage.getItem('usuario')
      await this.$axios({
          method: 'get',
          url: '/solicitacoes/' + props.row.id + '/disponibilidade',
          headers: {
            token: this.$q.cookies.get('token')
          }
        }).then(response => {
            console.log('---GET DISPONIBILIDADE DOACOES RESPONSE--')
            console.log(response.data)
            
            this.doacoesDisponiveis = response.data
            this.showBuscarDoacoes = true
          }).catch(error => {
            console.log(error.response)

            if(error.response.status === 400) {
              this.$q.notify({
                position: 'top',
                message: 'Não há doações disponíveis ou você já recebeu nesse mês!',
                color: 'black'
              })
            } else {
              this.$q.notify({
                position: 'top',
                message: 'Ocorreu algum erro!',
                color: 'red'
              })
            }
          })
    },
    async aceitarDoacao(props) {
      console.log(props)

      this.solicitacaoData.doacaoId = props.row.id
      this.$q.dialog({
        title: 'Confirmar',
        color: 'green',
        message: 'Confirma a escolha desta doação?',
        cancel: true,
        persistent: true
      }).onOk(async (props) => {
        await this.$axios({
          method: 'put',
          url: '/solicitacoes',
          headers: {
            token: this.$q.cookies.get('token')
          },
          data: {
            id: this.solicitacaoData.id,
            tipo_doacao: this.solicitacaoData.tipo_doacao,
            data: this.solicitacaoData.data,
            status: this.solicitacaoData.status,
            receptorId: this.solicitacaoData.receptorId,
            doacaoId: this.solicitacaoData.doacaoId
          }
        })
          .then(response => {
            console.log(response)

            this.$q.notify({
              position: 'top',
              message: 'Doação escolhida!',
              color: 'green'
            })

            this.doacoesDisponiveis = []
            this.showBuscarDoacoes = false
          })
          .catch(error => {
            console.log(error)

            this.$q.notify({
              position: 'top',
              message: 'Erro ao escolher doacao!',
              color: 'red'
            })

            this.doacoesDisponiveis = []
            this.showBuscarDoacoes = false
          })
      }).onCancel(() => {})
        .onDismiss(() => {})
    },
    async cadastrarDoacao() {
      console.log(this.doacaoData)
      if(!this.validadeDoacaoData()) {
          this.$q.notify({
            position: 'top',
            message: 'Verifique se deixou dados faltando',
            color: 'red'
          })
      } else {
        const user = this.$q.localStorage.getItem('usuario')
        await this.$axios({
          method: 'post',
          url: '/doacoes',
          headers: {
            token: this.$q.cookies.get('token')
          },
          data: {
            id: null,
            doadorId: user.id,
            tipo_doacao: this.doacaoData.tipo_doacao.value,
            data: this.doacaoData.data,
            local: this.doacaoData.local,
            quantidade_total: this.doacaoData.quantidade_total,
            quantidade_restante: this.doacaoData.quantidade_total
          }
        }).then(response => {
            console.log('---CREATE DOACAO RESPONSE--')
            console.log(response.data)

            this.showCadastrarDoacao = false
            this.$q.notify({
              position: 'top',
              message: 'Doação cadastrada com sucesso!',
              color: 'green'
            })

            this.listaDoacoes.push(response.data)
          }).catch(error => {
            console.log(error)

            this.showCadastrarDoacao = false
            this.$q.notify({
              position: 'top',
              message: 'Ocorreu algum erro! Tente novamente',
              color: 'red'
            })
          })
      }
    },
    async atualizarDoacao() {
      if(!this.validadeDoacaoData()) {
          this.$q.notify({
            position: 'top',
            message: 'Verifique se deixou dados faltando',
            color: 'red'
          })
      } else {
        const user = this.$q.localStorage.getItem('usuario')
        const index = this.listaDoacoes.map(function (o) { return o.id }).indexOf(this.doacaoData.id)
        await this.$axios({
          method: 'put',
          url: '/doacoes',
          headers: {
            token: this.$q.cookies.get('token')
          },
          data: {
            id: this.doacaoData.id,
            doadorId: user.id,
            tipo_doacao: this.doacaoData.tipo_doacao.value,
            data: this.doacaoData.data,
            local: this.doacaoData.local,
            quantidade_total: this.doacaoData.quantidade_total,
            quantidade_restante: this.doacaoData.quantidade_total
          }
        }).then(response => {
            console.log('---UPDATE DOACAO RESPONSE--')
            console.log(response.data)

            this.showAtualizarDoacao = false
            this.$q.notify({
              position: 'top',
              message: 'Doação atualizada com sucesso!',
              color: 'green'
            })

            this.listaDoacoes[index].id = response.data.id
            this.listaDoacoes[index].doadorId = response.data.doadorId
            this.listaDoacoes[index].tipo_doacao = response.data.tipo_doacao
            this.listaDoacoes[index].data = response.data.data
            this.listaDoacoes[index].local = response.data.local
            this.listaDoacoes[index].quantidade_total = response.data.quantidade_total
            this.listaDoacoes[index].quantidade_restante = response.data.quantidade_restante
          }).catch(error => {
            console.log(error)

            this.showAtualizarDoacao = false
            this.$q.notify({
              position: 'top',
              message: 'Ocorreu algum erro! Tente novamente',
              color: 'red'
            })
          })
      }
    },
    removerDoacao: async function (props) {
      const index = this.listaDoacoes.map(function (o) { return o.id }).indexOf(props.row.id)
      const id = props.row.id

      this.$q.dialog({
        title: 'Confirmar',
        color: 'red',
        message: 'Realmente deseja remover esta doação?',
        cancel: true,
        persistent: true
      }).onOk(async (props) => {
        await this.$axios({
          method: 'delete',
          url: '/doacoes/' + id,
          headers: {
            token: this.$q.cookies.get('token')
          },
        })
          .then(response => {
            console.log(response)

            this.listaDoacoes.splice(index, 1)
            this.$q.notify({
              position: 'top',
              message: 'Doação removida!',
              color: 'green'
            })
          })
          .catch(error => {
            console.log(error)

            this.$q.notify({
              position: 'top',
              message: 'Erro ao remover doação!',
              color: 'red'
            })
          })
      }).onCancel(() => {})
        .onDismiss(() => {})
    },
    async getSolicitacoes() {
      const user = this.$q.localStorage.getItem('usuario')
      await this.$axios({
          method: 'get',
          url: '/usuarios/' + user.id + '/solicitacoes',
          headers: {
            token: this.$q.cookies.get('token')
          }
        }).then(response => {
            console.log('---GET USER SOLICITACOES RESPONSE--')
            console.log(response.data)
            
            this.listaSolicitacoes = response.data
          }).catch(error => {
            console.log(error)

            this.$q.notify({
              position: 'top',
              message: 'Ocorreu algum erro!',
              color: 'red'
            })
          })
    },
    async cadastrarSolicitacao() {
      console.log(this.doacaoData)
      if(!this.validadeSolicitacaoData()) {
          this.$q.notify({
            position: 'top',
            message: 'Verifique se deixou dados faltando',
            color: 'red'
          })
      } else {
        const user = this.$q.localStorage.getItem('usuario')
        await this.$axios({
          method: 'post',
          url: '/solicitacoes',
          headers: {
            token: this.$q.cookies.get('token')
          },
          data: {
            id: null,
            tipo_doacao: this.solicitacaoData.tipo_doacao.value,
            data: this.solicitacaoData.data,
            status: false,
            local: this.doacaoData.local,
            receptorId: this.usuarioLoggado.id,
            doacaoId: null
          }
        }).then(response => {
            console.log('---CREATE SOLICITACAO RESPONSE--')
            console.log(response.data)

            this.showCadastrarSolicitacao = false
            this.$q.notify({
              position: 'top',
              message: 'Solicitação cadastrada com sucesso!',
              color: 'green'
            })

            this.listaSolicitacoes.push(response.data)
          }).catch(error => {
            console.log(error)

            this.showCadastrarSolicitacao = false
            this.$q.notify({
              position: 'top',
              message: 'Ocorreu algum erro! Tente novamente',
              color: 'red'
            })
          })
      }
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
    validadeDoacaoData() {
      return (
        this.doacaoData.tipo_doacao !== null &&
        this.doacaoData.quantidade_total !== 0
      )
    },
    validadeSolicitacaoData() {
      return (
        this.solicitacaoData.tipo_doacao !== null &&
        this.solicitacaoData.data !== 0
      )
    },
    openEditarDoacao(props) {
      const index = this.listaDoacoes.map(function (o) { return o.id }).indexOf(props.row.id)
      const tipo_doacao_index = this.tiposDoacao.map(function (o) { return o.value }).indexOf(props.row.tipo_doacao)

      this.doacaoData.id = this.listaDoacoes[index].id
      this.doacaoData.doadorId = this.listaDoacoes[index].doadorId
      this.doacaoData.tipo_doacao = this.tiposDoacao[tipo_doacao_index]
      this.doacaoData.data = this.listaDoacoes[index].data
      this.doacaoData.local = this.listaDoacoes[index].local
      this.doacaoData.quantidade_total = this.listaDoacoes[index].quantidade_total
      this.doacaoData.quantidade_restante = this.listaDoacoes[index].quantidade_restante

      this.showAtualizarDoacao = true
    },
    clearDoacaoData() {
      this.doacaoData.id = 0
      this.doacaoData.doadorId = null
      this.doacaoData.tipo_doacao = null
      this.doacaoData.data = ''
      this.doacaoData.local = ''
      this.doacaoData.quantidade_total = 0
      this.doacaoData.quantidade_restante = 0
    },
    clearSolicitacaoData() {
      this.solicitacaoData.id = 0
      this.solicitacaoData.tipo_doacao = null
      this.solicitacaoData.data = ''
      this.solicitacaoData.status = 0
      this.solicitacaoData.receptorId = 0
      this.solicitacaoData.doacaoId = 0
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
  },
  mounted: async function() {
    this.getUsuarios()
    // console.log(this.$q.localStorage.getItem('usuario'))
    this.usuarioLoggado = this.$q.localStorage.getItem('usuario')
    if(this.usuarioLoggado.tipo === 0) {
      await this.getDoacoes()
    } else {
      await this.getSolicitacoes()
    }

    if(this.usuarioLoggado.tipo === 2) {
      await this.getAllSolicitacoes()
    }
  }
}
</script>
