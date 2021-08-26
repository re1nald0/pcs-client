<template>
  <q-page>
    <q-table
    title="Fila"
    :data="fila"
    :columns="filaTableColumns"
    row-key="name"
    class="full-width"
    >
    </q-table>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      fila: [],
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
      filaTableColumns: [
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
        }
      ]
    }
  },
  methods: {
    async getFila() {
      await this.$axios({
          method: 'get',
          url: '/usuarios/fila',
          headers: {
            token: this.$q.cookies.get('token')
          }
        }).then(response => {
            console.log('---GET FILA RESPONSE--')
            console.log(response.data)
            
            this.fila = response.data
          }).catch(error => {
            console.log(error)

            this.$q.notify({
              position: 'top',
              message: 'Ocorreu algum erro!',
              color: 'red'
            })
          })
    }
  },
  mounted: async function() {
      await this.getFila()
  }
}
</script>
