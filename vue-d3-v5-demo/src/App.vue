<template>
  <div id="app">
    <Aaa/>
  </div>
</template>

<script>
import Aaa from './components/Aaa.vue'
export default {
  name: 'App',
  components: {
    Aaa
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
