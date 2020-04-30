<template>
  <div class="bl">
      <div class="grid-container">
        <div class="blog-post-small" v-for="post in posts" v-bind:key="post.id">
          <img class="thumb-img" v-bind:src="post.featured_image_url" @click="visitPost(post.id)">
          <div class="blog-post-small-inner">
            <div class="content">
              <h2 class="title" @click="visitPost(post.id)">
                {{post.title.rendered}}
              </h2>
              <div class="metadata">
                <div class="created_at">
                  <img src="../static/calendar.svg"/>
                  {{post.date.split('T')[0]}}
                </div>
              </div>
              <div class='excerpt-container' @click="visitPost(post.id)">
                <p class="description" v-html="post.excerpt.rendered"></p>
              </div>
            </div>
            <div class="post-footer">
              <div class="category">
                {{post.tagname}}
              </div>
              <div class="read-more" @click="visitPost(post.id)">
                <a @click="visitPost(post.id)">
                  <span class="read">Pročitaj Više </span><i class="fa fa-angle-right"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  layout: 'blog',
  data() {
    return {
      posts: [],
      tags: []
    }
  },
  methods: {
      async fetchPosts() {
      this.posts = await this.$axios.$get('http://178.62.199.187/wp-json/wp/v2/posts?_embed');
      this.tags = await this.$axios.$get('http://178.62.199.187/wp-json/wp/v2/tags?_embed');
      this.posts.forEach((entry) => {
        console.log(entry);
        let tagname = '';
        if(entry.tags[0] !== undefined) {
          this.tags.forEach((tag) => {
            if(tag.id === entry.tags[0]) {
              tagname = tag.name;
              entry.tagname = tagname;
              console.log('tag', tagname);
            }
          });
        } else {
          tagname = '';
          entry.tagname = tagname;
        }
      });
    },
    visitPost(id) {
      this.$router.push('/post/' + id);
    },
    onLangsPageChange() {
      window.scrollTo(0, 0);
    }
  },
  created(){
    this.fetchPosts();
  }
}
</script>

<style>
  .bl {
    min-height: calc(100vh - 53px);
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    grid-auto-rows: minmax(100px, auto);
    padding: 10px 0;
  }
  @media (max-width: 1024px) {
    .grid-container {
      display: grid;
      max-width: unset;
      grid-template-columns: repeat(2, 1fr) !important;
      grid-gap: 20px;
      grid-auto-rows: minmax(100px, auto);
      padding: 10px;
    }
  }
  @media (max-width: 768px) {
    .grid-container {
      display: grid;
      max-width: unset;
      grid-template-columns: repeat(1, 1fr) !important;
      grid-gap: 20px;
      grid-auto-rows: minmax(100px, auto);
      padding: 20px;
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
    max-width: 377px;
    min-height: 200px;
    max-height: 200px;
    cursor: pointer;
  }
  @media (max-width: 2400px) {
    .blog-post-small .thumb-img {
      max-width: 390px;
      min-height: 200px;
      max-height: 200px;
    }
  }
  @media (max-width: 2400px) {
    .blog-post-small .thumb-img {
      max-width: 390px;
      min-height: 200px;
      max-height: 200px;
    }
  }
  @media (max-width: 1024px) {
    .blog-post-small .thumb-img {
      max-width: 450px;
      min-height: 200px;
      max-height: 200px;
    }
  }
  @media (max-width: 568px) {
    .blog-post-small .thumb-img {
      max-width: 340px;
      min-height: 200px;
      max-height: 200px;
    }
  }
  @media (max-width: 340px) {
    .blog-post-small .thumb-img {
      max-width: 290px;
      min-height: 200px;
      max-height: 200px;
    }
  }
  .blog-post-small .blog-post-small-inner {
    width: 100%;
    background: #fff 0 0 no-repeat padding-box;
    color: #2b2b2b;
    cursor: pointer;
    padding: 5px;
  }
  @media (max-width: 2400px) {
    .blog-post-small .blog-post-small-inner {
      max-width: 390px;
    }
  }
  @media (max-width: 2400px) {
    .blog-post-small .blog-post-small-inner {
      max-width: 390px;
    }
  }
  @media (max-width: 1024px) {
    .blog-post-small .blog-post-small-inner {
      max-width: 450px;
    }
  }
  @media (max-width: 568px) {
    .blog-post-small .blog-post-small-inner {
      max-width: 340px;
    }
  }
  @media (max-width: 340px) {
    .blog-post-small .blog-post-small-inner {
      max-width: 290px;
    }
  }
  .blog-post-small .blog-post-small-inner .content .title:hover {
    color: #0ddac2;
  }
  .blog-post-small .blog-post-small-inner  .post-footer .read-more a:hover {
    color: #0ddac2;
  }
  .blog-post-small .blog-post-small-inner  .post-footer .category:hover {
    color: #7f828b;
  }
  .blog-post-small .blog-post-small-inner .content {
    transition: color 300ms ease-in-out;
    padding: 0 0 0 0 !important;
  }
  .blog-post-small .blog-post-small-inner .content .metadata {
    display: flex;
    justify-content: space-between;
    padding-bottom: 25px;
  }
  .blog-post-small .blog-post-small-inner .content .metadata .created_at {
    display: flex;
    align-items: center;
    font-size: 12px;
    text-align: left;
    letter-spacing: 0;
    color: #4b4361;
    opacity: 1;
    transition: all 200ms ease-in-out;
  }
  .blog-post-small .blog-post-small-inner .content .metadata .created_at img {
    margin-right: 10px;
    width: 14px;
    height: 14px;
    margin-bottom: 2px;
  }
  .blog-post-small .blog-post-small-inner .content .excerpt-container {
    max-height: 90px;
    min-height: 90px;
  }
  @media (max-width: 1024px) {
    .blog-post-small .blog-post-small-inner .content .excerpt-container {
      max-height: 85px;
      min-height: 85px;
    }
  }
  .blog-post-small .blog-post-small-inner .content .title {
    max-height: 70px;
    overflow: hidden;
    min-height: 70px;
    margin-top: 15px;
    line-height: 1.3;
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    letter-spacing: 0;
    color: #423b57;
    opacity: 1;
    transition: all 200ms ease-in-out;
    text-overflow: ellipsis;
  }
  .blog-post-small .blog-post-small-inner .content .description {
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
    .blog-post-small .blog-post-small-inner .content .description {
      max-height: 80px;
      min-height: 80px;
    }
  }
  .blog-post-small .blog-post-small-inner .content .description p {
    text-align: left;
    opacity: 1;
    max-height: 78px;
    min-height: 78px;
    color: black !important;
  }
  @media (max-width: 1024px) {
    .blog-post-small .blog-post-small-inner .content .description p {
      max-height: 70px;
      min-height: 70px;
    }
  }
  .blog-post-small .blog-post-small-inner .post-footer {
    border-top: 2px solid rgba(139, 139, 139, 0.5);
    transition: all 300ms ease-in-out;
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
  }
  .blog-post-small .blog-post-small-inner .post-footer .category{
    transition: all 200ms ease-in-out;
    font-size: 14px !important;
    text-align: left;
    letter-spacing: 0;
    color: #12cead;
    opacity: 1;
    text-decoration: none;
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
  }
  .blog-post-small .blog-post-small-inner .post-footer .read-more a .read {
    font-size: 14px;
    font-weight: 400;
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
</style>
