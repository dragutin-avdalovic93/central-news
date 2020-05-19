<template>
  <div id="choices">
    <h4>Da li ste za ukidanje vanrednog stanja?</h4>
    <div class="choice">
      <div class="result">
        <div class="bar" data-choice="1"></div>
      </div>
      <div class="label">
        <p>Da</p>
        <button data-choice="1">Glasaj</button>
      </div>
    </div>
    <div class="choice">
      <div class="result">
        <div class="bar" data-choice="2"></div>
      </div>
      <div class="label">
        <p>Ne</p>
        <button data-choice="2">Glasaj</button>
      </div>
    </div>
    <div class="choice">
      <div class="result">
        <div class="bar" data-choice="3"></div>
      </div>
      <div class="label">
        <p>Možda</p>
        <button data-choice="3">Glasaj</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'anketa',
  layout: 'blog',
  data() {
    return {
      tally: {},
      buttons: []
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
    vote(choice) {
    this.tally[choice]++;
    this.tally["total"]++;
    console.log(this.tally);
    },
    barPercentage(node, tally) {
      var choice = node.dataset.choice;

      if (tally[choice])
        return tally[choice]/tally["total"] * 100;
      return 0;
    },
    renderBars() {
      var bars = document.getElementsByClassName("bar");

      for (var i = 0; i < bars.length; i++) {
        var percentage = this.barPercentage(bars[i], this.tally);
        console.log(percentage)
        bars[i].style.height = percentage.toString() + "%";
      }
    },
    setup() {
      // Set up event listeners
      this.buttons = document.querySelectorAll(".choice button");
      for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].addEventListener("click", (e) => {
          this.vote(e.target.dataset["choice"]);
          this.renderBars();
        });
      }

      this.renderBars();
    }
  },
  mounted(){
    this.tally = {
      1: 0,
      2: 0,
      3: 0,
      total: 0
      };
    this.setup();
  }
}
</script>

<style scoped>
  #choices {
    background: white;
    text-align: center;
  }
  #choices h4{
    padding: 20px;
  }
  .choice {
    height: 400px;
    display: inline-block;
    width: 100px;
  }

  .result {
    height: 330px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .bar {
    height: 0%;
    width: 70%;
    margin: 0 auto;
  }

  .bar[data-choice="1"] {
    background-color: red;
  }

  .bar[data-choice="2"] {
    background-color: green;
  }

  .bar[data-choice="3"] {
    background-color: blue;
  }

  .label {
    height: 70px;
    text-align: center;
  }
</style>


