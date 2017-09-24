<template lang="pug">
  .detail
    h1 Отзывы на сайте &nbsp;
      a(:href="site.url" target="_blank") {{ site.name }}
    p Вернуться к &nbsp;
      router-link(to="/") списку сайтов
    vue-tabs
      v-tab(
        :title="tab.name",
        v-for="tab in [{name:'Новые', cond: true, text: 'Отметить, как прочитанное'}, {name:'Прочитанные', cond: false, text: 'Отметить, как непрочитанное'}]",
        :key="tab.name"
      )
        p(v-if='checkNew') Новых отзывов не оставлено
        .detail__wrapper(v-for='answer_set in answer_sets', v-if='answer_set.new == tab.cond')
          .detail__review Отзыв от {{ answer_set.created_at | formatDate }}
          .detail__quest
            .detail__quest--wrap(v-for="answer in answer_set.answers")
              .detail__quest--item
                .detail__quest--name Вопрос:
                .detail__quest--body {{ answer.question }}
              .detail__quest--item.answer
                .detail__quest--name Ответ:
                .detail__quest--body {{ answer.text }}
            .detail__buttons
              button.detail__edit(@click='editCondition(answer_set)') {{tab.text}}
              button.detail__delete(@click='deleteReview(answer_set)') Удалить

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
        answer_sets: [],
        title: 'Отзывы на сайте '
      }
    },
    computed: {
      checkNew () {
        return this.site.new_answers_count === 0
      }
    },
    components: {
      VueTabs,
      VTab
    },
    mounted () {
      axios.get(`https://kokoc.prort.ru/api/sites/${this.$route.params.id}`).then((response) => {
        this.site = response.data
        this.site.created_at = this.site.created_at.split('T')[0]
        console.log(response)
        // console.log(this.site.new_answers_count)
      })
      axios.get(`https://kokoc.prort.ru/api/sites/${this.$route.params.id}/answer_sets`).then((response) => {
        this.answer_sets = response.data
        console.log(response.data)
      })
    },
    methods: {
      editCondition (answerSet) {
        // Перемещаем отзыв во вкладку "Прочитанные" или обратно
          // this.answer_sets[i].new = !this.answer_sets[i].new
          // Отправляем данные на сервер
        axios.patch('https://kokoc.prort.ru/api/sites/' + this.$route.params.id + '/answer_sets/' + answerSet._id, {new: !answerSet.new}).then((response) => {
          answerSet.new = !answerSet.new
          // console.log(response)
        })
      },
      deleteReview (answerSet) {
        // Удаляем отзыв
        axios.delete('https://kokoc.prort.ru/api/sites/' + this.$route.params.id + '/answer_sets/' + answerSet._id).then((response) => {
        // console.log(response)
          this.answer_sets.splice(this.answer_sets.indexOf(answerSet), 1)
        })
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
    a
      color: $red
    h1
      a
        font-weight: 700
        text-docaration: none
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
        cursor: pointer
        &:hover
          opacity: 0.8
        &:active, &:focus
          outline: none
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
