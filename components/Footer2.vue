<template>
  <div class="footer">
    <div class="footer-inner-2">
      <!--<div class="row">
        <div class="col-md-3 logo-col">
          <div class="high-resolution-photo" @click="goHome"></div>
          <div class="contact">
          <div class="divider-15"></div>
          <span class="text-contact-us">Kontaktirajte nas</span><br>
          <a href="mailto:redakcija_centralnews@yahoo.com" class="link-footer-email">redakcija_centralnews@yahoo.com</a><br>
          <a href="mailto:marketing_centralnews@yahoo.com" class="link-footer-email">marketing_centralnews@yahoo.com</a>
          <br>
          <div class="divider"></div>
          </div>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-8 footer-cnt">
          <loading :active.sync="loading"
                   :can-cancel="false"
                   :is-full-page="true"
                   :color="color"
                   :width="width"
                   :height="height"
                   :loader="loader"
          ></loading>
          <div v-if="!this.loading" class="row">
            <div class="col-6 col-md-4">
              <div class="footer-navigation-title">Vijesti</div>
              <div class="divider-15"></div>
                <div class="footer-navigation-category" v-for="category in categoryFinal[0].children">
                  <a :href="'/' + category.slug" class="link-footer-navigation-category show-loader">{{category.name}}</a>
                  <div class="footer-navigation-divider"></div>
                </div>
              <div class="divider-15"></div>
            </div>
            <div class="col-6 col-md-4">
                <div class="footer-navigation-title">Ostalo&nbsp;</div>
                <div class="divider-15"></div>
                <div class="footer-navigation-category" v-for="category in categoryFinal">
                    <a :href="'/' + category.slug" class="link-footer-navigation-category show-loader">{{category.name}}</a>
                  <div class="footer-navigation-divider"></div>
                </div>
              <div class="divider-15"></div>
            </div>
             <div class="col-6 col-md-4">
              <div class="footer-navigation-title">Društvene mreže</div>
              <div class="divider-15"></div>
                 <div class="footer-navigation-category">
                   <div class="ml-md-auto d-flex flex-nowrap">
                     <a class="fab fa-facebook-f social-media-icon ml-0" href="https://www.facebook.com/centralnews.live" title="Facebook" target="_blank"></a>
                     <a class="fab fa-instagram social-media-icon" href="https://www.instagram.com/central_news_/" title="Instagram" target="_blank"></a>
                     <a class="fab fa-youtube social-media-icon" href="" title="YouTube" target="_blank"></a>
                   <a class="fab fa-twitter social-media-icon" href="https://twitter.com/Centralnews13?s=07&fbclid=IwAR1NhsOQM-UvagoZvtEsBL1ZY1ZN4rAoSPeJ0YX7Q3my_yh74RqZV0Bx8Ao" title="Twitter" target="_blank"></a>
                   </div>
                 </div>
               <div class="divider-15"></div>
             </div>
          </div>
        </div>
      </div>-->
      <!--<div class="divider-underline-footer"></div>-->
      <div class="row">
        <div class="col-sm-12 col-12 align-center" style="z-index: 10000; background: grey;text-align: center;display: flex; align-items: center;flex-direction: row; justify-content:center;">
          <p><a  style=" padding:0 10px;font-family: 'Roboto', Arial;font-size: 12px;color: #fff;" href="/">Home</a></p>
          <p><a  style=" padding:0 10px;font-family: 'Roboto', Arial;font-size: 12px;color: #fff;" href="/terms_and_conditions">Terms and Conditions</a></p>
          <p><a  style="padding:0 10px;font-family: 'Roboto', Arial;font-size: 12px;color: #fff;" href="/privacy_policy">Privacy Policy</a></p>
          <p><a  style="padding:0 10px;font-family: 'Roboto', Arial;font-size: 12px;color: #fff;" href="/disclaimer">Disclaimer</a></p>
          <p><a  style="padding:0 10px;font-family: 'Roboto', Arial;font-size: 12px;color: #fff;" href="/about_us">About us</a></p>
          <p><a  style="padding:0 10px;font-family: 'Roboto', Arial;font-size: 12px;color: #fff;" href="/contact_us">Contact us</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from 'vue-loading-overlay';
  export default {
    data() {
      return {
        categories: [],
        categoryParents: [],
        categoryChilds: [],
        categoryFinalSketch: ["vijesti", "centralmagazin", "intervju", "kultura", "sport","vrijeme", "kolumne", "anketa", "humanitarne-akcije", "posalji-vijest"],
        submenuSketch: ["istocnosarajevo","republikasrpska", "bih", "region", "svijet"],
        categoryFinal: [], loading: true,
        color: '#00909e',
        height: 128,
        width: 128,
        loader: 'bars'
      };
    },
    methods: {
      async fetchCategories() {
        this.categories = await this.$axios.$get('https://admincentralnews.xyz/wp-json/wp/v2/categories?per_page=100');
        this.categories.forEach((category) => {
          if (category.parent === 0) {
            delete category["parent"];
            this.categoryParents.push(category);
          } else {
            this.categoryChilds.push(category);
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
        this.categoryFinalSketch.forEach((sketchName) => {
          this.categoryParents.forEach((parent) => {
            if(parent.slug === sketchName) {
              this.categoryFinal.push(parent);
            }
            if(parent.hasChildren) {
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
          });
        });
        this.loading = false;
      },
      goTo(string) {
        this.$router.push({name: string});
      },
      goHome() {
        this.$router.replace('/');
      }
    },
    components: {
      Loading
    },
    created() {
      this.fetchCategories();
    }
  }
</script>

<style>
.high-resolution-photo {
  background-image: url(https://admincentralnews.xyz/wp-content/uploads/2021/09/novi_finalno.gif);
  background-size: 210px 70px;
  background-repeat: no-repeat;
  display: block;
  width: 210px;
  height: 70px;
  z-index: 1;
}
@media (max-width: 768px) {
  .high-resolution-photo {
    margin-left: 0 !important;
    background-size: 165px 55px !important;
    background-position: left;
  }
}
  .contact {
    z-index: 2;
  }
  /** footer ********************************************************************/
  .footer-cnt {
   text-align: center;
  }
  .footer {
    background-image: linear-gradient(to bottom, #016e9c 0, #014a69 100%);
    background-repeat: repeat-x;
  }
  .footer .fa-facebook-f {
    background: #3b5998;
  }
  .footer .fa-twitter {
    background: #55acee;
  }
  .footer .fa-instagram {
    background: #bc2a8d;
  }
  .footer .fa-youtube {
    background: red;
  }
  .footer .social-media-icon {
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
  .footer .social-media-icon:hover {
    opacity: .7;
  }
  .footer-inner-2 {
    margin: auto;
    padding: 0px 15px 0 15px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: #999;
    z-index:100000;
  }
  .footer-inner-2 p{
    line-height: 1;
    text-align: center;
    margin: 5px 10px;
  }
  .footer-inner-2 a{
    padding: 0 !important;
  }


  .footer-inner .title{
    font-size: 16px;
    line-height: 20px;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    color: #FFF;
    margin-top: 15px;
  }

  .footer-logo {
    max-width: 300px;
  }

  .footer-inner .copyright{
    font-family: 'Roboto', Arial;
    font-size: 12px;
    color: #fff;
    text-align: left;
  }

  .footer-inner .text-contact-us {
    font-size: 12px;
  }


  .footer-navigation-title{
    font-size: 16px;
    line-height: 20px;
    text-transform: uppercase;
    font-family: 'Roboto', Arial;
    color: #FFF;
    margin-top: 15px;
    text-align: left;
  }

  .footer-navigation-category{
    padding-left: 0px;
    text-align: left !important;
  }

  .footer-navigation-divider{
    height: 1px;
    background-color: #48494A;
    margin: 7px 0;
  }

  a.link-footer-navigation-category:link    { color: #999; text-decoration: none; font-size: 12px; font-family: 'Roboto', Arial;}
  a.link-footer-navigation-category:visited { color: #999; text-decoration: none; font-size: 12px; font-family: 'Roboto', Arial;}
  a.link-footer-navigation-category:hover   { color: #fff; text-decoration: none; font-size: 12px; font-family: 'Roboto', Arial;}
  a.link-footer-navigation-category:active  { color: #fff; text-decoration: none; font-size: 12px; font-family: 'Roboto', Arial;}

  a.link-footer:link    { color: #aaa; text-decoration: none; font-size: 12px; font-family: 'Roboto', Arial;}
  a.link-footer:visited { color: #aaa; text-decoration: none; font-size: 12px; font-family: 'Roboto', Arial;}
  a.link-footer:hover   { color: #fff; text-decoration: none; font-size: 12px; font-family: 'Roboto', Arial;}
  a.link-footer:active  { color: #fff; text-decoration: none; font-size: 12px; font-family: 'Roboto', Arial;}

  a.link-footer-email:link    { color: #fff; text-decoration: none; font-size: 12px; font-family: 'Roboto', Arial;}
  a.link-footer-email:visited { color: #fff; text-decoration: none; font-size: 12px; font-family: 'Roboto', Arial;}
  a.link-footer-email:hover   { color: #fff; text-decoration: underline; font-size: 12px; font-family: 'Roboto', Arial;}
  a.link-footer-email:active  { color: #fff; text-decoration: underline; font-size: 12px; font-family: 'Roboto', Arial;}

  a.link-footer-navigation:link    { color: #aaa; text-decoration: none; font-size: 13px; font-family: 'Roboto', Arial; margin-left: 10px;}
  a.link-footer-navigation:visited { color: #aaa; text-decoration: none; font-size: 13px; font-family: 'Roboto', Arial; margin-left: 10px;}
  a.link-footer-navigation:hover   { color: #fff; text-decoration: none; font-size: 13px; font-family: 'Roboto', Arial; margin-left: 10px;}
  a.link-footer-navigation:active  { color: #fff; text-decoration: none; font-size: 13px; font-family: 'Roboto', Arial; margin-left: 10px;}

  .footer-black {
    background-color: #151419;
  }

  .footer-black .footer-inner {
    padding: 40px 15px 5px 15px;
    font-family: 'Roboto', Arial;
    font-size: 14px;
    color: #c2c2c2;
  }

  .footer-inner .align-left {
    text-align: left;
  }

  .footer-inner .align-right {
    text-align: right;
  }

  /* social feed */
  .footer-inner .social-feed {
    position: relative;
  }

  .footer-inner .social-feed-icon {
    position: absolute;
    left: 0;
    top:0px;
  }

  .footer-inner .social-feed-icon i {
    font-size: 20px;
  }

  .footer-inner .social-feed-box {
    padding-left: 35px;
  }

  .footer-inner .social-feed-date {
    color: #f80000;
    font-size: 11px;
  }

  a.link-footer-social-feed-title:link    { color: #c2c2c2; text-decoration: none; font-size: 12px; font-family: 'Roboto', Arial; text-transform: uppercase;}
  a.link-footer-social-feed-title:visited { color: #c2c2c2; text-decoration: none; font-size: 12px; font-family: 'Roboto', Arial; text-transform: uppercase;}
  a.link-footer-social-feed-title:hover   { color: #fff; text-decoration: none; font-size: 12px; font-family: 'Roboto', Arial; text-transform: uppercase;}
  a.link-footer-social-feed-title:active  { color: #fff; text-decoration: none; font-size: 12px; font-family: 'Roboto', Arial; text-transform: uppercase;}

  .footer-inner .social-feed-tag {
    font-size: 11px;
  }

  .footer-inner .news-box {
    position: relative;
  }

  .footer-inner .news-image-section {
    position: absolute;
    left:0;
    right: 0;
    width: 130px;
    min-height: 80%;
  }

  .footer-inner .news-image-section-title {
    position: absolute; left:0; top: -3px;
  }

  .footer-inner .news-image-section-title-inner {
    background-color: #f80000; color:#fff; font-size: 11px; padding: 0 5px 2px 5px; display: inline-block;
  }

  .footer-inner .news-image-section-img {
    background-repeat: no-repeat !important;background-position: center center;background-size: cover; padding-bottom: 60%;
  }

  .footer-inner .news-text-section {
    padding-left: 145px;
    min-height: 80px;
  }

  .footer-inner .news-text-section-title {

  }

  a.link-news-text-section-title:link    { color: #c2c2c2; text-decoration: none; font-size: 14px; line-height: 15px; font-family: 'Roboto', Arial; text-transform: uppercase;}
  a.link-news-text-section-title:visited { color: #c2c2c2; text-decoration: none; font-size: 14px; line-height: 15px; font-family: 'Roboto', Arial; text-transform: uppercase;}
  a.link-news-text-section-title:hover   { color: #f80000; text-decoration: none; font-size: 14px; line-height: 15px; font-family: 'Roboto', Arial; text-transform: uppercase;}
  a.link-news-text-section-title:active  { color: #f80000; text-decoration: none; font-size: 14px; line-height: 15px; font-family: 'Roboto', Arial; text-transform: uppercase;}

  .footer-inner .news-text-section-date {
    font-size: 12px;
    padding-top: 5px;
  }
  /** max 560 *******************************************************************/
  @media screen and (max-width: 574px){
    .footer-inner-2 p{
      line-height: 1;
      text-align: center;
      margin: 5px 5px;
    }
    .footer-inner-2 a{
      padding: 0 !important;
      font-size: 10px;
    }
    .footer-inner .align-left {
      text-align: center !important;
    }

    .footer-inner .align-right {
      text-align: center !important;
    }
  }
  .divider {
    height: 30px;
    clear: both;
  }
  .divider-underline-footer {
    height: 1px;
    background-color: #444;
    margin: 0 0 25px 0;
  }
  .logo-col {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  /* end social feed */

</style>
