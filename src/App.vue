<template>
  <div class="container">
    <Main />
  </div>
</template>

<script>
import Main from './components/Main.vue';

export default {
  name: 'App',
  components: {
    Main
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
  }
  html {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }
  body {
    margin: 0px;
    padding: 0px;
    width: 100%;
    display: flex;
    justify-content: center; 
  }
  p {
    padding: 0px;
    margin: 0px;
  }
  .container {
    margin: 50px;
  }
</style>
