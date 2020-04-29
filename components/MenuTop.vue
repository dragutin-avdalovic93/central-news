<template>
  <div class="header-cont">
    <div class="header" @click="goHome">
      <h1>CENTRAL news</h1>
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
  .header-cont {
    background: darkslategrey;
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
    color: white;
    font-size: 28px;
    font-weight: 700;
  }
  @media (min-width: 0px) and (max-width: 728px) {
    h1 {
      font-size: 22px !important;
    }
  }
</style>
