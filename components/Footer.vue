<template>
  <div class="footer">
    <div class="footer-inner">
      <div class="row">
        <div class="col-md-3">
          <a href="https://www.princip.news/"><img src="http://178.62.199.187/wp-content/uploads/2020/05/200x100.gif" class="img-fluid show-loader"></a>
          <div class="divider-15"></div>
          <span class="text-contact-us">Kontaktirajte nas</span><br>
          <a href="mailto:redakcija@centralnews.live" class="link-footer-email">redakcija@centralnews.live</a><br><a href="mailto:marketing@centralnews.live" class="link-footer-email">marketing@centralnews.live</a>
          <br>
          <div class="divider"></div>
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
              <div class="footer-navigation-title">Uskoro</div>
              <div class="divider-15"></div>
                 <div class="footer-navigation-category">
                   <a href="" class="link-footer-navigation-category show-loader">Anketa</a>
                   <div class="footer-navigation-divider"></div>
                   <a href="" class="link-footer-navigation-category show-loader">Prijavi vijest</a>
                   <div class="footer-navigation-divider"></div>
                 </div>
               <div class="divider-15"></div>
             </div>
          </div>
        </div>
      </div>
      <div class="divider-underline-footer"></div>
      <div class="row">
        <div class="col-sm-6 copyright align-left">
          © 2020 CENTRAL NEWS. Sva prava zadržana. <br>
          <div class="divider-15"></div>
        </div>
        <div class="col-sm-6 align-right">
          <a href="" target="_blank" class="link-footer">Design &amp; development by Dragutin Avdalovic</a>
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
        categoryFinalSketch: ["vijesti","intervju", "kultura", "sport", "zabava", "zdravljeiljepota", "vrijeme", "ostalo"],
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
        this.categories = await this.$axios.$get('http://178.62.199.187/wp-json/wp/v2/categories?per_page=100');
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
        console.log(this.categoryFinal);
      },
      goTo(string) {
        this.$router.push({name: string});
      },
      goHome() {
        this.$router.push('/');
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
  /** footer ********************************************************************/
  .footer-cnt {
   text-align: center;
  }
  .footer {
    background: #142850;
  }

  .footer-inner {
    max-width: 1140px;
    margin: auto;
    padding: 40px 15px 15px 15px;
    font-family: 'Roboto', Arial;
    font-size: 14px;
    color: #999;
  }

  .footer-inner .title{
    font-size: 16px;
    line-height: 20px;
    text-transform: uppercase;
    font-family: 'Roboto', Arial;
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
  /* end social feed */

</style>
