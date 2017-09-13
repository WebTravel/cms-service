<template lang="pug">
  .detail
    h1 {{ title }} 
      span {{site.name}}
    vue-tabs
      v-tab(title="Новые" v-show="site.new_answers_count !== 0")
        .detail__review Отзыв 10 сентября 2017 года:
        .detail__quest
          .detail__quest--wrap
            .detail__quest--item
              .detail__quest--name Вопрос:
              .detail__quest--body Понравился ли наш сайт?
            .detail__quest--item.answer
              .detail__quest--name Ответ:
              .detail__quest--body Да
          .detail__quest--wrap
            .detail__quest--item
              .detail__quest--name Вопрос:
              .detail__quest--body Зайдёте ли вы ещё?
            .detail__quest--item.answer
              .detail__quest--name Ответ:
              .detail__quest--body Разумеется
          .detail__buttons
            button.detail__edit &#10004;  Прочитано
            button.detail__delete Удалить
      v-tab(title="Прочитанные")
</template>

<script>
  // Импортируем axios - пакет для работы с сервером
  import axios from 'axios'
  // Импортируем tabs
  import {VueTabs, VTab} from 'vue-nav-tabs'
  import 'vue-nav-tabs/themes/vue-tabs.css'

  export default {
    name: 'detail',
    data () {
      return {
        site: {}, // сюда пришло все, что с сервера
        title: 'Отзывы на сайте '
      }
    },
    components: {
      VueTabs,
      VTab
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
  $red: #b80000

  .detail
    h1
      span
        font-weight: 700
    &__review
      font-size: 24px
      font-weight: bold
      padding: 30px 0
    &__quest
      padding-left: 30px
      &--wrap
        display: flex   
      &--item
        color: $grey
        min-width: 300px
        margin-bottom: 20px
        font-size: 18px
        &.answer
          color: $black
      &--name
        margin-bottom: 10px
    &__buttons
      padding: 20px 0
      button
        margin-right: 25px
        border: none
        background: none
        font-size: 22px
        color: $red
        padding: 0
        font-weight: bold
        &:hover
          opacity: 0.8
</style>



<style lang="sass">
  //color-list
  $grey: #8c8c8c
  $black: #2c3e50
  .vue-tabs .nav-tabs > li.active > a, .vue-tabs .nav-tabs > li.active > a:hover, .vue-tabs .nav-tabs > li.active > a:focus
      color: $black
      font-weight: bold   

  .vue-tabs .nav-tabs > li
    font-size: 20px
</style>