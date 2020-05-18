<template>
  <div class="news-slot">
    <div class="card">
      <div class="card-header px-lg-5 bg-white">
        <h4 class="card-title">
          Pošalji vijest - ANONIMNO
        </h4>
        <h6 class="card-subtitle mb-2 text-muted">
          redakcija@centralnews.live
        </h6>
      </div>
      <form id="contact-form"  v-on:submit.prevent="sendData">
        <div class="card-body px-lg-5">
        <div class="form-group required">
          <label for="name">Vaše ime</label>
          <input type="text" id="name" class="form-control" name="name" autofocus="" aria-required="true" ref="name">
          <div class="invalid-feedback" ref="err-name">Molimo unesite ime</div>
        </div>
        <div class="form-group subject">
          <label for="subject">Naslov vijesti</label>
          <input type="text" id="subject" class="form-control" name="subject" ref="subject">
          <div class="invalid-feedback" ref="err-subject">Molimo unesite naslov</div>
        </div>
        <div class="form-group message required">
          <label for="message">Tekst vijesti</label>
          <textarea id="message" class="form-control" name="message" rows="8" aria-required="true" ref="message"></textarea>
          <div class="invalid-feedback" ref="err-message">Molimo unesite sadržaj</div>
        </div>
        </div>
        <div class="card-footer px-lg-5 bg-white">
            <button class="btn btb-primary btn-send">Pošaljite vijest</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'send-news',
  layout: 'blog',
  data() {
    return {
      name: '',
      subject: '',
      message: ''
    }
  },
  components: {
  },
  methods: {
    visitPost(slug) {
      this.$router.replace('/vijest/' + slug);
    },
    onLangsPageChange() {
      window.scrollTo(0, 0);
    },
    sendData() {
      this.name = this.$refs.name.value;
      this.subject = this.$refs.subject.value;
      this.message = this.$refs.message.value;
      if(this.name === '' || this.subject === '' || this.message === '') {
        if(this.name === '') {
          this.$refs["err-name"].style.display = 'block';
        }
        if (this.subject === ''){
          this.$refs["err-subject"].style.display = 'block';
        }
        if (this.message === '') {
          this.$refs["err-message"].style.display = 'block';
        }
      } else {
        this.$refs["err-name"].style.display = 'none';
        this.$refs["err-subject"].style.display = 'none';
        this.$refs["err-message"].style.display = 'none';

      }
    }
  },
  created(){
  }
}
</script>

<style scoped>
  .card-footer {
    text-align: center;
  }
  .card .btn-send {
    background: #12cead;
    color: #ffffff;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    padding: 7px 40px;
    transition: all 0.4s;
    font-size: 16px;
    font-family: 'Roboto', Arial;
  }
  .card div.required label:after {
    content: " *";
    color: red;
  }
  .card-header {
    padding: 0.75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
  .card-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 1.25rem;
  }
</style>


