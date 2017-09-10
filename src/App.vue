<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  }
}
</script>

<style lang="sass">
//color-list
$baseText: #2c3e50
$bg: #ffffff

body, html
  font-size: 16px
  margin: 0
  padding: 0
  line-height: 1.35
  background: $bg
#app
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: $baseText
  margin: 40px auto 0 auto
  max-width: 980px
  display: flex

#app *
  font-family: inherit

h1
  font-size: 30px
  font-weight: 300

</style>
