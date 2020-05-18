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
          <input type="text" id="name" class="form-control" name="name" aria-required="true" ref="name">
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
        <p id="my-form-status"></p>
        </div>
        <div class="card-footer px-lg-5 bg-white">
            <button class="btn btb-primary btn-send" id="my-form-button">Pošaljite vijest</button>
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
      message: '',
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
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://formspree.io/mqkyebab');
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function() {
          if (xhr.readyState !== XMLHttpRequest.DONE) return;
          if (xhr.status === 200) {
            var button = document.getElementById("my-form-button");
            var status = document.getElementById("my-form-status");
            button.style = "display: none ";
            status.innerHTML = "Vijest je uspješno poslana! Sačekajte odgovor administratora.";
          } else {
            var button = document.getElementById("my-form-button");
            var status = document.getElementById("my-form-status");
            status.innerHTML = "Dogodila se greška.";
          }
        };
        var form = document.getElementById("contact-form");
        var data = new FormData(form);
        xhr.send(data);
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
  .btn-send:hover {
    background-color: #fff;
    color: #12cead;
    border: solid 1px #12cead;
  }
  .btn-send:focus {
    background-color: #fff;
    color: #12cead;
    border: solid 1px #12cead;
  }
</style>


