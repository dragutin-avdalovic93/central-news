<template>
  <div class="footer-container">
    <div class="footer">
      <div class="footer-primary-navigation">
        <ul id="menu-primary-menu" class="nav-menu">
          <li class="list"><a @click="goHome">Početna</a></li>
          <li class="list"><span>|</span></li>
          <li class="list"><a @click="goTo('')">O nama</a></li>
          <li class="list"><span>|</span></li>
          <li class="list"><a @click="goTo('')">Kontakt</a></li>
        </ul>
      </div>
      <div class="copyright">
        <p>Sva prava zadržana © 2020 <span class  ="site-title">centralnews.live</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    methods: {
      goTo(string) {
        this.$router.push({name: string});
      },
      goHome() {
        this.$router.push('/');
      }
    },
    components: {},
    mounted() {
    }
  }
</script>

<style>
  @media (max-width: 576px) {
    .nav-menu {
      min-height: 80px !important;
      padding-left: 0 !important;
    }
  }
  .nav-menu {
    min-height: 40px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 !important;
  }
  .nav-menu span {
    color: #DAE1E7
  }
  .list {
    list-style-type: none;
    padding: 5px;
  }
  .footer-container {
    background: #142850;
    width: 100%;
    padding: 5px 10px;
  }
  .list a:hover {
    opacity: 0.6 !important;
    text-decoration: none !important;
    cursor: pointer !important;
  }
  .list a {
    font-size: 14px;
    color: #DAE1E7 !important;
    cursor: pointer !important;
    padding: 5px 5px 0 5px !important;
  }
  .footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
  .copyright {
    color: #00909e;
    font-size:14px;
    text-align: center;
    cursor: pointer;
  }
  ul {
    padding-left: 0 !important;
  }
</style>
