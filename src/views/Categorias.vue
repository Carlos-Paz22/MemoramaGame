<template>
    <div class="categorias padre fondo2">
        <div class=" row bloque mx-0 centrar">
            <div class="d-flex  col-6">         
                <div class="button-container-1">
                 <span class="mas">Go</span>
                     <button id='work' type="button" name="Hover" v-on:click="cat='anime'" @click="siguiente()">Anime</button>
              </div>
            </div>
            <div class="d-flex  col-6">         
                <div class="button-container-1">
                 <span class="mas">Go</span>
                     <button id='work' type="button" name="Hover"  v-on:click="cat='carros'" @click="siguiente()">Carros</button>
              </div>

            </div>
            <div class="d-flex  col-6">         
                <div class="button-container-1">
                 <span class="mas">Go</span>
                     <button id='work' type="button" name="Hover" v-on:click="cat='frutas'" @click="siguiente()">Frutas</button>
                           
              </div>

            </div>
             <div class="d-flex  col-6">       
              <div class="button-container-1">
                  <span class="mas">Go</span>
                       <button id='work' type="button" name="Hover" v-on:click="cat='juegos'" @click="siguiente()">Juegos</button>
             </div>
            </div>
            <div class="d-flex  col-6">       
              <div class="button-container-1">
                  <span class="mas">Go</span>
                       <button id='work' type="button" name="Hover" v-on:click="cat='peliculas'" @click="siguiente()">Peliculas</button>
             </div>
            </div>
            <div class="d-flex  col-6">       
              <div class="button-container-1">
                  <span class="mas">Go</span>
                       <button id='work' type="button" name="Hover" v-on:click="cat='musica'" @click="siguiente()">Musica</button>
             </div>
            </div>
            <div class="d-flex  col-6">       
              <div class="button-container-1">
                  <span class="mas">Go</span>
                       <button id='work' type="button" name="Hover" v-on:click="cat='aviones'" @click="siguiente()">Aviones</button>
             </div>
            </div>
          <!--   <div class="bloques">
                <button class="bttn bttn-cat fondo1" type="submit" v-on:click="cat='aviones'" @click="siguiente()">Aviones</button>
            </div>
            <br>
            <div class="bloques">
                <button class="bttn bttn-cat fondo1" type="submit" v-on:click="cat='carros'" @click="siguiente()">Carros</button>
            </div>
            <div class="bloques">
                <button class="bttn bttn-cat fondo1" type="submit" v-on:click="cat='frutas'" @click="siguiente()">Frutas</button>
            </div>
            <div class="bloques">
                <button class="bttn bttn-cat fondo1" type="submit" v-on:click="cat='juegos'" @click="siguiente()">Juegos</button>
            </div>
            <div class="bloques">
                <button class="bttn bttn-cat fondo1" type="submit" v-on:click="cat='peliculas'" @click="siguiente()">Peliculas</button>
            </div>
            <div class="bloques">
                <button class="bttn bttn-cat fondo1" type="submit" v-on:click="cat='musica'" @click="siguiente()">Musica</button>
            </div> -->
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'Categorias',
    data(){
        return{
            cat: '',
        }
    },
    mounted(){
        localStorage.removeItem("categoria")
    },
    methods: {
        siguiente(){
            localStorage.setItem('categoria', this.cat);
            this.$router.push("/gridgame")
        }
    }
}

</script>

<style>
 .fondo2 {
  background: url("../assets/fondo3.jpg") no-repeat center top;

  width: 100%;
  height: 100%;
  height: 100vh;
  background-size: cover;
}


@import url("https://fonts.googleapis.com/css?family=Lato:100,300,400");
@import url("https://fonts.googleapis.com/css?family=Roboto:100");


.header {
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-size: 34px;
  margin-top: 12vh;
}

.footer {
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 20px;
  margin-top: 15vh;
}

.button-container-1 {
  position: relative;
  width: 400px;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6vh;
  overflow: hidden;
  border: 1px solid;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 20px;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;
}
.button-container-1 button {
  width: 101%;
  height: 100%;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 11px;
  letter-spacing: 1px;
  font-weight: bold;
  background: #000;
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
  position: absolute;
  color: #000;
  text-align: center;
  width: 101%;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  position: absolute;
  font-size: 11px;
  margin-top: 17px;
  overflow: hidden;
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
a {
  color: #00ff95;
}


.centrar{
    
   margin-top: 200px;
}
</style>