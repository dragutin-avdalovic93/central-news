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
          <div class="article" v-if="!loading" :key="componentKey">
            <div class="blog-detail-post">
              <div class="social">
                <social-sharing :url="'https://www.centralnews.live/vijest/' + post[0].slug"
                                :title="post[0].title['rendered']"
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
              <div class="created_at">
                <i class="fas fa-calendar" aria-hidden="true"></i>
                {{$moment(post[0].date).format("dddd, DD.MM.YYYY HH:MM")}}
              </div>
              <img class="thumb-img" v-bind:src="post[0].featured_image_url">
              <div class="autor">
                <i class="fas fa-user"></i>
                Central News
              </div>
              <div class="blog-detail-post-inner">
                <div class="content">
                  <h2 class="title">
                    {{post[0].title["rendered"]}}
                  </h2>
                  <div class='excerpt-container'>
                    <p class="description" v-html="post[0].content['rendered']"></p>
                  </div>
                </div>
                <div class="post-footer">
                  <div class="metadata">
                  </div>
<!--                  <div class="read-more" @click="goBack">-->
<!--                    <a @click="goBack">-->
<!--                      <span class="read">Nazad</span><i class="fa fa-angle-left"/>-->
<!--                    </a>-->
<!--                  </div>-->
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="banners-top-column-third">
<!--              <div class="divider-15-w"></div>-->
<!--              <div class="divider-15"></div>-->
<!--              <div><a href="https://www.facebook.com/skiravnaplanina/" title="Ski centar 'Ravna Planina'" target="_blank" ><img src="https://admincentralnews.xyz/wp-content/uploads/2020/07/ravna_planina_final.jpg" class="img-fluid-top" alt="Ski centar 'Ravna Planina'"></a></div>-->
<!--              <div class="divider-15"></div>-->
<!--              <div class="divider-15-w"></div>-->

<!--              <div><a href="https://m.facebook.com/HotelLavinaJahorina/" title="Hotel Lavina Jahorina" target="_blank" >-->
<!--                <img src="https://admincentralnews.xyz/wp-content/uploads/2020/07/hotel_lavina_final.jpg" class="img-fluid-top" alt="Hotel Lavina Jahorina">-->
<!--              </a></div>-->
<!--              <div class="divider-15"></div>-->
<!--              <div class="divider-15-w"></div>-->

              <div><a href="https://www.facebook.com/Al-Parco-ristorante-1709486515947045/" title="Al Parco Ristorante" target="_blank"><img src="https://admincentralnews.xyz/wp-content/uploads/2020/07/al_parco_final.jpg" class="img-fluid-top" alt="Al Parco Ristorante"></a></div>
              <div class="divider-15"></div>
              <div class="divider-15-w"></div>

              <div><a href="https://www.facebook.com/zlatniborhotel/" title="Hotel Zlatni Bor" target="_blank"><img src="https://admincentralnews.xyz/wp-content/uploads/2020/07/zlatni_bor_final.jpg" class="img-fluid-top" alt="Hotel Zlatni Bor"></a></div>
              <div class="divider-15"></div>
              <div class="divider-15-w"></div>

              <div><a href="https://www.facebook.com/etnorestoran.kumbarapale" title="Kumbara" target="_blank"><img src="https://admincentralnews.xyz/wp-content/uploads/2020/07/kumbara_final.jpg" class="img-fluid-top" alt="Kumbara"></a></div>
              <div class="divider-15"></div>
              <div class="divider-15-w"></div>
            </div>
          </div>
          <div class="comm-cont">
            <div class="comments-form">
              <div class="divider"></div>
              <div class="comments-form-title">Ostavite komentar</div>
              <div class="divider"></div>
              <form id="form-comments" novalidate="novalidate" v-on:submit.prevent="sendData">
                <input type="hidden" id="postId" :value=this.postId />
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group row">
                      <label for="name" class="col-md-12 col-form-label">Ime i prezime *</label>
                      <div class="col-md-12">
                        <input type="text" class="comments-form-control-custom" name="name" id="name" value="">
                      </div>
                    </div>
                  </div>
<!--                  <div class="col-sm-6">-->
<!--                    <div class="form-group row">-->
<!--                      <label for="email" class="col-md-12 col-form-label">E-mail adresa *</label>-->
<!--                      <div class="col-md-12">-->
<!--                        <input type="email" class="comments-form-control-custom" name="email" id="email" value="">-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
                  <div class="col-sm-12">
                    <div class="form-group row">
                      <label class="col-md-12 col-form-label">Vaš komentar:
                      </label> <br>
                      <div class="col-md-12">
                        <textarea id="message" name="message" class="comments-form-control-custom" rows="5"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="divider-15"></div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="btn-box">
                      <button id="btn-send-form" class="btn btn-primary mb-2 comments-form-btn-send" type="submit">Komentariši</button>
                    </div>
                  </div>
<!--                  <div class="col-sm-6">-->
<!--                    <div class="align-right">-->
<!--                      <div class="g-recaptcha" data-sitekey="6Ldg9VAUAAAAAABnZ3dOt4teTJfpT2yziQs3715n"><div style="width: 304px; height: 78px;"><div><iframe src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6Ldg9VAUAAAAAABnZ3dOt4teTJfpT2yziQs3715n&amp;co=aHR0cHM6Ly93d3cucHJpbmNpcC5uZXdzOjQ0Mw..&amp;hl=sr&amp;v=JPZ52lNx97aD96bjM7KaA0bo&amp;size=normal&amp;cb=kqkbqnbm7pz" width="304" height="78" role="presentation" name="a-b0zyrhlhud5m" frameborder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"></iframe></div><textarea id="g-recaptcha-response" name="g-recaptcha-response" class="g-recaptcha-response" style="width: 250px; height: 40px; border: 1px solid rgb(193, 193, 193); margin: 10px 25px; padding: 0px; resize: none; display: none;"></textarea></div><iframe style="display: none;"></iframe></div>-->
<!--                    </div>-->
<!--                  </div>-->
                </div>
              </form>
              <div class="info-al">
                <div class="row">
                  <div class="col-12">
                    <!-- Success Alert -->
                    <div class="alert alert-success alert-dismissible fade show" id="good-alert">
                      <strong>USPJEH!</strong> Vaš komentar će se prikazati nakon odobrenja administratora.
                    </div>
                    <div class="alert alert-warning alert-dismissible fade show" id="bad-alert">
                      <strong>GREŠKA!</strong> Komentarisanje nije uspješno.
                    </div>
                  </div>
                </div>
              </div>
              <!-- comments modal  -->
              <div class="modal fade" id="comments-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-keyboard="false" data-backdrop="static">
                <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                  <div class="modal-content comments-form-modal-content">
                    <div class="modal-header comments-form-modal-header">
                      <h5 class="modal-title">Komentari</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div style="text-align: center;">
                        <i class="fa fa-check-square-o" aria-hidden="true"></i>
                        <div class="comments-form-modal-text-success">Vaš komentar je uspješno poslat.</div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn comments-form-btn-close-modal" data-dismiss="modal">Zatvori</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end comments modal -->
              <div class="comments-list">
                <div class="divider"></div>
                <div class="comments-form-title">
                  Komentari
                </div>
                <div class="divider"></div>
                <div class="comments-section"   v-for="comment in comments" v-bind:key="comment.id">
                  <div class="image-box"><img src="../../static/avatar.png"/></div>
                  <div class="name">{{comment.author_name}}</div>
                  <div class="date">{{$moment(comment.date).format("dddd, DD.MM.YYYY")}}</div>
                  <div class="message" v-html="comment.content.rendered"></div>
                  <div class="comments-section-divider"></div>
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
    head() {
      return {
        title: this.post[0].title["rendered"],
        meta: [{
          hid: 'description',
          name: 'description',
          content: this.post[0].excerpt["rendered"].substring(3,250)
        }, {
          hid: 'twitter:card',
          name: 'twitter:card',
          content:this.post[0].title["rendered"]
        }, {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.post[0].title["rendered"]
        }, {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
          {
            hid: 'og:description',
            property: 'og:description',
            content: this.post[0].excerpt["rendered"].substring(3,250)
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: this.post[0].title["rendered"]
          },
          {
            hid: 'og:url',
            property: 'og:url',
            content: `https://www.centralnews.live/vijest/${this.post[0].slug}`
          },
          {
            hid: 'og:name',
            property: 'og:name',
            content: this.post[0].title["rendered"]
          },
          {
            hid: 'og:image',
            property: 'og:image',
            content: this.post[0].featured_image_url
          },
          {
            hid: 'og:image:width',
            property: 'og:image:width',
            content: "200"
          },
          {
            hid: 'og:image:height',
            property: 'og:image:height',
            content: "200"
          },
          {
            hid: 'fb:app_id',
            property: 'fb:app_id',
            content: '243134206938677'
          }
        ]
      }
    },
    asyncData(context) {
      const slug = context.route.params;
      return context.$axios
        .get('https://admincentralnews.xyz/wp-json/wp/v2/posts?slug=' + slug.slug)
        .then((res) => {
          return { post: res.data, loading: false }
        })
    },
    data() {
      return {
        post: {},
        postData: {},
        slug: "",
        loading: true,
        color: '#00909e',
        height: 128,
        width: 128,
        loader: 'bars',
        comments: [],
        postId: 0,
        componentKey: 0
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
      forceRerender() {
        this.componentKey += 1;
        console.log('rerenderdone');
      },
      sendData() {
        const postId  = document.getElementById("postId").value;
        const name = document.getElementById("name").value;
        // const email = document.getElementById("email").value;
        const comment = document.getElementById("message").value;

        const data = JSON.stringify({
          post: postId,
          author_name: name,
          author_email: 'commenter@centralnews.live',
          content: comment
        });

        fetch("https://admincentralnews.xyz/wp-json/wp/v2/comments", {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        })
          .then((response) => {
            if(response.status === 201) {
              document.getElementById("form-comments").style.display = "none"
              document.getElementById("good-alert").style.display = "block"
              document.getElementById("bad-alert").style.display = "none"
            } else {
                // Comment submission failed.
                // Output `object.message` to see the error message.
                document.getElementById("form-comments").style.display = "none"
                document.getElementById("good-alert").style.display = "none"
                document.getElementById("bad-alert").style.display = "block"
            }
              return response.json();
          }).catch(error => console.error('Error:', error));
      },
      async fetchPost() {
        this.slug = this.$route.params.slug;
        this.post = await this.$axios.$get('https://admincentralnews.xyz/wp-json/wp/v2/posts?slug=' + this.slug);
        this.loading = false;
      },
      async fetchId() {
        this.slug = this.$route.params.slug;
        this.postData = await this.$axios.$get('https://admincentralnews.xyz/wp-json/wp/v2/posts?slug=' + this.slug);
        this.postId = this.postData[0].id;
      },
      async fetchComments() {
        this.comments = await this.$axios.$get('https://admincentralnews.xyz/wp-json/wp/v2/comments?post=' + this.postId);
      }
    },
    created() {
      this.fetchId().then( () => {
        this.fetchComments();
      });
    },
    mounted() {
      // var elementExists = document.getElementsByClassName("fb-video");
      // console.log(elementExists.length);
      // if(elementExists.length !== 0) {
      //   location = "#";
      //   window.location.reload(true);
      // }
    }
  }
</script>

<style>
  .banners-top-column-third {
    background: #dae1e7;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 767px) {
    .banners-top-column-third {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }
  #good-alert {
    display: none;
  }
  #bad-alert {
    display: none;
  }
  .btn-box {
    text-align: center;
  }
  .comm-cont {
    width: 90%;
    margin: 0 5%;
  }
  .blog-detail-post img {
    max-width: 100% !important;
    height: auto;
  }
  .blog-detail-post iframe {
    width: 98% !important;
    margin: 0 1% !important;
  }
  .blog-detail-post .fb-video span iframe{
    width: 98% !important;
    margin: 0 1% !important;
  }
  .blog-detail-post .fb-video span iframe{
    width: 98% !important;
    margin: 0 1% !important;
  }
  @media (max-width: 768px) {
    .blog-detail-post iframe {
      width: 100%;
      height: 30vh;
    }
  }
  @media (max-width: 768px) {
    .blog-detail-post .fb-video span iframe{
      width: 98% !important;
      margin: 0 1% !important;
    }
    .blog-detail-post .fb-post span iframe{
      width: 98% !important;
      margin: 0 1% !important;
    }
  }
  .social {
    margin: 5px auto 5px 5px;
  }
  .social span {
    padding: 4px 8px;
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
    flex-direction: column;
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
  .blog-detail-post .created_at {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    text-align: left;
    letter-spacing: 0;
    color: #999;
    opacity: 1;
    transition: all 200ms ease-in-out;
    margin:  5px 10px;
  }
  .blog-detail-post .autor {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    text-align: left;
    letter-spacing: 0;
    color: #999;
    opacity: 1;
    transition: all 200ms ease-in-out;
    padding: 5px 10px;
    background: #fff;
  }
  .blog-detail-post .autor i {
    margin-right: 5px;
    width: 14px;
    height: 14px;
    color: #999;
  }
  .blog-detail-post .created_at i {
    margin-right: 5px;
    width: 14px;
    height: 14px;
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
    border-bottom: 2px solid rgba(139, 139, 139, 0.5);
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
  /* comments */

  .comments-form-title {
    font-size: 24px;
    line-height: 40px;
    font-family: 'Roboto', Arial;
    font-weight: 700;
    border-bottom: 3px solid #27496d;
    margin-bottom: 15px;
  }

  .comments-form-control-custom {
    display: block;
    width: 100%;
    padding: 6px 12px;
    font-size: 14;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 2px solid #ced4da;
    border-radius: 0;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }

  .comments-form-btn-send{
    background: #12cead;
    color: #ffffff;
    border-width:0px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    padding:7px 40px;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
    font-size: 16px;
    font-family: 'Roboto', Arial;
  }
  .comments-form-btn-send:hover {
    background-color: #12cead;
    color: #ffffff;
  }

  .comments-form-btn-send:focus {
    background-color: #12cead;
    color: #ffffff;
  }

  .comments-form-help-block {
    color: #EB1923;
    display: block;
    font-size: 12px;
    padding-top: 5px;
  }

  .comments-form-error {
    background-color: #EB1923;
    color: #fff;
    padding:10px 15px !important;
    margin-bottom: 30px;
    font-size: 14px;
  }

  .comments-form-ok {
    background-color: #27ae61;
    color: #fff;
    padding:10px 15px !important;
    margin-bottom: 30px;
    font-size: 14px;
  }

  .comments-form-btn-close-modal {
    background-color: #EB1923;
    color: #ffffff;
    border-width:0px;
    border-radius: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    padding:10px 30px;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
    text-transform:uppercase;
    font-size: 14px;
    font-family: 'Roboto', Arial;
  }
  .comments-form-btn-close-modal:hover {
    background-color: #C8111B;
  }

  .comments-form-btn-close-modal:focus {
    background-color: #EB1923;
  }

  .comments-form-modal-content {
    border-width: 0 !important;
    border-radius: 0 !important;
    max-width: 600px;
  }

  .comments-form-modal-header h5 {
    font-size: 20px;
    font-family: 'Roboto', Arial;
    text-transform: uppercase;
  }

  .comments-form-modal-text-success{
    line-height: 18px;
    font-size: 16px;
    padding-bottom: 20px;
  }

  .comments-info-title {
    font-size: 18px;
    line-height: 22px;
    font-family: 'Roboto', Arial;
    font-weight: 700;
    margin-bottom: 15px;
    color: #333;
  }

  .comments-info-text {
    font-size: 14px;
    line-height: 24px;
    color: #777;
  }

  .comments-section {
    position:relative;
    padding-left:100px;
  }

  .comments-section .image-box{
    position: absolute;
    left: 20px;
    top: 10px;
  }

  .comments-section .image-box img{
    max-width:60px;
  }

  .comments-section .name {
    font-size: 18px;
    line-height: 24px;
    font-family: 'Roboto', Arial;
    color: #12cead;
  }

  .comments-section .date {
    color: #999;
    font-size: 12px;
    line-height: 34px;
  }

  .comments-section .message {
    color: #666;
  }

  .comments-section-divider {
    height: 1px;
    background-color: #CCCED4;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: -100px;
  }
</style>
