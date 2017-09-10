<template lang="pug">
  .sites
    h1 {{ msg }}
    .sites__list
      .sites__item(v-for='site in sites')
        a.sites__domain(href="#" @click.self.prevent="showSiteInfo(site)") {{site.name}}
        .sites__desc(v-show="site.show")
          .sites__feedback
            .sites__feedback--item
              .sites__question.sites__string(v-for='question in site.questions')
                span Вопрос:
                |  {{question}}
              .sites__responsive.sites__string(v-for='answer_set in site.answer_sets')
                .sites__string(v-for='answer in answer_set.answers')
                  spen Вопрос:
                  |  {{answer.question}}
                  span Ответ:
                  |  {{answer.text}}
          .sites__managemet
            a.sites__remove(href="#", @click.prevent="removeSite(site)") Удалить сайт
</template>

<script>
export default {
  name: 'sites-list',
  data () {
    return {
      msg: 'Список сайтов',
      sites: [
        {
          id: 1,
          show: false,
          name: 'vk.com',
          questions: [
            'Вернул ли Дуров стену?',
            'Как вернуть старый дизайн?'
          ],
          answer_sets: [
            {
              answers: [
                {
                  question: 'Вернул ли Дуров стену?',
                  text: 'Нет, останутся микроблоги'
                },
                {
                  question: 'Как вернуть старый дизайн?',
                  text: 'Никак'
                }
              ],
              new: true
            }
          ]
        },
        {
          id: 2,
          show: false,
          name: 'kokoc.com',
          questions: [
            'Довольны ли вы проделанной работой?'
          ],
          answer: [
            'Да, разумеется'
          ]
        }
      ]
    }
  },
  methods: {
    showSiteInfo (site) {
      site.show = !site.show
      // Функция раскрытия списка вопросов и ответов для сайта
      // console.log(el)
      // el.nextElementSibling.show = true
    },
    removeSite ({id}) {
      this.sites = this.sites.filter(site => site.id !== id)
    }
  },
  computed: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  // color-list
  $red: red
  $purple: purple

  h1
    margin: 0 0 25px 0
  .sites
    &__item
      margin-bottom: 30px
    &__domain
      font-weight: bold
      font-size: 1.5rem
      display: block
      padding-bottom: 20px
      color: purple
    &__string
      margin-bottom: 10px
      span
        font-weight: bold
    &__feedback
      &--item
        margin-bottom: 35px
    &__remove
      display: inline-block
      padding: 5px 10px
      background: $red
      color: #ffffff
      font-size: 1.2rem
      font-weight: bold
      text-decoration: none
      &:hover
        opacity: 0.8


</style>
