<template>
  <div class="bl">
      <div class="grid-container">
        <div class="blog-post-small" v-for="blog in posts" v-bind:key="blog.id">
          <img class="thumb-img" v-bind:src="blog.image" @click="visitPost(blog.id)">
          <div class="blog-post-small-inner">
            <div class="content">
              <h2 class="title" @click="visitPost(blog.id)">
                {{blog.title}}
              </h2>
              <div class="metadata">
                <div class="created_at">
                  <img src="../static/calendar.svg"/>
                  {{blog.created}}
                </div>
              </div>
              <div class='excerpt-container' @click="visitPost(blog.id)">
                <p class="description">{{blog.description}}</p>
              </div>
            </div>
            <div class="post-footer">
              <div class="category">
                {{blog.tags[0]}},{{blog.tags[1]}}
              </div>
              <div class="read-more" @click="visitPost(blog.id)">
                <a href="" target="">
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
  import data from 'static/data.json'
export default {
  name: 'Blog',
  data () {
    return {
      posts: []
    }
  },
  methods: {
    visitPost(id) {
      this.$router.push('/post/' + id);
    },
    onLangsPageChange() {
      window.scrollTo(0, 0);
    }
  },
  created(){
    Object.assign(this.posts, data.posts);
  }
}
</script>

<style>
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
      padding: 10px 0;
    }
  }
  @media (max-width: 768px) {
    .grid-container {
      display: grid;
      max-width: unset;
      grid-template-columns: repeat(1, 1fr) !important;
      grid-gap: 20px;
      grid-auto-rows: minmax(100px, auto);
      padding: 10px 0;
    }
  }
  .blog-post-small {
    width: auto;
    margin: auto;
    display: flex;
    flex-direction: column;
    min-height: 200px;
  }
  .blog-post-small .thumb-img {
    width: 100%;
    height: auto;
    max-width: 377px;
    max-height: 228px;
  }
  @media (max-width: 2400px) {
    .blog-post-small .thumb-img {
      max-width: unset;
    }
  }
  @media (max-width: 2400px) {
    .blog-post-small .thumb-img {
      max-width: 390px;
    }
  }
  @media (max-width: 1024px) {
    .blog-post-small .thumb-img {
      max-width: 450px;
    }
  }
  @media (max-width: 568px) {
    .blog-post-small .thumb-img {
      max-width: 340px;
    }
  }
  @media (max-width: 340px) {
    .blog-post-small .thumb-img {
      max-width: 290px;
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
      max-width: unset;
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
  .blog-post-small .blog-post-small-inner:hover .content .title {
    color: #0ddac2;
  }
  .blog-post-small .blog-post-small-inner:hover .post-footer .read-more a {
    color: #0ddac2;
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
  .blog-post-small .blog-post-small-inner .content .title:hover {
    color: #12cead;
  }
  .blog-post-small .blog-post-small-inner .content .description {
    transition: all 200ms ease-in-out;
    padding-bottom: 7px;
    margin-bottom: 0;
    overflow: hidden;
    text-overflow: clip;
    max-height: 70px;
    min-height: 70px;
    font-size: 14px;
    text-align: justify;
  }
  @media (max-width: 1024px) {
    .blog-post-small .blog-post-small-inner .content .description {
      max-height: 70px;
      min-height: 70px;
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
  .blog-post-small .blog-post-small-inner .post-footer .read-more a:hover {
    color: #12cead;
  }
  .blog-post-small .blog-post-small-inner .post-footer .read-more a svg {
    height: 20px;
    width: 20px;
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
</style>
