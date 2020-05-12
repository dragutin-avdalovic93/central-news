<template>
      <div class="news-slot">
        <div class="parent">
          <loading :active.sync="loading"
                   :can-cancel="false"
                   :is-full-page="true"
                   :color="color"
                   :width="width"
                   :height="height"
                   :loader="loader"
          ></loading>
          <div class="article" v-if="!loading">
            <div class="blog-detail-post">
              <div class="social">
                <social-sharing :url="'https://www.centralnews.live/vijest/' + post[0].slug"
                                :title="post[0].title['rendered']"
                                :description="post[0].content['rendered']"
                                :quote="post[0].excerpt['rendered']"
                                hashtags=""
                                twitter-user=""
                                inline-template>
                  <div class="row handler-row">
                    <div class="col-sm-12 col-12 col-lg-12 col-xl-12 col-xs-12 col-sm-12">
                    <network network="facebook">
                        <i class="fab fa-facebook"></i> Facebook
                      </network>
                    <network network="twitter">
                        <i class="fab fa-twitter"></i> Twitter
                      </network>
                    <network network="whatsapp">
                        <i class="fab fa-whatsapp"></i> Whatsapp
                      </network>
                    </div>
                  </div>
                </social-sharing>
              </div>
              <img class="thumb-img" v-bind:src="post[0].featured_image_url">
              <div class="blog-detail-post-inner">
                <div class="content">
                  <h2 class="title">
                    {{post[0].title["rendered"]}}
                  </h2>
                  <div class="created_at">
                    <img src="../../static/calendar.svg"/>
                    {{$moment(post[0].date).format("dddd, DD.MM.YYYY")}}
                  </div>
                  <div class='excerpt-container'>
                    <p class="description" v-html="post[0].content['rendered']"></p>
                  </div>
                </div>
                <div class="post-footer">
                  <div class="metadata">
                  </div>
                  <div class="read-more" @click="goBack">
                    <a @click="goBack">
                      <span class="read">Nazad</span><i class="fa fa-angle-left"/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
  import Loading from 'vue-loading-overlay';
  import LatestNews from '../../components/LatestNews';
  import moment from 'moment';
  export default {
    name: 'PostDetail',
    layout: 'blog',
    data() {
      return {
        post: {},
        id: "",
        loading: true,
        color: '#00909e',
        height: 128,
        width: 128,
        loader: 'bars'
      }
    },
    components: {
      Loading,
      LatestNews
    },
    methods: {
      goBack() {
        this.$router.replace('/');
      },
      async fetchPost() {
        this.slug = this.$route.params.slug;
        this.post = await this.$axios.$get('https://admincentralnews.xyz/wp-json/wp/v2/posts?slug=' + this.slug);
        console.log(this.post);
        this.loading = false;
      }
    },
    mounted() {
      this.fetchPost();
    }
  }
</script>

<style>
  .social {
    margin: 10px auto 10px 5px;
  }
  .social span {
    padding: 2px 4px;
    border-radius: 5px;
    margin: 5px;
    border: solid 1px #12cead;
    line-height: 2.5;
    color: #12cead;
    font-size: 14px;
    cursor: pointer;
    font-weight: 500;
  }
  .social span {
    outline: none !important;
  }
  .social span:hover {
    border: solid 1px white;
    color:white;
    background: #12cead;

  }
  .handler-row {
    text-align: center;
  }
  .news-slot {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 53px);
    background: #dae1e7;
  }
  .latest-news-slot {
    background: #dae1e7;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  @media (max-width: 767px) {
    .latest-news-slot {
      margin-top: 20px;
    }
  }
  .parent {
    min-height: calc(100vh - 53px);
    background: #dae1e7;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .article {
    margin: auto auto auto auto;
    width: 100%;
  }
  .blog-detail-post {
    width: auto;
    margin: auto auto auto auto;
    display: flex;
    flex-direction: column;
  }
  .blog-detail-post .thumb-img {
    width: 100%;
    height: auto;
    max-width: 377px;
    max-height: 228px;
  }
  @media (max-width: 2400px) {
    .blog-detail-post .thumb-img {
      max-width: 800px;
      margin: auto;
      max-height: 400px;
    }
  }
  @media (max-width: 2400px) {
    .blog-detail-post .thumb-img {
      max-width: 800px;
      margin: auto;
      max-height: 400px;
    }
  }
  @media (max-width: 1024px) {
    .blog-detail-post .thumb-img {
      max-width: 650px;
      margin: auto;
      max-height: 350px;
    }
  }
  @media (max-width: 568px) {
    .blog-detail-post .thumb-img {
      max-width: 450px;
      margin: auto;
      max-height: 350px;
    }
  }
  @media (max-width: 340px) {
    .blog-detail-post .thumb-img {
      max-width: 290px;
      margin: auto;
      max-height: 200px;
    }
  }
  .blog-detail-post .blog-detail-post-inner {
    background: #fff 0 0 no-repeat padding-box;
    color: #2b2b2b;
    cursor: pointer;
    padding: 5px;
  }
  @media (max-width: 2400px) {
    .blog-detail-post .blog-detail-post-inner {
      max-width: 800px;
      margin: auto;
    }
  }
  @media (max-width: 2400px) {
    .blog-detail-post .blog-detail-post-inner {
      max-width: 800px;
      margin: auto;
    }
  }
  @media (max-width: 1024px) {
    .blog-detail-post .blog-detail-post-inner {
      max-width: 650px;
      margin: auto;
    }
  }
  @media (max-width: 568px) {
    .blog-detail-post .blog-detail-post-inner {
      max-width: 450px;
      margin: auto;
    }
  }
  @media (max-width: 340px) {
    .blog-detail-post .blog-detail-post-inner {
      max-width: 290px;
      margin: auto;
    }
  }
  .blog-detail-post .blog-detail-post-inner .content {
    transition: color 300ms ease-in-out;
    padding: 0 0 0 0 !important;
  }
  .blog-detail-post .post-footer.metadata {
    display: flex;
    justify-content: space-between;
    padding-bottom: 25px;
  }
  .blog-detail-post .content .created_at {
    padding-bottom: 15px;
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    text-align: left;
    letter-spacing: 0;
    color: #999;
    opacity: 1;
    transition: all 200ms ease-in-out;
  }
  .blog-detail-post .content .created_at img {
    margin-right: 5px;
    width: 14px;
    height: 14px;
    margin-bottom: 2px;
    color: #999;
  }
  .blog-detail-post .blog-detail-post-inner .content .excerpt-container {
    min-height: 90px;
  }
  @media (max-width: 1024px) {
    .blog-detail-post .blog-detail-post-inner .content .excerpt-container {
      min-height: 85px;
    }
  }
  .blog-detail-post .blog-detail-post-inner .content .title {
    overflow: hidden;
    min-height: 70px;
    padding-top: 15px;
    margin: 0;
    line-height: 1.3;
    font-size: 26px;
    font-weight: 600;
    text-align: left;
    letter-spacing: 0;
    color: #000;
    opacity: 1;
    transition: all 200ms ease-in-out;
    text-overflow: ellipsis;
    padding-bottom: 10px;
  }
  .blog-detail-post .blog-detail-post-inner .content .description {
    transition: all 200ms ease-in-out;
    padding-bottom: 7px;
    overflow: hidden;
    text-overflow: clip;
    min-height: 78px;
    font-size: 14px;
    text-align: justify;
    margin: 0;
  }
  .blog-detail-post .blog-detail-post-inner .content .source {
    transition: all 200ms ease-in-out;
    padding-bottom: 7px;
    padding-top: 10px;
    overflow: hidden;
    text-overflow: clip;
    font-size: 12px;
    text-align: justify;
    font-weight: bold;
    margin: 0;
  }
  @media (max-width: 1024px) {
    .blog-detail-post .blog-detail-post-inner .content .description {
      min-height: 70px;
    }
  }
  .blog-detail-post .blog-detail-post-inner .content .description p {
    text-align: left;
    opacity: 1;
    min-height: 78px;
    color: black !important;
  }
  @media (max-width: 1024px) {
    .blog-detail-post .blog-detail-post-inner .content .description p {
      min-height: 70px;
    }
  }
  .blog-detail-post .blog-detail-post-inner .post-footer {
    border-top: 2px solid rgba(139, 139, 139, 0.5);
    transition: all 300ms ease-in-out;
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
  }
  .blog-detail-post .blog-detail-post-inner .post-footer .category{
    transition: all 200ms ease-in-out;
    font-size: 16px !important;
    text-align: left;
    letter-spacing: 0;
    color: #12cead;
    opacity: 1;
    text-decoration: none;
  }
  .blog-detail-post .blog-detail-post-inner .post-footer .read-more a {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 200ms ease-in-out;
    color: #2b2b2b;
    text-decoration: none;
    font-size: 14px !important;
    text-align: left;
    letter-spacing: 0;
    opacity: 1;
  }
  .blog-detail-post .blog-detail-post-inner .post-footer .read-more a i {
    font-size: 20px;
    margin-left: 5px;
    color: #2b2b2b;
  }
  .blog-detail-post .blog-detail-post-inner .post-footer .read-more a .read {
    font-size: 16px;
    font-weight: 400;
  }
  .blog-detail-post .blog-detail-post-inner .post-footer .shares {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .blog-detail-post .blog-detail-post-inner .post-footer .shares img {
    margin-left: 0.714rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  .page-enter-active, .page-leave-active {
    transition: opacity 0.5s;
  }
  .page-enter, .page-leave-active {
    opacity: 0;
  }
</style>
