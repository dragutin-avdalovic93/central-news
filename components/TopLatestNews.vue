<template>
  <div class="top-stories-bar">
    <div class="container">
      <div class="row top-stories-box clearfix">
        <div class="col-sm-auto">
          <div class="top-stories-label">
            <div class="top-stories-label-wrap">
              <span class="flash-icon"></span>
              <span class="label-txt">POSLEDNJE OBJAVE</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm top-stories-lists">
          <div class="row align-items-center">
            <div class="col">
              <div class="marquee">
                <div class="marquee__content">
                  <ul class="list-inline" v-for="post in posts">
                    <li><a @click="goTo(post.id)">{{post.title.rendered}}</a></li>
                  </ul>
                </div>
              </div>
            </div><!-- .col -->
          </div><!-- .row .align-items-center -->
        </div><!-- .col-12 .col-sm .top-stories-lists -->
      </div><!-- .row .top-stories-box -->
    </div><!-- .container -->
  </div>
</template>

<script>
  export default {
    name: 'TopLatestNews',
    props: {
    },
    components: {
    },
    data: function () {
      return {
        posts: []
      }
    },
    methods: {
      async fetchPosts() {
        this.posts = await this.$axios.$get('http://178.62.199.187/wp-json/wp/v2/posts?_embed');
      },
      goHome() {
        this.$router.push('/');
      },
      goTo(id) {
        this.$router.push('/post/' + id);
      }
    },
    created(){
      this.fetchPosts();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .marquee {
    margin: 0 auto;
    width: 600px;
    height: 30px;
    white-space: nowrap;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
  }
  .marquee:before, .marquee:after {
    position: absolute;
    top: 0;
    width: 50px;
    height: 30px;
    content: "";
    z-index: 1;
  }
  .marquee:before {
    left: 0;
  }
  .marquee:after {
    right: 0;
  }
  .marquee__content {
    width: 300%;
    display: flex;
    line-height: 30px;
    animation: marquee 15s linear infinite forwards;
  }
  .marquee__content:hover {
    animation-play-state: paused;
  }
  .list-inline {
    display: flex;
    justify-content: space-around;
    width: 100%;
    cursor: pointer;
    /* reset list */
    list-style: none;
    padding: 0;
    margin: 0;
  }
  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-66.6%);
    }
  }
  /*--------------------------------------------------------------
## Top Stories
--------------------------------------------------------------*/
  .top-stories-bar {
    background-color: #ffffff;
    position: relative;
    overflow: hidden;
    font-weight: 700;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.07);
    -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.07);
    -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.07);
  }
  .top-stories-bar:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 50%;
    background-color: #dae1e7;
  }
  .top-stories-bar {
    height: 50px;
  }
  .top-stories-bar .top-stories-label {
    float: left;
    color: #333333;
    padding-left: 15px;
    margin-left: -15px;
    margin-right: -15px;
    background-color: #dae1e7;
    position: relative;
    height: 100%;
    display: table;
  }
  .top-stories-bar .top-stories-label:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: -19%;
    width: 39%;
    background-color: #dae1e7;
    transform: skew(20deg);
    -webkit-transform: skew(20deg);
    -moz-transform: skew(20deg);
    -ms-transform: skew(20deg);
    z-index: 1;
  }
  .top-stories-bar .top-stories-label .top-stories-label-wrap {
    position: relative;
    display: table;
    height: 100%;
    padding: 10px 0 10px 35px;
  }
  .top-stories-bar .top-stories-label .label-txt{
    position: relative;
    z-index: 2;
    display: table-cell;
    height: 30px;
    vertical-align: middle;
    font-size: 18px;
    cursor: pointer;
  }
  .top-stories-bar .top-stories-label .flash-icon {
    position: absolute;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    background-color: #00c834;
    top: 50%;
    margin-top: -5px;
    left: 10px;
    z-index: 2;
  }
  .top-stories-bar .top-stories-label .flash-icon:before {
    content: "";
    position: absolute;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border: 1px solid #00c834;
    top: 50%;
    margin-top: -5px;
    left: 50%;
    margin-left: -5px;
    animation-name: blink-a;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
  @keyframes blink-a {
    0%   {transform: scale(1, 1);}
    100%  {transform: scale(3, 3); opacity: 0;}
  }
  .top-stories-bar .top-stories-label .flash-icon:after {
    content: "";
    position: absolute;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border: 1px solid #00c834;
    top: 50%;
    margin-top: -5px;
    left: 50%;
    margin-left: -5px;
    animation-name: blink-b;
    animation-duration: 2s;
    animation-delay: 1s;
    animation-iteration-count: infinite;
  }
  @keyframes blink-b {
    0%   {transform: scale(1, 1);}
    100%  {transform: scale(3, 3); opacity: 0;}
  }
  .top-stories-bar .top-stories-lists {
    display: block;
    margin-bottom: 0;
    position: relative;
    overflow: hidden;
    padding-left: 0;
    background-color: #ffffff;
    height: 50px;
  }
  .top-stories-bar .top-stories-lists .row {
    height: 50px;
  }
  .top-stories-bar .js-marquee {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    height: 50px;
  }
  .top-stories-bar .top-stories-lists .marquee {
    width: 100%;
    overflow: hidden;
    height: 50px;
  }
  .top-stories-bar .top-stories-lists .marquee a {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-left: 50px;
    color: #333333;
    height: 50px;
  }
  .top-stories-bar .top-stories-lists .marquee a:hover {
    color: #00c834;
  }
  .top-stories-bar .top-stories-lists:after {
    content: "";
    position: absolute;
    top: 0;
    right: 15px;
    bottom: 0;
    width: 40px;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0), #ffffff);
  }
  /*--------------------------------------------------------------
# Media Queries
--------------------------------------------------------------*/
  @media (max-width: 1199px) {
    h1 {
      font-size: 36px;
    }
    h2 {
      font-size: 30px;
    }
    h3 {
      font-size: 26px;
    }
    h4 {
      font-size: 22px;
    }
    h5 {
      font-size: 18px;
    }
    h6 {
      font-size: 16px;
    }
  }

  @media (max-width: 991px) {
  }

  @media (max-width: 767px) {
    h1 {
      font-size: 32px;
    }
    h2 {
      font-size: 28px;
    }
    h3 {
      font-size: 25px;
    }
    h4 {
      font-size: 22px;
    }
    h5 {
      font-size: 19px;
    }
    h6 {
      font-size: 16px;
    }
    .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
      margin-bottom: 15px;
    }
    .container {
      padding-left: 20px;
      padding-right: 20px;
    }
    a {
      font-size: 15px;
    }
  }

  @media (max-width: 575px) {
    h1 {
      font-size: 28px;
    }
    h2 {
      font-size: 25px;
    }
    h3 {
      font-size: 23px;
    }
    h4 {
      font-size: 20px;
    }
    h5 {
      font-size: 18px;
    }
    h6 {
      font-size: 16px;
    }
    .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
      margin-bottom: 10px;
    }
    .container {
      padding-left: 15px;
      padding-right: 15px;
    }
    .top-stories-bar {
      background-color: transparent;
      height: auto;
    }
    .top-stories-bar .top-stories-label {
      float: none;
      z-index: 1;
      display: block;
      text-align: center;
      padding-right: 15px;
      padding-top: 8px;
      padding-bottom: 5px;
    }
    .top-stories-bar:before,
    .top-stories-bar .top-stories-label:after {
      display: none;
    }
    .top-stories-bar .top-stories-label .top-stories-label-wrap {
      display: inline-block;
      height: auto;
      padding-top: 0;
      padding-bottom: 0;
      min-height: 30px;
    }
    .top-stories-bar .top-stories-lists {
      padding: 0;
      background-color: #ffffff;
      z-index: 1;
    }
    .top-stories-bar .top-stories-lists:after {
      display: none;
    }
  }

  @media (min-width: 992px) {
  }

  @media (min-width: 1400px) {
    .container {
      max-width: 1340px;
    }
  }

  @media (min-width: 1600px) {
    .container {
      max-width: 1540px;
    }
  }

  @media (min-width: 1800px) {
    .container {
      max-width: 1740px;
    }
  }
</style>
