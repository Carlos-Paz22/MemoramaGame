<template>
    <div class="categorias padre fondo2">
        <div class="bloque">
            <div class="bloques">
                <button class="bttn bttn-cat fondo1" type="submit" v-on:click="cat='anime'" @click="siguiente()">Anime</button>
            </div>
            <div class="bloques">
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
            </div>
            
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