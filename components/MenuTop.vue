<template>
  <div class="header-cont">
    <div class="header" @click="goHome">
      <div class="high-resolution-photo"></div>
      <h1>CENTRAL <span class="bordo">news</span></h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MenuTop',
    props: {
    },
    data: function () {
      return {
      }
    },
    methods: {
      goHome() {
        this.$router.push('/');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .high-resolution-photo {
    background-image: url('https://admincentralnews.xyz/wp-content/uploads/2020/05/central-news-logo.gif');
    background-size: 108px 81px;
    background-repeat: no-repeat;
    display: block;
    width: 108px;
    height: 81px;
    margin-top: 20px;
    transform: scale(2.5);
    z-index: 1;
  }
  .normal-photo{
    background-image: url('https://admincentralnews.xyz/wp-content/uploads/2020/05/central-news-logo.gif');
    width: 144px;
    height: 108px;
  }
  .bordo {
    color: #f70c0c;
  }
  /*#df2027*/
  .header-cont {
    background: #142850;
  }
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  h1 {
    margin-top: 48px;
    font-size: 28px;
    font-weight: 700;
    color: #dae1e7;
    margin-left: -15px;
  }
  @media (min-width: 0px) and (max-width: 728px) {
    h1 {
      font-size: 22px !important;
      margin-top: 48px;
      margin-left: -15px;
    }
  }
  .logo {
    width: 100px;
    height: 100px;
  }
</style>
