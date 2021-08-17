<template>
  <q-page class="flex flex-center">
    
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      listaDoacoes: [],
      doacaoData: {
        tipo_doacao: []
      },
      tiposDoacao: [
        {value: 'CESTA', nome: 'Cesta'},
        {value: 'REMEDIO', nome: 'Remédio'},
        {value: 'ROUPA', nome: 'Roupa'}
      ]
    }
  },
  methods: {
    async getDoacoes() {
      const user = this.$q.localStorage.getItem('usuario')
      await this.$axios({
          method: 'get',
          url: '/usuarios/' + user.id + '/doacoes'
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
  },
  mounted: async function() {
    console.log(this.$q.localStorage.getItem('usuario'))
    await this.getDoacoes()
  }
}
</script>
