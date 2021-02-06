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
        <div class="news"  v-if="!loading">
          <div class="grid-wrapper">
            <div class="grid-container">
              <div class="" v-for="post in posts" v-bind:key="post.slug" v-bind:class="[post.isFirst ? 'box-one' : '', 'blog-post-small']">
                <div class="main-container">
                  <img class="thumb-img" v-bind:src="post.featured_image_url" @click="visitPost(post.slug)"/>
                  <div class="content">
                    <div class="category">
                      <span :id="'cat' + index" class="cat" v-if="post.hasCat" v-for="(catName,index) in post.catnames">{{catName}}</span>
                    </div>
                    <div class="title" @click="visitPost(post.slug)">
                      <h3>{{post.title.rendered}}</h3>
                    </div>
                  </div>
                </div>
                <div class="blog-post-small-inner">
                  <div class="post-footer">
                    <div class="metadata">
                      <div class="created_at">
                        <img src="../static/calendar.svg"/>
                        {{$moment(post.date).format("DD.MM.YYYY HH:mm")}}
                      </div>
                    </div>
                    <div class="read-more" @click="visitPost(post.slug)">
                      <a @click="visitPost(post.slug)">
                        <span class="read">Pročitaj </span><i class="fa fa-angle-right"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div class="page-nav">
          <div class="button" v-on:click="switchPage(currentPage-1)"><i class="fa fa-chevron-left" aria-hidden="true"></i> </div>
          <div class="button" v-bind:class="firstPage===currentPage ? 'active' : ''" v-on:click="switchPage(firstPage)">{{firstPage}}</div>
          <div class="button" v-bind:class="secondPage===currentPage ? 'active' : ''" v-on:click="switchPage(secondPage)">{{secondPage}}</div>
          <div class="button">...</div>
          <div class="button" v-bind:class="endPage===currentPage ? 'active' : ''" v-on:click="switchPage(endPage)">{{endPage}}</div>
          <div class="button" v-on:click="switchPage(currentPage+1)"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>
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
      loader: 'bars',
      currentPage: 1,
      totalPosts: 0,
      numPages: 0,
      perPage: 15,
      firstPage: 0,
      secondPage: 0,
      endPage: 0,
      separatedTag: {}
    }
  },
  components: {
    Loading,
    LatestNews
  },
  methods: {
    removeClasses() {
      var elements = document.querySelectorAll('.button');
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('active');
      }
    },
    async getNumOfPages() {
      this.totalPosts = await this.$axios.$get('https://admincentralnews.xyz/wp-json/wp/v2/total_posts');
      let chunk = this.totalPosts%this.perPage;
      let num = Math.ceil(this.totalPosts/this.perPage);
      if( chunk - num === 0) {
        this.numPages = Math.floor(chunk);
      } else {
        this.numPages = num;
      }
      this.firstPage = 1;
      this.secondPage = 2;
      this.endPage = this.numPages;
    },
    switchPage(pageNum) {
      if(pageNum > this.numPages - 3) {
        this.firstPage = this.numPages - 2;
        this.secondPage = this.numPages - 1;
        this.endPage = this.numPages;
      } else if (pageNum === 0){
        this.firstPage = 1;
        this.secondPage = 2;
        this.endPage = this.numPages;
      }else {
        this.firstPage = pageNum;
        this.secondPage = pageNum + 1;
        this.endPage = this.numPages;
      }
      this.fetchData(pageNum);
      this.onLangsPageChange();
    },
    async fetchData(pageNum) {
      if(pageNum < 1 || pageNum > this.numPages) {
        return;
      }
      this.currentPage = pageNum;
      this.posts = null;
      this.tags = null;
      this.categories = null;
      this.posts = await this.$axios.$get('https://admincentralnews.xyz/wp-json/wp/v2/posts?per_page=' + this.perPage + '&page=' + pageNum);
      this.tags = await this.$axios.$get('https://admincentralnews.xyz/wp-json/wp/v2/tags?per_page=100');
      this.categories = await this.$axios.$get('https://admincentralnews.xyz/wp-json/wp/v2/categories?per_page=100');
      this.posts.forEach((post) => {
        let tagnames = [];
        let catnames = [];
        let catslugs = [];
        post.isFirst = false;
        if(post.tags.length !== 0){
          post.tags.forEach((tagNum) => {
            if(tagNum !== undefined) {
              this.tags.forEach((tag) => {
                post.hasTag = true;
                if(String(tag.id) === String(tagNum)) {
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
          tagnames = [];
          post.tagnames = [];
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
        post.tags.forEach((tag) => {
          if(String(tag) === String('1695')) {
            post.isFirst = true;
          }
        });
      });
      this.loading = false;
    },
    visitPost(slug) {
      this.$router.replace('/vijest/' + slug);
    },
    visitCat(category) {
      this.$router.replace(category);
    },
    onLangsPageChange() {
      window.scrollTo(0, 0);
    }
  },
  created(){
    this.getNumOfPages().then(() => {
      this.fetchData(this.currentPage);
    });
  }
}
</script>

<style>
  @media (min-width: 1024px) {
    .box-one {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 3;
      margin: 0 !important;
    }
    .box-one .thumb-img {
      max-height: unset !important;
      max-width: unset !important;
    }
    .box-one .blog-post-small-inner {
      max-width: unset !important;
    }
  }
  @media (max-width: 1024px) {
    .box-one {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 1;
      margin: auto;
    }
    .box-one .thumb-img {
    }
    .box-one .blog-post-small-inner {
    }
  }
  .grid-wrapper {
    min-height: 100vh;
  }
  .main-container {
    position: relative;
  }
  .news-slot {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background: white;
  }
  .news {
    position: relative;
  }
  .latest-news-slot {
    background: white;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  @media (max-width: 767px) {
    .latest-news-slot {
      margin-top: 20px;
    }
  }
  .grid-container {
    align-self: start;
    justify-self: center;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5px;
    grid-auto-rows: minmax(100px, auto);
    padding: 5px;
  }
  @media (max-width: 1024px) {
    .grid-container {
      display: grid;
      max-width: unset;
      grid-template-columns: repeat(2, 1fr) !important;
      grid-gap: 5px;
      grid-auto-rows: minmax(100px, auto);
    }
  }
  @media (max-width: 768px) {
    .box-one {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 1;
      margin: auto;
    }
    .grid-container {
      display: grid;
      max-width: unset;
      grid-template-columns: repeat(1, 1fr) !important;
      grid-gap: 10px;
      grid-auto-rows: minmax(100px, auto);
    }
  }
  @media (max-width: 688px) {
    .box-one {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 1;
      margin: auto;
    }
    .grid-container {
      display: grid;
      max-width: unset;
      grid-template-columns: repeat(1, 1fr) !important;
      grid-gap: 10px;
      grid-auto-rows: minmax(100px, auto);
    }
  }
  .blog-post-small {
    width: auto;
    margin: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .blog-post-small .thumb-img {
    width: 100%;
    height: auto;
    max-width: 220px;
    min-height: 135px;
    max-height: 135px;
    cursor: pointer;
    transform-origin: 50 50;
    transition: transform .5s, visibility .5s ease-in;
    z-index: 1;
  }
  .blog-post-small .thumb-img:hover {
    transform: scale(1.1);
  }
  @media (max-width: 2400px) {
    .blog-post-small .thumb-img {
      max-width: 300px;
      min-height: 200px;
      max-height: 200px;
    }
  }
  @media (max-width: 2400px) {
    .blog-post-small .thumb-img {
      max-width: 300px;
      min-height: 200px;
      max-height: 200px;
    }
  }
  @media (max-width: 1024px) {
    .blog-post-small .thumb-img {
      max-width: 300px;
      min-height: 135px;
      max-height: 135px;
    }
  }
  @media (max-width: 568px) {
    .blog-post-small .thumb-img {
      max-width: 200px;
      min-width: 155px;
      min-height: 125px;
      max-height: 125px;
    }
    .box-one .thumb-img {
      max-height: unset !important;
      max-width: unset !important;
    }
  }
  @media (max-width: 300px) {
    .blog-post-small .thumb-img {
      max-width: 200px;
      min-width: 155px;
      min-height: 125px;
      max-height: 125px;
    }
  }
  .blog-post-small .blog-post-small-inner {
    width: 100%;
    background: #8C8C86  0 0 no-repeat padding-box;
    color: #2b2b2b;
    cursor: pointer;
    z-index: 1;
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
      max-width: 330px;
    }
  }
  @media (max-width: 340px) {
    .blog-post-small .blog-post-small-inner {
      max-width: 300px;
    }
  }
  .blog-post-small .content .title:hover {
    color: #00c834;
  }
  .blog-post-small .content .title h3:hover {
    color: #00c834
  }
  .blog-post-small .blog-post-small-inner .read-more a:hover {
    color: #fff !important;
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
    margin-right: 3px;
    width: 14px;
    height: 14px;
    margin-bottom: 2px;
    filter: invert(100%);
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
    .page-nav {
      width: 100% !important;
      text-align: center !important;
      position: relative !important;
      bottom:  0 !important;
    }
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
    z-index: 10;
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
    margin-bottom: 2px;
    padding: 4px;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 11px;
    cursor: pointer;
    font-weight: 700;
    margin-right: 2px;
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
    margin-left: 3px;
    margin-bottom: 2px;
  }
  .blog-post-small .blog-post-small-inner .post-footer .read-more a .read {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
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
    transition: opacity 0.5s;
  }
  .page-enter, .page-leave-active {
    opacity: 0;
  }
  .page-nav {
    width: 100%;
    text-align: center;
    padding: 10px 0;
}
.button {
  display: inline-block;
  border: 1px solid #00c834;
  color: #00c834;;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 2px;
}

.button:hover {
  background-color: #00c834;
  border: 1px solid white;
  color: white;
  cursor: pointer;
}
  @media (max-width: 768px) {
    .button:hover {
      background-color: #dae1e7;
      border: 1px solid #00c834;
      color: #00c834;;
    }
  }
.active {
  background-color: #00c834;
  border: 1px solid white;
  color: white;
  cursor: pointer;
}
</style>
