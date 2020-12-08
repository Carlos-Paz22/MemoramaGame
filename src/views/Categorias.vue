<template>
  <div class="categorias gridcentral mx-0">
    <div class="main mx-0">
      <div class="child">
        <div class="button-container-1">
          <!--   <span class="mas">Go</span> -->
          <button
            id="work"
            type="button"
            name="Hover"
            v-on:click="cat = 'anime'"
            @click="siguiente()"
          >
            Anime
          </button>
        </div>
      </div>
      <div class="child">
        <div class="button-container-1">
          <!--   <span class="mas">Go</span> -->
          <button
            id="work"
            type="button"
            name="Hover"
            v-on:click="cat = 'carros'"
            @click="siguiente()"
          >
            Carros
          </button>
        </div>
      </div>
      <br />
      <div class="child">
        <div class="button-container-1">
          <!-- <span class="mas">Go</span> -->
          <button
            id="work"
            type="button"
            name="Hover"
            v-on:click="cat = 'frutas'"
            @click="siguiente()"
          >
            Frutas
          </button>
        </div>
      </div>
      <div class="child">
        <div class="button-container-1">
          <!--   <span class="mas">Go</span> -->
          <button
            id="work"
            type="button"
            name="Hover"
            v-on:click="cat = 'juegos'"
            @click="siguiente()"
          >
            Juegos
          </button>
        </div>
      </div>
      <br />
      <div class="child">
        <div class="button-container-1">
          <!--     <span class="mas">Go</span> -->
          <button
            id="work"
            type="button"
            name="Hover"
            v-on:click="cat = 'peliculas'"
            @click="siguiente()"
          >
            Peliculas
          </button>
        </div>
      </div>
      <div class="child">
        <div class="button-container-1">
          <!--  <span class="mas">Go</span> -->
          <button
            id="work"
            type="button"
            name="Hover"
            v-on:click="cat = 'musica'"
            @click="siguiente()"
          >
            Musica
          </button>
        </div>
      </div>
      <br />
      <div class="child">
        <div class="button-container-1">
          <!--   <span class="mas">Go</span> -->
          <button
            id="work"
            type="button"
            name="Hover"
            v-on:click="cat = 'aviones'"
            @click="siguiente()"
          >
            Aviones
          </button>
        </div>
      </div>
      <div class="child">
        <div></div>
      </div>
      <br />
      <br />
      <br />
      <a href="/">
        <img
          class="imagen"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Home_Icon.svg/768px-Home_Icon.svg.png"
          alt=""
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Categorias",
  data() {
    return {
      cat: "",
    };
  },
  mounted() {
    localStorage.removeItem("categoria");
  },
  methods: {
    siguiente() {
      localStorage.setItem("categoria", this.cat);
      this.$router.push("/gridgame");
    },
  },
};
</script>

<style>
.gridcentral {
  background: url("../assets/fondo3.jpg") no-repeat center top;

  width: 100%;
  height: 100%;
  height: 100vh;
  background-size: cover;
}
.main {
  display: table-cell;
  vertical-align: middle;
}
.child {
  font-size: 50px;
  width: 10%;
  padding: 3px 3px 3px 5px;

  display: inline-block;
}

.footer {
  text-align: center;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  font-size: 20px;
  margin-top: 15vh;
}

.button-container-1 {
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6vh;
  overflow: hidden;
  border: 1px solid;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  font-size: 0px;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;
}
.button-container-1 button {
  width: 100%;
  height: 100%;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  font-size: 21px;
  letter-spacing: 1px;
  font-weight: bold;
  background: red;
  -webkit-mask: url("https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/nature-sprite.png");
  mask: url("https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/nature-sprite.png");
  -webkit-mask-size: 2300% 100%;
  mask-size: 2300% 100%;
  border: none;
  color: #fff;
  cursor: pointer;
  -webkit-animation: ani2 0.7s steps(22) forwards;
  animation: ani2 0.7s steps(22) forwards;
}
.button-container-1 button:hover {
  -webkit-animation: ani 0.7s steps(22) forwards;
  animation: ani 0.7s steps(22) forwards;
}
.mas {
  color: rgb(236, 18, 18);

  font-family: "Lato", sans-serif;
  font-weight: 300;

  font-size: 11px;

  font-weight: bold;
}

@-webkit-keyframes ani {
  from {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
  to {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
}
@keyframes ani {
  from {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
  to {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
}
@-webkit-keyframes ani2 {
  from {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
  to {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
}
@keyframes ani2 {
  from {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
  to {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
}
</style>