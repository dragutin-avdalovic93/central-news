<template>
  <div class="header-navigation">
    <div class="header-navigation-inner">
      <!-- desktop navigations oldlook -->
      <ul>
        <li itemprop="name" data-xicon="fa fa-paper-plane">
          <a itemprop="url" class="header-selected-bg show-loader" href="/" data-target="#">Početna</a>
        </li>
        <li itemprop="name" class="dropdown dropdown-sub-menu-parent" :id="item.slug" data-id="685" data-level="1" data-xicon="fa fa-music" v-for="(item,index) in categoryFinal">
          <a itemprop="url" :href="'/' + item.slug" data-target="#" v-if="!item.hasChildren">{{item.name}}</a>
          <a itemprop="url" class="dropdown-toggle " :href="'/' + item.slug"  data-target="#" data-toggle="dropdown" v-else-if="item.hasChildren">{{item.name}} <em class="caret"></em></a>
          <ul class="dropdown-sub-menu width_200px" v-if="item.hasChildren">
            <li v-for="(child,index) in item.children"><a :href="'/' + child.slug"  class="show-loader">{{child.name}}</a></li>
         </ul>
        </li>
      </ul>
      <!-- end desktop navigation -->
      <!-- mobile navigation -->
      <div class="pull-left header-mobile-navigation" id="menu-container">
        <div id="menu-wrapper">
          <div id="hamburger-menu" class=""><span></span><span></span><span></span></div>
        </div>

        <!-- menu-wrapper -->
        <ul class="menu-list accordion" style="left: -100%;">
          <li id="1" class="toggle accordion-toggle show-loader" @click="goHomeMobile()">Početna</li>
          <span  class="in-span" v-for="(item,index) in categoryFinal">
          <li :id="index" class="toggle accordion-toggle">
            <span class="plus_span"><span class="icon-plus" v-if="item.hasChildren"></span></span>
            <a class="menu-link" @click="goTo(item.slug)">{{item.name}}</a>
          </li>
          <ul class="menu-submenu accordion-content" v-if="item.hasChildren">
            <li class="show-loader" v-for="(child,index) in item.children">
              <a class="head text-uppercase" @click="goTo(child.slug)" >{{child.name}}</a>
            </li>
          </ul>
          </span>
        </ul>
      </div>
      <div class="search_form_mobile">
      <form id="top-search-form2" class="form-search form-horizontal pull-right" action="">
        <div id="top-search-form-in" class="top-search-form-in input-append span12 search_beli">
          <input type="text" class="search-query" id="search_news_mobile" value="" placeholder="Pretraga">
          <button type="submit" class="btn" id="btnSearchA">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </form>
    </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  import _ from 'lodash';
  export default {
    name: 'MainMenu',
    props: {},
    data: function() {
      return {
        categories: [],
        categoryParents: [],
        categoryChilds: [],
        categoryChildsSec: [],
        categoryFinalSketch: ["vijesti", "intervju", "kultura", "sport","vrijeme", "kolumne", "anketa", "centralmagazin", "humanitarne-akcije", "posalji-vijest"],
        submenuSketch: ["istocnosarajevo","republikasrpska", "bih", "region", "svijet"],
        submenuSketchSec: [ "nadanasnjidan", "istorijske-zanimljivosti", "zabava", "zdravljeiljepota", "dalisteznali"],
        categoryFinal: []
      }
    },
    methods: {
      goTo(cat) {
        this.$router.replace('/' + cat);
        document.getElementById("hamburger-menu").click();
        this.categories = [];
        this.categoryParents = [];
        this.categoryChilds = [];
        this.categoryFinal = [];
        this.fetchCategories();
      },
      goHome() {
        this.$router.replace('/');
      },
      goHomeMobile() {
        this.$router.replace('/');
        document.getElementById("hamburger-menu").click();
        this.categories = [];
        this.categoryParents = [];
        this.categoryChilds = [];
        this.categoryChildsSec = [];
        this.categoryFinal = [];
        this.fetchCategories();
      },
      async fetchCategories() {
        this.categories = await this.$axios.$get('https://admincentralnews.xyz/wp-json/wp/v2/categories?per_page=100');
        this.categories.forEach((category) => {
          if (category.parent === 0) {
            delete category["parent"];
            this.categoryParents.push(category);
          } else {
            if (category.parent === 84) {
              this.categoryChilds.push(category);
            } else if (category.parent === 1) {
              this.categoryChildsSec.push(category);
            }
          }
        });
        this.categoryChilds.forEach((child) => {
          this.categoryParents.forEach((parent) => {
            if(child.parent === parent.id) {
              if(parent["children"] === undefined) {
                parent["children"] = [];
              }
              delete child["parent"];
              parent["hasChildren"] = true;
              parent["children"].push(child);
            } else {
              parent["hasChildren"] = false;
            }
          });
        });
        this.categoryChildsSec.forEach((child) => {
          this.categoryParents.forEach((parent) => {
            if(child.parent === parent.id) {
              if(parent["children"] === undefined) {
                parent["children"] = [];
              }
              delete child["parent"];
              parent["hasChildren"] = true;
              parent["children"].push(child);
            } else {
              parent["hasChildren"] = false;
            }
          });
        });
        this.categoryFinalSketch.forEach((sketchName) => {
          this.categoryParents.forEach((parent) => {
            if(parent.slug === sketchName) {
              this.categoryFinal.push(parent);
            } else {
              if(parent.slug === 'magazin') {
                parent.hasChildren = true;
                let newChilds = [];
                this.submenuSketchSec.forEach((sub) => {
                  parent.children.forEach((child) => {
                    if(child.slug === sub) {
                      newChilds.push(child);
                    }
                  });
                });
                delete parent["children"];
                parent["children"] = newChilds;
              } else if (parent.slug === 'vijesti') {
                parent.hasChildren = true;
                let newChilds = [];
                this.submenuSketch.forEach((sub) => {
                  parent.children.forEach((child) => {
                    if(child.slug === sub) {
                      newChilds.push(child);
                    }
                  });
                });
                delete parent["children"];
                parent["children"] = newChilds;
              }
            }
          });
        });
      }
    },
    mounted() {
// JavaScript Document
      $(document).ready(function() {
        /**
         * Mobile menu
         */
        $("#menu-close").click(function(e) {
          e.preventDefault();
          $("#sidebar-wrapper").toggleClass("active");
        });
        $("#menu-toggle").click(function(e) {
          e.preventDefault();
          $("#sidebar-wrapper").toggleClass("active");
        });
        // -------------------------------------------------------------------------
      });
      $(function() {
        function slideMenu() {
          var activeState = $('#menu-container .menu-list').hasClass('active');
          $('#menu-container .menu-list').animate({
            left: activeState ? '0%' : '-100%'
          }, 400);
        }

        $('#menu-wrapper').click(function(event) {
          event.stopPropagation();
          $('#hamburger-menu').toggleClass('open');
          $('#menu-container .menu-list').toggleClass('active');
          slideMenu();

          //$('body').toggleClass('overflow-hidden');
        });

        $(".menu-list").on('click', '.accordion-toggle', function() {
          $(this).toggleClass("active-tab").find(".plus_span span").toggleClass("icon-minus icon-plus");
          $(this).next().toggleClass("open").slideToggle("fast");
          $(".menu-list .accordion-content").not($(this).next()).slideUp("fast").removeClass("open");
          $(".menu-list .accordion-toggle").not($(this)).removeClass("active-tab").find(".plus_span span").removeClass("icon-minus").addClass("icon-plus")
        });

        $(".menu-list").on('click', '.accordion-toggle-sub', function() {
          $(this).toggleClass("active-tab").find(".plus_span span").toggleClass("icon-minus icon-plus");
          $(this).next().toggleClass("open").slideToggle("fast");
          $(".menu-list .accordion-content-sub").not($(this).next()).slideUp("fast").removeClass("open");
          $(".menu-list .accordion-toggle-sub").not($(this)).removeClass("active-tab").find(".plus_span span").removeClass("icon-minus").addClass("icon-plus")
        });

      }); // jQuery load
      // Mobile menu
      $('.menu-tab').click(function() {
        $('.menu-hide').toggleClass('show');
        $('.menu-tab').toggleClass('active');
      });
      $('.mobile_close').click(function() {
        $('.menu-hide').removeClass('show');
        $('.menu-tab').removeClass('active');
      });

      $("form#top-search-form2").submit(function(){
       var search = $( "#search_news_mobile" ).val();
        if (search == "") {
          alert('Molimo unesite ključnu riječ. ');
          return false;
        }
       else
        {
         $("#top-search-form2").attr("action", '/pretraga/' + search);
        }
       });
    },
    created() {
      this.fetchCategories();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* DESKTOP MENU*/
  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
  }

  .header-navigation {
    background-color: white;
    min-height: 49px;
    line-height: 49px;
    color:#fff;
  }

  .header-navigation-inner {
    max-width: 1240px;
    margin: auto;
    padding: 0 50px;
    position: relative;
  }
  @media screen and (max-width: 1024px) {
    .header-navigation-inner {
      margin: auto;
      padding: 0 20px 0 15px;
      position: relative;
      background: #7a0000;
    }
  }


  .header-navigation-inner ul {
    margin: 0px;
    padding: 0px;
    list-style: none;
    font-family: 'Roboto', sans-serif;
  }

  .header-navigation-inner ul li {
    float: left;
    border-right: 1px solid rgba(0, 0, 0, 0.16);
    box-shadow: 5px 5px 2px 0px rgba(0,0,0,0.55);
    background: white;
    z-index: 200;
  }

  .header-navigation-inner ul li a {
    cursor: pointer;
    font-weight: bold;
    color:black;
    text-rendering: optimizeLegibility;
    font-size: 14px;
    margin: 0;
    line-height: 25px;
    padding: 12px 17px;
    -webkit-transition: 350ms;
    -moz-transition: 350ms;
    -o-transition: 350ms;
    transition: 350ms;
    display: block;
    position: relative;
  }

  .header-navigation-inner ul li a:hover{
    text-decoration: none;
    background: rgba(0, 0, 0, 0.1);
  }

  .header-navigation-inner .fa,  .header-navigation-inner .far{
    margin-right: 5px;
  }

  .header-selected-bg{
    background: rgba(0, 0, 0, 0.1);
  }



  .caret{border-top:4px solid red;}

  .dropdown-sub-menu-parent { position: relative; }

  .dropdown-sub-menu-parent2 { position: inherit; }

  .dropdown-sub-menu , .dropdown-sub-menu2{
    background-color: #fff;
    visibility: hidden; /* hides sub-menu */
    opacity: 0;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    transform: translateY(-2em);
    z-index: 200;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.175);
    transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;
  }


  .dropdown-sub-menu2{
    top: 49px;
    color: #333333 !important;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px !important;
    z-index: 200;
  }

  .width_200px{
    width: 200px;
    z-index: 200;
  }

  .height150px{
    height:150px
  }

  .padding_0_17{
    padding: 0px 17px;
    border-bottom: none !important;
  }

  .padding_bottom_0{
    border-bottom: none !important;
    padding-bottom: 0;
  }

  .max_height_30px{
    max-height: 30px;
  }

  .display_inline_block{
    display: inline-block;
  }

  .dropdown-sub-menu li, .dropdown-sub-menu2 li{
    width: 100%;
    border-right: none !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.16);
    z-index: 200;
  }

  .dropdown-sub-menu a, .dropdown-sub-menu2 a{
    color: #333333 !important;
    text-transform: uppercase;
    font-size: 12px !important;
    z-index: 200;
  }
  .dropdown-sub-menu li a{
  }

  .dropdown-sub-menu a:hover, .dropdown-sub-menu2 a:hover{
    color: #f80000 !important;
    background: none !important;
  }


  /*.dropdown-sub-menu-parent:focus .dropdown-sub-menu,*/
  /*.dropdown-sub-menu-parent:focus-within .dropdown-sub-menu,*/
  .dropdown-sub-menu-parent:hover .dropdown-sub-menu, .dropdown-sub-menu-parent:hover .dropdown-sub-menu2 {
    visibility: visible; /* shows sub-menu */
    opacity: 1;
    z-index: 1;
    transform: translateY(0%);
    transition-delay: 0.0s, 0.0s, 0.3s; /* this removes the transition delay so the menu will be visible while the other styles transition */
  }

  .dropdown-sub-menu-parent:hover .dropdown-toggle { background: rgba(0, 0, 0, 0.1); }

  .dropdown-category-badge{
    position: absolute;
    top: 0;
    background-color: #f80000;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    padding: 3px 6px;
    line-height: 16px;
    display: inline-block;
  }

  .nspHeader a{
    text-transform: none !important;
  }

  .nspInfo{
    line-height: 14px;
    font-size: 12px;
    color: #999999;
    text-transform: none;
  }

  .nspInfo a{
    color: #999999 !important;
  }

  .nspAuthor, .nspCategory {
    display: inline !important;
    line-height: 15px !important;
    font-size: 12px !important;
    color: #999999 !important;
    text-transform: none !important;
  }

  .header_top_right{
    color: #999999;
  }

  .header_top_right a{
    color: #999999;
    font-size: 25px;

  }

  #top-search-form, #top-search-form2 {
    margin:0 0 0 20px;
    padding: 0;
    display: inline-block;
  }

  #top-search-form2{
    float: right;
  }

  #top-search-form .search-query, #top-search-form2 .search-query {
    margin-top: 1px;
    margin-left: 15px;
    padding-right: 3px;
    padding-left: 3px;
    width: 250px;
    border: none;
    background: #454648;
    color: #999999;
  }

  .search-query:focus{
    outline: none;
  }

  #top-search-form button:focus, #top-search-form2 button:focus{
    outline: none;
    box-shadow:none !important;
  }

  #top-search-form-in{
    color: #999999;
    border: 1px solid #999999;
    background-color: #454648;
    line-height: 40px;
  }


  .search_beli{
    background: #FFF;
  }

  #top-search-form-in input{

    height: 40px;
    font-size: 14px;

  }

  #top-search-form button , #top-search-form2 button{
    border: 0;
    background: none;
    /** belows styles are working good */
    padding: 2px 5px;
    margin-top: -3px;
    position: relative;
    left: -12px;
    color: #999999;
    outline: none;
    box-shadow:none !important;
  }

  .search-query:focus + button {
    z-index: 3;
  }

  .search_form_mobile{
    width: 80%;
    position: absolute;
    top: 9px;
    right: 14px;
    display: none;

  }

  .search_form_mobile #top-search-form-in{
    color: #999999;
    border: 0px solid #999999;
    background-color: #fff;
  }

  #top-search-form2 .search-query{
    color: #999999;
    background-color: #fff;
  }


  /*navigation */
  .header-top-navigation-weather {
    padding: 0 15px;
    border-left: 1px solid #454648;
    font-size: 11px !important;
    line-height: 40px !important;
    color: #D6D6D7 !important;
    text-transform: uppercase;
    text-decoration: none;
    display: none;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }

  /*calendar*/
  .calendar_first_page{
    width: 130px;
    height: 40px;
    position: absolute;
    top: 0;
    right: 25px;
    z-index: 2;
    background: none;
    border: none;
    color: transparent;
    text-shadow: 0px 0px 0px grey;
    cursor: pointer;
  }

  .active_class_red {
    background: #7a0000;
    color: #fff !important;
  }
  .active {
    border: none;
  }

  /** max 992 *******************************************************************/
  @media screen and (max-width: 992px){
    .header-navigation-inner ul{
      display: none;
    }

    #top-search-form{
      display: none;
    }

    .search_form_mobile{
      display: block;
    }
  }

  /** max 767 *******************************************************************/
  @media screen and (max-width: 767px){
    .header_top_right{
      padding-right: 0px;
      font-size: 20px;
    }

    .header_top_right a{
      font-size: 20px;
      padding-left: 10px;
    }

    .header-top-inner{
      display: none;
    }
  }

  /** max 450 *******************************************************************/
  @media screen and (max-width: 450px) {
    #top-search-form2 .search-query {
      width: 120px;
    }
    .search_form_mobile{
      width: 68%;
    }
  }
  /*end desktop menu*/

  /*MOBILE MENU*/
  #menu-wrapper {
    overflow: hidden;
    max-width: 100%;
    cursor: pointer;
  }


  #menu-wrapper #hamburger-menu {
    position: relative;
    width: 35px;
    height: 35px;
    margin: 12px 5px 12px 0px;
  }

  #menu-wrapper #hamburger-menu span {
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    left: 0;
    display: block;
    width: 100%;
    height: 4px;
    border-radius: 0;
    color: black;
    background-color: white;
    position: absolute;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .4s ease-in-out;
    transition: .4s ease-in-out;
  }

  #menu-wrapper #hamburger-menu span:nth-child(1) {
    top: 0;
  }
  #menu-wrapper #hamburger-menu span:nth-child(2) {
    top: 15px;
  }
  #menu-wrapper #hamburger-menu span:nth-child(3) {
    top: 30px;
  }
  #menu-wrapper #hamburger-menu.open span:nth-child(1) {
    top: 15px;
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
  }
  #menu-wrapper #hamburger-menu.open span:nth-child(2) {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    left: -60px;
  }
  #menu-wrapper #hamburger-menu.open span:nth-child(3) {
    top: 15px;
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }

  #menu-container .menu-list .menu-submenu {
    /*padding-bottom: 20px;*/
  }

  .menu-submenu li{
    font-size: 16px;
    padding: 12px 20px;
    color: #333333 !important;
    float: none !important;
    border-right: none !important;
    border-top: 1px solid rgba(0, 0, 0, 0.16);
    box-shadow: none !important;
    background: white;
  }

  .menu-submenu li a{
    color: #333333 !important;
    padding: 0 20px !important;
    width: 90%;
  }

  .menu-submenu li a:hover{
    background-color: #fff !important;
  }

  #menu-container .menu-list {
    padding-left: 0;
    display: block;
    position: absolute;
    width: 100%;
    max-width: 1070px;
    background-color: #7a0000;
    box-shadow: rgba(100,100,100,0.2) 6px 2px 10px;
    z-index: 999;
    overflow-y: auto;
    overflow-x: hidden;
    left: -100%;
  }

  #menu-container .menu-list li.accordion-toggle, #menu-container .menu-list li.accordion-toggle-sub, #menu-container .menu-list .menu-login {
    font-size: 14px;
    padding: 12px 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.16);
    background-color: #7a0000;
    color:#fff !important;
    float: none;
    border-right: none;
    width: 100%;
    line-height: 24px;
  }

  #menu-container .menu-list li.accordion-toggle-sub{
    background-color: #fff;
    color:#333333 !important;
  }

  #menu-container .menu-list li:first-of-type {
    /*border-top: 0;*/
  }

  .accordion-toggle, .accordion-toggle-sub, .accordion-content {
    cursor: pointer;
    font-size: 16px;
    position: relative;
    letter-spacing: 1px;
  }

  .open .active-tab{
    border-top: 2px solid #EB1923 !important;
    color: #EB1923 !important;
  }

  .open .active-tab a{
    color: #EB1923 !important;
  }

  .accordion-content, .accordion-content-sub {
    display: none;
  }

  .accordion-content-sub{
    border-bottom: 2px solid #7a0000;
    color: #7a0000;
  }

  .accordion-content-sub li a{
    color: #EB1923 !important;
  }

  .accordion-content-sub li{
    padding-left: 40px;
  }

  .accordion-content{
    border-left: 2px solid #7a0000;
    border-right: 2px solid #7a0000;
    border-bottom: 2px solid #7a0000;
  }

  .accordion-toggle span[class^='icon-'] , .accordion-toggle-sub span[class^='icon-'] {
    position: absolute;
    right: 10px;
    font-size: 25px;
    top: calc(50% - 16px);
  }
  .accordion-toggle span.icon-plus, .accordion-toggle span.icon-minus, .accordion-toggle-sub span.icon-plus, .accordion-toggle-sub span.icon-minus {
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
    padding: 5px;
  }
  .accordion-toggle span.icon-plus, .accordion-toggle-sub span.icon-plus {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .accordion-toggle a {
    color:#fff;
    padding: 0 !important;
    width: 80%;
  }

  .accordion-toggle a:hover{
    background: #7a0000 !important;
  }

  .icon-minus:before {
    content: "\2013"
  }

  .icon-plus:before {
    content: "+"
  }


  .header-mobile-navigation{
    display: none;
  }

  /** max 992 *******************************************************************/
  @media screen and (max-width: 992px){
    .header-navigation-inner ul li a {
      color:white;
    }
    .header-mobile-navigation{
      display: block;
      background: #7a0000;
    }
  }
  /*MOBILE MENU END*/
  #humanitarne-akcije {
    margin-left: 20px;
    background: grey;
    border-right: 1px solid rgba(0, 0, 0, 0.16);
    box-shadow: 5px 5px 2px 0px rgba(0,0,0,0.55);

  }
  #posalji-vijest {
    margin-left: 5px;
    background: grey;
    border-right: 1px solid rgba(0, 0, 0, 0.16);
    box-shadow: 5px 5px 2px 0px rgba(0,0,0,0.55);
  }
</style>
