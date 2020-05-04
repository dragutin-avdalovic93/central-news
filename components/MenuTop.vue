<template>
  <div class="header-cont">
    <div class="header" @click="goHome">
      <h1>CENTRAL <span class="red">news</span></h1>
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
  .red {
    color: #df2027;
  }
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
    margin: 10px 0;
    font-size: 28px;
    font-weight: 700;
    color: #dae1e7;
  }
  @media (min-width: 0px) and (max-width: 728px) {
    h1 {
      font-size: 22px !important;
    }
  }
</style>
