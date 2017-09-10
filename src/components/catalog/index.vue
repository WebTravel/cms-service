<template lang="pug">
  .sites
    h1 {{ title }}
    .sites__list(v-for="site, idx in sites")
      .sites__item.site
        .site__info
          .site__name {{site.name}}
          a.site__answers.answer(href="#")
            span.answer__count(v-show="site.new_answers_count > 0") {{site.new_answers_count}}
            span.answer__name Ответы
        .site__management
          router-link.site__edit(:to="{name:'site', params: {id: site.id}}") Редактировать
          a.site__delete(href="#" @click.prevent="removeSite(site)") Удалить
</template>

<script>
  // Импортируем axios - пакет для работы с сервером
  import axios from 'axios'

  export default {
    name: 'catalog',
    data () {
      return {
        title: 'Сайты',
        sites: require('../../sites.json')
      }
    },
    mounted () {
      axios.get('https://kokoc.prort.ru/api/sites').then((response) => {
        this.sites = response.data
        this.sites = this.sites.map(item => ({...item, new_answers_count: 25}))
      })
    },
    methods: {
      removeSite ({id}) {
        this.sites = this.sites.filter(site => site.id !== id)
      }
    }
  }
</script>

<style lang="sass"scoped>
  // color-list
  $red: #b80000
  $white: #ffffff

  .sites
    h1
      font-size: 30px
      font-weight: 300
    &__list
      margin-left: 30px

  .site
    margin-bottom: 45px
    &__name
      font-weight: 700
      font-size: 28px
    &__info
      display: flex
      align-items: center
      justify-content: space-between
      width: 400px
      margin-bottom: 10px
    &__management
      display: flex
      a
        display: block
        font-weight: 400
        font-size: 14px
        text-decoration: none
        color: $red
        &:hover
          text-decoration: underline
    &__edit
      margin-right: 20px

  .answer
    display: flex
    align-items: center
    margin-left: 30px
    color: $red
    text-decoration: none
    &:hover
      opacity: 0.5
    &__count
      display: block
      padding: 2px 5px
      background: $red
      color: $white
      line-height: 1
      border-radius: 25%
      margin-right: 5px
    &__name
      line-height: 1
      margin-left: auto

</style>
