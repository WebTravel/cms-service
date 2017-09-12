<template lang="pug">
  .detail
    h1 {{ title }} 
      span {{site.name}}
    .detail__tabs
      span.detail__tab.detail__tab--new.active(v-show="site.new_answers_count !== 0") Новые
      span.detail__tab.detail__tab--old Прочитанные
</template>

<script>
  // Импортируем axios - пакет для работы с сервером
  import axios from 'axios'

  export default {
    name: 'detail',
    data () {
      return {
        site: {}, // сюда пришло все, что с сервера
        title: 'Отзывы на сайте '
      }
    },
    mounted () {
      axios.get('https://kokoc.prort.ru/api/sites/' + this.$route.params.id).then((response) => {
        this.site = response.data
        this.site.new_answers_count = 1
        console.log(response)
      })
    },
    methods: {
      addData () {

      }
    }
  }
</script>

<style lang="sass" scoped>
  //color-list
  $grey: #8c8c8c
  $black: #2c3e50

  .detail
    h1
      span
        font-weight: 700
    &__tabs
      span 
        font-size: 20px
        color: $grey
        margin-right: 15px
        &.active
          color: $black
          font-weight: bold
  
</style>