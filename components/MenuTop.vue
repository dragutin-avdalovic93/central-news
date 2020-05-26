<template>
  <div class="header-cont">
    <div class="header" @click="goHome">
      <div class="high-resolution-photo"></div>
      <h1>CENTRAL <span class="bordo">news</span></h1>
    </div>
    <form id="top-search-form" class="form-search form-horizontal pull-right" action="">
      <div id="top-search-form-in" class="top-search-form-in input-append span12 search_beli">
        <input type="text" class="search-query" id="search_news" value="" placeholder="Pretraga...">
        <button type="submit" class="btn" id="btnSearchA">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </form>
    <div class="footer-navigation-category">
      <div class="ml-md-auto d-flex flex-nowrap">
        <a class="fab fa-facebook-f social-media-icon ml-0" href="https://www.facebook.com/centralnews.live" title="Facebook" target="_blank"></a>
        <a class="fab fa-instagram social-media-icon" href="https://www.instagram.com/central_news_/" title="Instagram" target="_blank"></a>
        <a class="fab fa-youtube social-media-icon" href="" title="YouTube" target="_blank"></a>
        <a class="fab fa-twitter social-media-icon" href="https://twitter.com/Centralnews13?s=07&fbclid=IwAR1NhsOQM-UvagoZvtEsBL1ZY1ZN4rAoSPeJ0YX7Q3my_yh74RqZV0Bx8Ao" title="Twitter" target="_blank"></a>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

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
    },
    mounted() {
      $(document).ready(function() {
        $("form#top-search-form").submit(function(){
          var search = $( "#search_news" ).val();
          if (search == "") {
            alert('Molimo unesite ključnu riječ. ');
            return false;
          }
          else
          {
            $("#top-search-form").attr("action", '/pretraga/' + search);
          }
        });
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media (min-width: 0px) and (max-width: 1024px) {
    #top-search-form {
      display: none !important;
    }
  }
  #top-search-form {
    padding: 0;
    display: inline-block;
    position: absolute;
    left: 10px;
    bottom: 10px;
  }

  #top-search-form .search-query{
    margin-top: 1px;
    margin-left: 15px;
    padding-right: 3px;
    padding-left: 3px;
    width: 200px;
    border: none;
    background: white;
    color: #999999;
  }
  .search-query:focus{
    outline: none;
  }
  #top-search-form button:focus{
    outline: none;
    box-shadow:none !important;
  }
  #top-search-form-in{
    color: #999999;
    border: 1px solid #999999;
    background-color: white;
    line-height: 34px;
    border-radius: 20px;
  }
  .search_beli{
    background: #FFF;
  }
  #top-search-form-in input{
    height: 34px;
    font-size: 14px;
  }
  #top-search-form button {
    border: 0;
    background: none;
    /** belows styles are working good */
    padding: 2px 5px;
    position: relative;
    left: -12px;
    color: #999999;
    outline: none;
    box-shadow:none !important;
  }
  .search-query:focus + button {
    z-index: 3;
  }
  .footer-navigation-category .fa-facebook-f {
    background: #3b5998;
  }
  .footer-navigation-category .fa-twitter {
    background: #55acee;
  }
  .footer-navigation-category .fa-instagram {
    background: #bc2a8d;
  }
  .footer-navigation-category .fa-youtube {
    background: red;
  }
  .footer-navigation-category .social-media-icon {
    font-size: 20px;
    margin-left: 5px;
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    text-decoration: none;
    border-radius: 50%;
    box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);
    color: #fff;
  }
  .footer-navigation-category .social-media-icon:hover {
    opacity: .7;
  }
  .footer-navigation-category {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  @media (min-width: 0px) and (max-width: 728px) {
    .footer-navigation-category{
      display: none;
    }
  }
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
    position: relative;
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
