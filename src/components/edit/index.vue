<template lang="pug">
  .site
    h1 {{ title }} 
      span {{site.name}}
    .site__quest
      .site__quest--title Вопросы
      .site__quest--list
        .site__quest--item.item(v-for="question in site.questions")
          .item__name {{ question }}
          .item__delete Удалить
      .site__quest--add
        textarea(placeholder="Введите вопрос", v-model='new_question')
      button.site__save(@click='addQuestion') Добавить изменения на сервер
</template>

<script>
  // Импортируем axios - пакет для работы с сервером
  import axios from 'axios'

  export default {
    name: 'site',
    data () {
      return {
        site: {}, // сюда пришло все, что с сервера
        title: 'Редактировать',
        new_question: ''
      }
    },
    mounted () {
      axios.get('https://kokoc.prort.ru/api/sites/' + this.$route.params.id).then((response) => {
        this.site = response.data
        if (this.site.questions === undefined) {
          this.site.questions = []
        }
        // console.log(response)
      })
    },
    methods: {
      addQuestion () {
        // Добавляем данные на страницу
        this.site.questions.push(this.new_question)
        this.new_question = ''
        // Отправляем данные на сервер
        axios.patch('https://kokoc.prort.ru/api/sites/' + this.$route.params.id, this.site).then((response) => {
          // console.log(response)
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
  // color-list
  $red: #b80000
  $white: #ffffff

  .site
    h1
      font-weight: 300
      span
        font-weight: 700
    &__quest
      &--title
        font-weight: 700
        margin-bottom: 15px
      &--list
        margin-bottom: 30px
      &--add
        textarea
          margin: 10px 0
          width: 300px
          height: 100px
          font-size: 16px
          display: block
          padding: 10px
    &__save
      background: $red
      color: $white
      border: none
      text-transform: uppercase
      padding: 7px 15px
      font-weight: 700
      margin-top: 25px
      cursor: pointer
      &:active, &:focus
        outline: none
        border: none

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
