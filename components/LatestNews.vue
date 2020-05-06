<template>
  <div class="lat-news">
    <div class="news-section-name">Najnovije vijesti</div>
    <div class="row" v-for="post in latestPosts">
      <div class="col-4 news-section-col-image">
        <div class="news-background-image" :style="'background-image: url(' + post.featured_image_url + ');'">
          <a href=""><div class="news-background-image-space-70 show-loader"></div></a>
          <a href="">
            <div class="news-section-category-badge show-loader" v-if="post.hasCat">{{post.catnames[0]}}</div>
            <div class="news-section-category-badge show-loader" v-else-if="!post.hasCat">Ostalo</div>
          </a>
        </div>
      </div>
      <div class="col-8">
        <a :href="'/post/' + post.id" class="news-section-title show-loader">{{post.title.rendered}}</a>
        <div class="news-section-description" v-html="post.excerpt.rendered.substring(0,100)"></div>
        <div class="news-section-date"><i class="far fa-calendar"> </i> {{post.date.split('T')[0]}} <span>{{post.date.split('T')[1]}} </span></div>
      </div>
      <div class="news-section-divider"></div>
    </div>

    <!-- banner position 05 -->
<!--    <div><a href="https://www.princip.news/banner/statistics/72b32a1f754ba1c09b3695e0cb6cde7f" title="Zavod za zaposljavanje baner" target="_self"><img src="https://www.princip.news/uploads/zzrs_190421_214134_183.png" class="img-fluid" alt="Zavod za zaposljavanje baner"></a></div><div class="divider-15"></div><div><a href="https://www.princip.news/banner/statistics/d9d4f495e875a2e075a1a4a6e1b9770f" title="SKI centar Ravna planina" target="_blank"><img src="https://www.princip.news/uploads/banner_skicentarravnaplanina_181013_94511_613.png" class="img-fluid" alt="SKI centar Ravna planina"></a></div><div class="divider-15"></div><div><a href="https://www.princip.news/banner/statistics/67c6a1e7ce56d3d6fa748ab6d9af3fd7" title="Prestige Jahorina" target="_blank"><img src="https://www.princip.news/uploads/banner_webcamjahorinaprestige_181013_94549_942.png" class="img-fluid" alt="Prestige Jahorina"></a></div><div class="divider-15"></div><div><a href="https://www.princip.news/banner/statistics/c0c7c76d30bd3dcaefc96f40275bdc0a" title="Baner Drugarska prica" target="_self"><img src="https://www.princip.news/uploads/drugarska-prica_181230_222642_147.png" class="img-fluid" alt="Baner Drugarska prica"></a></div><div class="divider-15"></div><div><a href="https://www.princip.news/banner/statistics/7f39f8317fbdb1988ef4c628eba02591" title="Hercegovacka kuca" target="_self"><img src="https://www.princip.news/uploads/herzeghouse_190816_82157_824.jpg" class="img-fluid" alt="Hercegovacka kuca"></a></div><div class="divider-15"></div><div><a href="https://www.princip.news/banner/statistics/44f683a84163b3523afe57c2e008bc8c" title="Baner ZZZ RS novi" target="_self"><img src="https://www.princip.news/uploads/zzzrs-cir_190912_74822_787.gif" class="img-fluid" alt="Baner ZZZ RS novi"></a></div>                        &lt;!&ndash; end banner position 05 &ndash;&gt;-->

    <!-- poll -->
<!--    <div class="news-section-divider"></div>-->
<!--    <div class="poll-banner show-loader" onclick="location.href='https://www.princip.news/anketa'">-->
<!--      <div class="poll-banner-title">Anketa</div>-->
<!--      <div class="poll-banner-name">Da li ste zabrinuti zbog širenja korona virusa ?</div>-->
<!--      <div class="poll-banner-vote">Glasaj</div>-->
<!--    </div>-->
    <!-- end poll -->

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
</template>

<script>
  export default {
    name: 'LatestNews',
    props: {
    },
    data: function () {
      return {
        latestPosts: []
      }
    },
    methods: {
      async getLatestPosts() {
        this.latestPosts = await this.$axios.$get('http://178.62.199.187/wp-json/wp/v2/posts?per_page=5');
        this.tags = await this.$axios.$get('http://178.62.199.187/wp-json/wp/v2/tags?per_page=100');
        this.categories = await this.$axios.$get('http://178.62.199.187/wp-json/wp/v2/categories?per_page=100');
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
        console.log(this.latestPosts);
      },
      goHome() {
        this.$router.push('/');
      },
      visitPost(id) {
        this.$router.push('/post/' + id);
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
  .news-section-description {
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
