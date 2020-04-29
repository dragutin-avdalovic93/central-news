<template>
  <div class="layout">
    <MenuTop/>
    <nuxt />
  </div>
</template>
<script>
  import MenuTop from '../components/MenuTop'
  export default {
    layout: 'default',
    components: { MenuTop}
  }
</script>
<style>
html {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.layout {
  background: #0099ff;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
