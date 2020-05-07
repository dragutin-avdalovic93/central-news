<template>
      <div class="news-slot">
        <loading :active.sync="loading"
                 :can-cancel="false"
                 :is-full-page="true"
                 :color="color"
                 :width="width"
                 :height="height"
                 :loader="loader"
        ></loading>
        <div class="grid-container" v-if="!loading">
        <div class="blog-post-small" v-for="post in posts" v-bind:key="post.id">
          <div class="main-container">
            <img class="thumb-img" v-bind:src="post.featured_image_url" @click="visitPost(post.id)"/>
            <div class="content">
              <div class="category">
                <span :id="'cat' + index" class="cat" v-if="post.hasCat" v-for="(catName,index) in post.catnames">{{catName}}</span>
              </div>
              <div class="title" @click="visitPost(post.id)">
                <h3>{{post.title.rendered}}</h3>
              </div>
            </div>
          </div>
          <div class="blog-post-small-inner">
            <div class="post-footer">
              <div class="metadata">
                <div class="created_at">
                  <img src="../static/calendar.svg"/>
                  {{post.date.split('T')[0]}}
                </div>
              </div>
              <div class="read-more" @click="visitPost(post.id)">
                <a @click="visitPost(post.id)">
                  <span class="read">Pročitaj </span><i class="fa fa-angle-right"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Loading from 'vue-loading-overlay';
  import LatestNews from '../components/LatestNews'
export default {
  name: 'Blog',
  layout: 'blog',
  data() {
    return {
      posts: [],
      tags: [],
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
    async fetchData() {
      this.posts = await this.$axios.$get('http://178.62.199.187/wp-json/wp/v2/posts?per_page=100');
      this.tags = await this.$axios.$get('http://178.62.199.187/wp-json/wp/v2/tags?per_page=100');
      this.categories = await this.$axios.$get('http://178.62.199.187/wp-json/wp/v2/categories?per_page=100');
      this.posts.forEach((post) => {
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
    },
    visitPost(id) {
      this.$router.replace('/post/' + id);
    },
    onLangsPageChange() {
      window.scrollTo(0, 0);
    }
  },
  created(){
    this.fetchData();
  }
}
</script>

<style>
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
  .grid-container {
    align-self: start;
    justify-self: center;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px;
    grid-auto-rows: minmax(100px, auto);
    padding: 5px;
  }
  @media (max-width: 1024px) {
    .grid-container {
      display: grid;
      max-width: unset;
      grid-template-columns: repeat(2, 1fr) !important;
      grid-gap: 20px;
      grid-auto-rows: minmax(100px, auto);
    }
  }
  @media (max-width: 768px) {
    .grid-container {
      display: grid;
      max-width: unset;
      grid-template-columns: repeat(2, 1fr) !important;
      grid-gap: 20px;
      grid-auto-rows: minmax(100px, auto);
    }
  }
  @media (max-width: 688px) {
    .grid-container {
      display: grid;
      max-width: unset;
      grid-template-columns: repeat(1, 1fr) !important;
      grid-gap: 20px;
      grid-auto-rows: minmax(100px, auto);
    }
  }
  .blog-post-small {
    width: auto;
    margin: auto;
    display: flex;
    flex-direction: column;
  }
  .blog-post-small .thumb-img {
    width: 100%;
    height: auto;
    max-width: 220px;
    min-height: 135px;
    max-height: 135px;
    cursor: pointer;
  }
  @media (max-width: 2400px) {
    .blog-post-small .thumb-img {
      max-width: 220px;
      min-height: 135px;
      max-height: 135px;
    }
  }
  @media (max-width: 2400px) {
    .blog-post-small .thumb-img {
      max-width: 220px;
      min-height: 135px;
      max-height: 135px;
    }
  }
  @media (max-width: 1024px) {
    .blog-post-small .thumb-img {
      max-width: 300px;
      min-height: 200px;
      max-height: 200px;
    }
  }
  @media (max-width: 568px) {
    .blog-post-small .thumb-img {
      max-width: 300px;
      min-height: 200px;
      max-height: 200px;
    }
  }
  @media (max-width: 300px) {
    .blog-post-small .thumb-img {
      max-width: 290px;
      min-height: 200px;
      max-height: 200px;
    }
  }
  .blog-post-small .blog-post-small-inner {
    width: 100%;
    background: #8C8C86  0 0 no-repeat padding-box;
    color: #2b2b2b;
    cursor: pointer;
  }
  @media (max-width: 2400px) {
    .blog-post-small .blog-post-small-inner {
      max-width: 300px;
    }
  }
  @media (max-width: 2400px) {
    .blog-post-small .blog-post-small-inner {
      max-width: 300px;
    }
  }
  @media (max-width: 1024px) {
    .blog-post-small .blog-post-small-inner {
      max-width: 450px;
    }
  }
  @media (max-width: 568px) {
    .blog-post-small .blog-post-small-inner {
      max-width: 300px;
    }
  }
  @media (max-width: 340px) {
    .blog-post-small .blog-post-small-inner {
      max-width: 300px;
    }
  }
  .blog-post-small .content .title:hover {
    color: #12cead;
  }
  .blog-post-small .content .title h3:hover {
    color: #12cead;
  }
  .blog-post-small .blog-post-small-inner .read-more a:hover {
    color: #12cead !important;
  }
  .blog-post-small .main-container .content .category .cat:hover {
    color: #000 !important;
  }
  .blog-post-small .content {
    transition: color 300ms ease-in-out;
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    padding: 0 10px;
  }
  .blog-post-small .metadata {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0;
  }
  .blog-post-small .metadata .created_at {
    display: flex;
    align-items: center;
    font-size: 12px;
    text-align: left;
    letter-spacing: 0;
    font-weight: 600;
    color: #dae1e7;
    opacity: 1;
    transition: all 200ms ease-in-out;
  }
  .blog-post-small .metadata .created_at img {
    margin-right: 10px;
    width: 14px;
    height: 14px;
    margin-bottom: 2px;
  }
  .blog-post-small .content .excerpt-container {
    max-height: 90px;
    min-height: 90px;
  }
  @media (max-width: 1024px) {
    .blog-post-small .content .excerpt-container {
      max-height: 85px;
      min-height: 85px;
    }
  }
  .blog-post-small .content .title {
    align-items: flex-start;
    justify-content: flex-start;
    display: flex;
    max-height: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 70px;
    margin-top: 0;
    background-color: rgba(20,40,80,0.65);
    transition: all 200ms ease-in-out;
    cursor: pointer;
  }
  .blog-post-small .content .title h3 {
    overflow: hidden;
    line-height: 1.3;
    font-size: 18px !important;
    font-weight: 900;
    letter-spacing: 0;
    color: #fff;
    text-overflow: ellipsis;
    cursor: pointer;
    text-align: center;
    margin: 0;
  }
  .blog-post-small .content .description {
    transition: all 200ms ease-in-out;
    padding-bottom: 7px;
    margin-bottom: 0;
    overflow: hidden;
    text-overflow: clip;
    max-height: 80px;
    min-height: 80px;
    font-size: 14px;
    text-align: justify;
  }
  @media (max-width: 1024px) {
    .blog-post-small .content .description {
      max-height: 80px;
      min-height: 80px;
    }
  }
  .blog-post-small .content .description p {
    text-align: left;
    opacity: 1;
    max-height: 78px;
    min-height: 78px;
    color: black !important;
  }
  @media (max-width: 1024px) {
    .blog-post-small .content .description p {
      max-height: 70px;
      min-height: 70px;
    }
  }
  .blog-post-small .blog-post-small-inner .post-footer {
    border-top: 2px solid rgba(139, 139, 139, 0.5);
    transition: all 300ms ease-in-out;
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
  }
  .blog-post-small  .main-container .content .category{
    transition: all 200ms ease-in-out;
    text-align: left;
    letter-spacing: 0;
    color: #fff;
    opacity: 1;
    text-decoration: none;
    display: flex;
    flex-wrap: wrap;
    max-height: 60px;
  }
  .blog-post-small .main-container .content .category .cat {
    background: #00c834;
    margin-bottom: 5px;
    padding: 5px;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 12px;
    cursor: pointer;
    font-weight: 700;
    margin-right: 5px;
  }
  .blog-post-small .blog-post-small-inner .post-footer .read-more a {
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
  .blog-post-small .blog-post-small-inner .post-footer .read-more a i {
    font-size: 18px;
    opacity: 0.8;
    margin-left: 5px;
    margin-bottom: 2px;
  }
  .blog-post-small .blog-post-small-inner .post-footer .read-more a .read {
    font-size: 14px;
    font-weight: 600;
  }
  .blog-post-small .blog-post-small-inner .post-footer .shares {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .blog-post-small .blog-post-small-inner .post-footer .shares img {
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
