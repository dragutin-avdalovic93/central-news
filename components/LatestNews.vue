<template>
  <div class="cont">
    <loading :active.sync="loading"
             :can-cancel="false"
             :is-full-page="true"
             :color="color"
             :width="width"
             :height="height"
             :loader="loader"
    ></loading>
    <div class="lat-news"  v-if="!loading">
      <div class="news-section-name">Najnovije vijesti</div>
      <div class="row" v-for="post in latestPosts">
        <div class="col-4 news-section-col-image">
          <div class="news-background-image" :style="'background-image: url(' + post.featured_image_url + ');'">
            <a :href="'/post/' + post.id"><div class="news-background-image-space-70 show-loader"></div></a>
            <a :href="'/post/' + post.id">
              <div class="news-section-category-badge show-loader" v-if="post.hasCat">{{post["catnames"][0]}}</div>
            </a>
          </div>
        </div>
        <div class="col-8">
          <a :href="'/post/' + post.id" class="news-section-title show-loader">{{post.title.rendered}}</a>
          <div class="news-section-description" v-html="post.excerpt.rendered.substring(0,100) + '...'"></div>
          <div class="news-section-date"><i class="far fa-calendar"> </i> {{post.date.split('T')[0]}} <span>{{post.date.split('T')[1]}} </span></div>
        </div>
        <div class="news-section-divider"></div>
      </div>

  <!--    <div class="news-section-divider"></div>-->
  <!--    <a href="https://www.princip.news/vijesti/istocno-sarajevo/mladen-savic-poklonio-portret-doktora-lazica-domu-zdravlja-u-istocnom-sarajevu" title="MLADEN SAVIĆ POKLONIO PORTRET DOKTORA LAZIĆA DOMU ZDRAVLJA U ISTOČNOM SARAJEVU" class="show-loader">-->
  <!--      <div class="news-main-background-image" style="background-image:url(https://www.princip.news/uploads/new_project_-_2020-05-05t142819_200505_124053_674.png); position: relative;">-->
  <!--        <div class="news-main-background-image-space-70"></div>-->
  <!--        <div class="news-main-category-badge show-loader" onclick="location.href='https://www.princip.news/vijesti/istocno-sarajevo/';return false;">Istočno Sarajevo</div>-->
  <!--        <div class="news-main-image-text-other">-->
  <!--          <div class="news-main-image-title">MLADEN SAVIĆ POKLONIO PORTRET DOKTORA LAZIĆA DOMU ZDRAVLJA U ISTOČNOM SARAJEVU</div>-->
  <!--          <div class="news-main-image-title-date">Utorak, 05.05.2020.</div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </a>-->
  <!--    <div class="divider-15"></div>-->

  <!--    <a href="https://www.princip.news/vijesti/republika-srpska/za&#45;&#45;ur-evdan-policijski-cas-pocinje-u-15-casova" title="ZA ĐURĐEVDAN POLICIJSKI ČAS POČINJE U 15 ČASOVA" class="show-loader">-->
  <!--      <div class="news-main-background-image" style="background-image:url(https://www.princip.news/uploads/new_project_43_i_200505_134502_722.png); position: relative;">-->
  <!--        <div class="news-main-background-image-space-70"></div>-->
  <!--        <div class="news-main-category-badge show-loader" onclick="location.href='https://www.princip.news/vijesti/republika-srpska/';return false;">Republika Srpska</div>-->
  <!--        <div class="news-main-image-text-other">-->
  <!--          <div class="news-main-image-title">ZA ĐURĐEVDAN POLICIJSKI ČAS POČINJE U 15 ČASOVA</div>-->
  <!--          <div class="news-main-image-title-date">Utorak, 05.05.2020.</div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </a>-->
  <!--    <div class="divider-15"></div>-->

  <!--    <a href="https://www.princip.news/vijesti/bih/ministar-kosarac-dosao-sam-cestitati-ro-endan-prijatelju" title="MINISTAR KOŠARAC: DOŠAO SAM ČESTITATI ROĐENDAN PRIJATELJU" class="show-loader">-->
  <!--      <div class="news-main-background-image" style="background-image:url(https://www.princip.news/uploads/k1_200505_71007_905.jpg); position: relative;">-->
  <!--        <div class="news-main-background-image-space-70"></div>-->
  <!--        <div class="news-main-category-badge show-loader" onclick="location.href='https://www.princip.news/vijesti/bih/';return false;">BIH</div>-->
  <!--        <div class="news-main-image-text-other">-->
  <!--          <div class="news-main-image-title">MINISTAR KOŠARAC: DOŠAO SAM ČESTITATI ROĐENDAN PRIJATELJU</div>-->
  <!--          <div class="news-main-image-title-date">Utorak, 05.05.2020.</div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </a>-->
  <!--    <div class="divider-15"></div>-->
    </div>
  </div>
</template>

<script>
  import  Loading from 'vue-loading-overlay';
  export default {
    name: 'LatestNews',
    props: {
    },
    data: function () {
      return {
        latestPosts: [],
        loading: true,
        color: '#00909e',
        height: 128,
        width: 128,
        loader: 'bars'
      }
    },
    components: {
      Loading
    },
    methods: {
      async getLatestPosts() {
        this.latestPosts = await this.$axios.$get('https://admincentralnews.xyz/wp-json/wp/v2/posts?per_page=5');
        this.tags = await this.$axios.$get('https://admincentralnews.xyz/wp/v2/tags?per_page=100');
        this.categories = await this.$axios.$get('https://admincentralnews.xyz/wp-json/wp/v2/categories?per_page=100');
        this.latestPosts.forEach((post) => {
          let tagnames = [];
          let catnames = [];
          let catslugs = [];
          if(post.tags.length !== 0){
            post.tags.forEach((tagNum) => {
              if(tagNum !== undefined) {
                this.tags.forEach((tag) => {
                  post.hasTag = true;
                  if(tag.id === tagNum) {
                    tagnames.push(tag.name);
                  }
                });
                post.tagnames = tagnames;
              } else {
                tagnames = [];
                post.tagnames = [];
              }
            });
          }else {
            post.hasTag = false;
          }
          if(post.categories.length !== 0){
            post.categories.forEach((catNum) => {
              if(catNum !== undefined) {
                post.hasCat = true;
                this.categories.forEach((cat) => {
                  if(cat.id === catNum) {
                    catnames.push(cat.name);
                    catslugs.push(cat.slug)
                  }
                });
                post.catnames = catnames;
                post.catslugs = catslugs;
              } else {
                catnames = [];
                catslugs = [];
                post.catnames = [];
                post.catslugs = [];
              }
            });
          }
          else {
            post.hasCat = false;
          }
        });
        this.loading = false;
        console.log(this.latestPosts);
      },
      goHome() {
        this.$router.replace('/');
      },
      visitPost(id) {
        this.$router.replace('/post/' + id);
      },
    },
    created(){
      this.getLatestPosts();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .lat-news
  {
    background: #dae1e7;
  }
  /* news section */
  .news-section-name {
    font-size: 24px;
    line-height: 40px;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    border-bottom: 3px solid #00c834;
    margin-bottom: 15px;
    padding: 5px;
  }

  .news-section-divider {
    height: 1px;
    width: 100%;
    background-color: #CCCED4;
    margin: 15px;
  }

  .news-section-col-image {
    padding-right: 0;
    position: relative;
  }

  .news-section-category {
    background-color: #00c834;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    padding: 3px 6px;
    margin-bottom: 5px;
    display: inline-block;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }

  .news-section-category:hover {
    background: rgba(0,0,0,.5);
    color: #fff;
  }

  .news-section-category-badge {
    position: absolute;
    top: 0;
    background-color: #00c834;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    padding: 3px 6px;
    display: inline-block;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }

  .news-section-category-badge:hover {
    background: rgba(0,0,0,.5);
    color: #fff;
  }

  .news-section-title {
    font-size: 14px;
    line-height: 16px;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
  }

  a.news-section-title:link    { color: #333333; text-decoration: none; font-size: 14px; line-height:16px; font-family: 'Roboto', sans-serif; font-weight: 700; display: block; text-transform: uppercase;}
  a.news-section-title:visited { color: #333333; text-decoration: none; font-size: 14px; line-height:16px; font-family: 'Roboto', sans-serif; font-weight: 700; display: block; text-transform: uppercase;}
  a.news-section-title:hover   { color: #7a0000; text-decoration: none; font-size: 14px; line-height:16px; font-family: 'Roboto', sans-serif; font-weight: 700; display: block; text-transform: uppercase;}
  a.news-section-title:active  { color: #7a0000; text-decoration: none; font-size: 14px; line-height:16px; font-family: 'Roboto', sans-serif; font-weight: 700; display: block; text-transform: uppercase;}

  a.news-section-title-second:link    { color: #333333; text-decoration: none; font-size: 16px; line-height:20px; font-family: 'Roboto', sans-serif; font-weight: 700; display: block; text-transform: uppercase;}
  a.news-section-title-second:visited { color: #333333; text-decoration: none; font-size: 16px; line-height:20px; font-family: 'Roboto', sans-serif; font-weight: 700; display: block; text-transform: uppercase;}
  a.news-section-title-second:hover   { color: #7a0000; text-decoration: none; font-size: 16px; line-height:20px; font-family: 'Roboto', sans-serif; font-weight: 700; display: block; text-transform: uppercase;}
  a.news-section-title-second:active  { color: #7a0000; text-decoration: none; font-size: 16px; line-height:20px; font-family: 'Roboto', sans-serif; font-weight: 700; display: block; text-transform: uppercase;}


  .news-section-description {
    font-size: 12px;
    line-height: 16px;
    color: #777;
    padding: 5px 0;
  }
  body > .news-section-description > p{
    margin-bottom: 0 !important;
  }

  .news-section-description-second {
    font-size: 14px;
    line-height: 20px;
    color: #444;
    padding: 5px 0;
  }

  .news-section-date {
    font-size: 12px;
    line-height: 14px;
    color: #333;
    font-weight: bold;
  }

  .news-section-date-second {
    font-size: 13px;
    line-height: 15px;
    color: #777;
    padding: 5px 0 0 0;
  }

  .news-view-title {
    font-size: 24px;
    line-height: 26px;
    padding-top: 10px;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
  }

  .news-view-info {
    font-size: 12px;
    color: #999;
    padding: 10px 0 15px 0;
  }

  .news-view-info-divider {
    padding: 0 10px;
  }

  .news-gallery-image {
    background-repeat: no-repeat !important;
    background-position: top center !important;
    background-size: cover;
  }

  .news-gallery-image-content{
    padding-bottom: 70%;
  }
  .news-background-image {
    background-repeat: no-repeat !important;
    background-position: center center;
    background-size: cover;
  }

  .news-background-image-space-70 {
    padding-top: 70%;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }

  .news-background-image-space-70:hover {
    background-image: linear-gradient(transparent,rgba(0,0,0,0.8));
  }


</style>
