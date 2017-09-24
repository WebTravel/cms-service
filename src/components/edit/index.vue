<template lang="pug">
  .site
    h1 {{ is_new ? 'Создать сайт' : 'Редактировать сайт ' }}
      span {{site.name}}
    p Вернуться к &nbsp;
      router-link(to="/") списку сайтов
    .site__create(v-if='is_new')
      .site__create--item
        .site__create--name URL сайта
        input(type="text" placeholder="http://" v-model='new_url')
      .site__create--item
        .site__create--name Имя сайта
        input(type="text" v-model='new_name')
    .site__quest
      .site__quest--title Вопросы
      .site__quest--list
        .site__quest--item.item(v-for="question in site.questions")
          .item__name {{ question }}
          .item__delete Удалить
      .site__quest--add
        textarea(placeholder="Введите вопрос", v-model='new_question')
      button.site__save(@click='addQuestion') Добавить вопрос
      button.site__save(v-if='is_new' @click='saveSite') Сохранить сайт
</template>

<script>
  // Импортируем axios - пакет для работы с сервером
  import axios from 'axios'

  export default {
    name: 'site',
    data () {
      return {
        site: {
          questions: []
        }, // сюда пришло все, что с сервера
        new_question: '',
        new_name: '',
        new_url: ''
      }
    },
    computed: {
      is_new () {
        return !this.site.id
      }
    },
    mounted () {
      if (!this.$route.params.id) {
        return 0
      }
      this.fetch()
    },
    methods: {
      // получаем нужный сайт
      fetch () {
        axios.get('https://kokoc.prort.ru/api/sites/' + this.$route.params.id).then((response) => {
          this.site = response.data
          if (this.site.questions === undefined) {
            this.site.questions = []
          }
          // console.log(response)
        })
      },
      addQuestion () {
        // Добавляем данные на страницу
        this.site.questions.push(this.new_question)
        this.new_question = ''
        if (this.is_new) {
          return
        }
        // Отправляем данные на сервер
        axios.patch('https://kokoc.prort.ru/api/sites/' + this.$route.params.id, this.site).then((response) => {
          // console.log(response)
        })
      },
      saveSite () {
        this.site.name = this.new_name
        this.site.url = this.new_url
        if (this.site.name !== '' && this.site.url !== '') {
          axios.post('https://kokoc.prort.ru/api/sites', this.site).then((response) => {
            this.$router.push({name: 'site', params: {id: response.data.id}})
            this.fetch()
            // console.log(response)
          })
        } else {
          console.log('empty')
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  // color-list
  $red: #b80000
  $white: #ffffff

  .site
    a
      color: $red
    h1
      font-weight: 300
      span
        font-weight: 700
    &__quest
      &--title
        font-weight: 700
        margin-bottom: 15px
      &--list
        margin-bottom: 15px
      &--add
        textarea
          margin: 10px 0
          width: 300px
          height: 100px
          font-size: 16px
          display: block
          padding: 10px
          box-sizing: border-box
          margin-bottom: 25px
    &__save
      background: $red
      color: $white
      border: none
      text-transform: uppercase
      padding: 7px 15px
      font-weight: 700
      margin-top: 10px
      cursor: pointer
      display: block
      text-align: center
      min-width: 300px
      &:active, &:focus
        outline: none
        border: none
    &__create
      margin-bottom: 15px
      &--item
        margin-bottom: 15px
      &--name
        font-weight: bold
        margin-bottom: 15px
      input
        width: 300px
        height: 30px
        padding: 0 10px
        box-sizing: border-box
        font-size: 16px

  .item
    display: flex
    align-items: center
    margin-bottom: 10px
    &__name
      margin-right: 30px
      font-size: 18px
    &__delete
      color: $red
      cursor: pointer
      font-size: 14px
      &:hover
        text-decoration: underline

</style>
