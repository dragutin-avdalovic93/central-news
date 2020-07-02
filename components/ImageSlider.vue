<template>
  <div class="slider">
    <div class="slideshow-container"  ref="mySlides">

      <!-- Full-width images with number and caption text -->
      <div class="mySlides fade">
<!--        <div class="numbertext">1 / 3</div>-->
        <img src="https://admincentralnews.xyz/wp-content/uploads/2020/07/ravna_planina_final.jpg" style="width:100%">
        <div class="text">Ski centar 'Ravna Planina'</div>
      </div>

      <div class="mySlides fade">
        <!--        <div class="numbertext">1 / 3</div>-->
        <img src="https://admincentralnews.xyz/wp-content/uploads/2020/07/hotel_lavina_final.jpg" style="width:100%">
        <div class="text">Hotel Lavina Jahorina</div>
      </div>

      <div class="mySlides fade">
<!--        <div class="numbertext">2 / 3</div>-->
        <img src="https://admincentralnews.xyz/wp-content/uploads/2020/07/al_parco_final.jpg" style="width:100%">
        <div class="text">Al Parco Ristorante</div>
      </div>

      <div class="mySlides fade">
<!--        <div class="numbertext">3 / 3</div>-->
        <img src="https://admincentralnews.xyz/wp-content/uploads/2020/07/zlatni_bor_final.jpg" style="width:100%">
        <div class="text">Hotel Zlatni Bor</div>
      </div>
      <div class="mySlides fade">
<!--        <div class="numbertext">3 / 3</div>-->
        <img src="https://admincentralnews.xyz/wp-content/uploads/2020/07/kumbara_final.jpg" style="width:100%">
        <div class="text">Kumbara</div>
      </div>

      <!-- Next and previous buttons -->
<!--      <a class="prev" @click="plusSlides(-1)">&#10094;</a>-->
<!--      <a class="next" @click="plusSlides(1)">&#10095;</a>-->
    </div>
    <br>
<!--    <div style="text-align:center">-->
<!--      <span class="dot" @click="this.currentSlide(1)"></span>-->
<!--      <span class="dot" @click="this.currentSlide(2)"></span>-->
<!--      <span class="dot" @click="this.currentSlide(3)"></span>-->
<!--      <span class="dot" @click="this.currentSlide(4)"></span>-->
<!--    </div>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        slideIndex : 0
      };
    },
    methods: {
    // Next/previous controls
      plusSlides(n) {
        this.showSlides(this.slideIndex += n);
      },

      // Thumbnail image controls
       currentSlide(n) {
        this.showSlides(this.slideIndex= n);
      },
      showSlides() {
        var i;
        var slides = this.$refs.mySlides.children;
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
        this.slideIndex++;
        if (this.slideIndex > slides.length) {this.slideIndex = 1}
        slides[this.slideIndex-1].style.display = "block";
        setTimeout(this.showSlides, 3000); // Change image every 2 seconds
      }
    },
    components: {
    },
    mounted() {
      this.showSlides();
    }
  }
</script>

<style>
  * {box-sizing:border-box}

  /* Slideshow container */
  .slideshow-container {
    max-width: 1000px;
    position: relative;
    margin: auto;
    max-height: 380px;
  }

  /* Hide the images by default */
  .mySlides {
    display: none;
  }
  .mySlides img {
    max-height: 380px;
  }

  /* Next & previous buttons */
  .prev, .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    margin-top: -22px;
    padding: 16px;
    color: white;
    font-weight: bold;
    font-size: 18px;
    transition: 0.6s ease;
    border-radius: 0 3px 3px 0;
    user-select: none;
  }

  /* Position the "next button" to the right */
  .next {
    right: 0;
    border-radius: 3px 0 0 3px;
  }

  /* On hover, add a black background color with a little bit see-through */
  .prev:hover, .next:hover {
    background-color: rgba(0,0,0,0.8);
  }

  /* Caption text */
  .text {
    color: #f2f2f2;
    font-size: 15px;
    padding: 8px 12px;
    position: absolute;
    bottom: 8px;
    width: 100%;
    text-align: center;
    font-weight: 800;
  }

  /* Number text (1/3 etc) */
  .numbertext {
    color: #f2f2f2;
    font-size: 12px;
    padding: 8px 12px;
    position: absolute;
    top: 0;
  }

  /* The dots/bullets/indicators */
  .dot {
    cursor: pointer;
    height: 15px;
    width: 15px;
    margin: 0 2px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
  }

  .active, .dot:hover {
    background-color: #717171;
  }

  /* Fading animation */
  .fade {
    -webkit-animation-name: fade;
    -webkit-animation-duration: 4.5s;
    animation-name: fade;
    animation-duration: 4.5s;
  }

  @-webkit-keyframes fade {
    from {opacity: .4}
    to {opacity: 1}
  }

  @keyframes fade {
    from {opacity: .4}
    to {opacity: 1}
  }
</style>
