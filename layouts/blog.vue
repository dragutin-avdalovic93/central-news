<template>
  <div class="layout">
    <MenuTop/>
    <TopLatestNews/>
    <MainMenu/>
    <nuxt />
    <Footer/>
  </div>
</template>
<script>
  import MenuTop from '../components/MenuTop'
  import Footer from '../components/Footer'
  import TopLatestNews from '../components/TopLatestNews'
  import MainMenu from '../components/MainMenu'
  export default {
    layout: 'default',
    components: { MenuTop, Footer, TopLatestNews, MainMenu}
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
  background: #27496d;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
