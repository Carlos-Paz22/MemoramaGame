<template>
        <div class="categorias padre">
        <div class="bloque">
            <div class="bloques">
                <button class="bttn bttn-cat" type="submit" v-on:click="cat='anime'" @click="siguiente()">Anime</button>
            </div>
            <div class="bloques">
                <button class="bttn bttn-cat" type="submit" v-on:click="cat='aviones'" @click="siguiente()">Aviones</button>
            </div>
            <br>
            <div class="bloques">
                <button class="bttn bttn-cat" type="submit" v-on:click="cat='carros'" @click="siguiente()">Carros</button>
            </div>
            <div class="bloques">
                <button class="bttn bttn-cat" type="submit" v-on:click="cat='frutas'" @click="siguiente()">Frutas</button>
            </div>
            <br>
              <div class="bloques">
                <button class="bttn bttn-cat" type="submit" v-on:click="cat='juegos'" @click="siguiente()">Juegos</button>
            </div>
               <div class="bloques">
                <button class="bttn bttn-cat" type="submit" v-on:click="cat='peliculas'" @click="siguiente()">Peliculas</button>
            </div>
            <br>
               <div class="bloques">
                <button class="bttn bttn-cat" type="submit" v-on:click="cat='musica'" @click="siguiente()">Musica</button>
            </div>
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
/*fondos*/

  .padre{
  background-size: 135%;
  text-align: center;
  width: 100%;
  height: 100vh;
  display: table;
}
.bloque{
  display: table-cell;
  vertical-align: middle;
}
.bloques{
  width: 50%;
  padding: 3px 3px 3px 5px;

  display: inline-block;
}
</style>