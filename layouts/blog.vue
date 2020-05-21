<template>
  <div class="layout">
    <MenuTop/>
    <TopLatestNews/>
    <MainMenu/>
    <div class="container inner-content">
      <div class="row main-row">
        <div class="col-12 col-md-2 col-lg-2 banners order-1 order-sm-1 order-xs-1 order-md-0 order-lg-0 order-xl-0">
          <div class="divider-15"></div>
          <div><a href="" title="Mjesto za vašu reklamu" target="_self"><img src="https://admincentralnews.xyz/wp-content/uploads/2020/05/ad.png" class="img-fluid-ad" alt="Mjesto za reklamu"></a></div>
          <div class="divider-15"></div>
        </div>
        <div class="col-12 col-md-6 col-lg-6 order-0 order-sm-0 order-xs-0 order-md-1 order-lg-1 order-xl-1">
          <nuxt/>
        </div>
        <div class="col-12 col-md-3 col-lg-3 latest-news-slot order-2 order-sm-2 order-xs-2 order-md-2 order-lg-2 order-xl-2"><LatestNews/></div>
        <div class="col-12 col-md-1 col-lg-1 banners-end order-3 order-sm-3 order-xs-3 order-md-3 order-lg-3 order-xl-3">
          <div class="divider-15"></div>
          <div><a href="" title="Mjesto za vašu reklamu" target="_self"><img src="https://admincentralnews.xyz/wp-content/uploads/2020/05/ad.png" class="img-fluid-ad" alt="Mjesto za reklamu"></a></div>
          <div class="divider-15"></div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
  import MenuTop from '../components/MenuTop'
  import Footer from '../components/Footer'
  import TopLatestNews from '../components/TopLatestNews'
  import MainMenu from '../components/MainMenu'
  import LatestNews from '../components/LatestNews'
  export default {
    layout: 'default',
    components: { MenuTop, Footer, TopLatestNews, MainMenu, LatestNews}
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
.img-fluid-ad {
  width: 100%;
  height: auto;
}
.main-row {
  margin: 0!important;
}
.divider-15 {
  height: 15px;
  clear: both;
}
.img-fluid {
  max-width: 100%;
  height: auto;
}
.banners {
  background: #dae1e7
}
@media (max-width: 767px) {
  .banners {
    margin-bottom: 20px;
    margin-top: 20px;
  }
}
.banners-end {
  background: #dae1e7;
}
@media (max-width: 767px) {
  .banners-end {
    margin-bottom: 20px;
    margin-top: 20px;
  }
}
@media (max-width: 1024px) {
  .img-fluid {
    width: 90%;
    margin:  0 5%;
    height: auto;
  }
}
.inner-content {
  padding: 20px 0;
}
.latest-news-slot {
  background: #dae1e7;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
@media (max-width: 767px) {
  .latest-news-slot {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
