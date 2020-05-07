<template>
  <div class="container inner-content">
    <div class="row main-row">
      <div class="col-12 col-md-2 col-lg-2 banners">
        <div class="divider-15"></div>
        <div><a href="" title="Primjer reklame" target="_self"><img src="http://178.62.199.187/wp-content/uploads/2020/05/640x360.png" class="img-fluid" alt="Primjer reklame"></a></div>
        <div class="divider-15"></div>
        <div><a href="" title="Primjer reklame" target="_self"><img src="http://178.62.199.187/wp-content/uploads/2020/05/640x360.png" class="img-fluid" alt="Primjer reklame"></a></div>
        <div class="divider-15"></div>
      </div>
      <div class="col-12 col-md-6 col-lg-6 news-slot">
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
              <img class="thumb-img" v-bind:src="post.featured_image_url">
              <div class="blog-detail-post-inner">
                <div class="content">
                  <h2 class="title">
                    {{post.title.rendered}}
                  </h2>
                  <div class='excerpt-container'>
                    <p class="description" v-html="post.content.rendered"></p>
                  </div>
                </div>
                <div class="post-footer">
                  <div class="metadata">
                    <div class="created_at">
                      <img src="../../static/calendar.svg"/>
                      {{post.date.split('T')[0]}}
                    </div>
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
      <div class="col-12 col-md-3 col-lg-3 latest-news-slot"><LatestNews/></div>
      <div class="col-12 col-md-1 col-lg-1 banners-end">
        <div class="divider-15"></div>
        <div><a href="" title="Primjer reklame" target="_self"><img src="http://178.62.199.187/wp-content/uploads/2020/05/200x100.gif" class="img-fluid" alt="Primjer reklame"></a></div>
        <div class="divider-15"></div>
        <div><a href="" title="Primjer reklame" target="_self"><img src="http://178.62.199.187/wp-content/uploads/2020/05/200x100.gif" class="img-fluid" alt="Primjer reklame"></a></div>
        <div class="divider-15"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import Loading from 'vue-loading-overlay';
  import LatestNews from '../../components/LatestNews'
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
        this.$router.push('/').catch(err => {});
      },
      async fetchPost() {
        this.id = this.$route.params.id;
        this.post = await this.$axios.$get('http://178.62.199.187/wp-json/wp/v2/posts/' + this.id);
        this.loading = false;
      }
    },
    created() {
      this.fetchPost();
    }
  }
</script>

<style scoped>
  .main-row {
    margin: 0!important;
  }
  .divider-15 {
    height: 15px;
    clear: both;
  }
  .img-fluid {
    max-width: 100%;
    height: auto;
  }
  .banners {
    background: #dae1e7
  }
  @media (max-width: 1024px) {
    .banners {
      margin-bottom: 20px;
    }
  }
  .banners-end {
    background: #dae1e7;
  }
  @media (max-width: 1024px) {
    .banners-end {
      margin-bottom: 20px;
    }
  }
  @media (max-width: 1024px) {
    .img-fluid {
      width: 90%;
      margin:  0 5%;
      height: auto;
    }
  }
  .inner-content {
    padding: 20px 0;
  }
  .main-container {
    position: relative;
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
  @media (max-width: 768px) {
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
    margin: auto auto 20px auto;
    width: 98%;
  }
  .blog-detail-post {
    width: auto;
    margin: 15px auto auto auto;
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
  .blog-detail-post .post-footer .metadata .created_at {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    text-align: left;
    letter-spacing: 0;
    color: #4b4361;
    opacity: 1;
    transition: all 200ms ease-in-out;
  }
  .blog-detail-post .post-footer .metadata .created_at img {
    margin-right: 10px;
    width: 14px;
    height: 14px;
    margin-bottom: 2px;
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
    padding-bottom: 15px;
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
    transition: opacity 1s;
  }
  .page-enter, .page-leave-active {
    opacity: 0;
  }
</style>
