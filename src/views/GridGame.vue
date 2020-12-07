<template>

 <div class="categorias padre fondo2">
        <div class=" row bloque mx-0 centrar">
            <div class="d-flex  col-6">         
                <div class="button-container-1">
                 <span class="mas">Go</span>
                     <button id='work' type="button" name="Hover" v-on:click="ancho=2,alto=3" @click="siguiente()">3 x 2</button>    
              </div>

            </div>
            <div class="d-flex  col-6">         
                <div class="button-container-1">
                 <span class="mas">Go</span>
                     <button id='work' type="button" name="Hover" v-on:click="ancho=3,alto=4" @click="siguiente()">4 x 3</button>
              </div>

            </div>
            <div class="d-flex  col-6">         
                <div class="button-container-1">
                 <span class="mas">Go</span>
                     <button id='work' type="button" name="Hover" v-on:click="ancho=4,alto=5" @click="siguiente()">5 x 4</button>
              </div>

            </div>
             <div class="d-flex  col-6">       
              <div class="button-container-1">
                  <span class="mas">Go</span>
                       <button id='work' type="button" name="Hover" v-on:click="ancho=5,alto=6" @click="siguiente()">6 x 5</button>
             </div>
            </div>
            <div class="d-flex  col-6">       
              <div class="button-container-1">
                  <span class="mas">Go</span>
                       <button id='work' type="button" name="Hover"  v-on:click="ancho=7,alto=8" @click="siguiente()">8 x 7</button>
             </div>
            </div>
            <div class="d-flex  col-6">       
              <div class="button-container-1">
                  <span class="mas">Go</span>
                       <button id='work' type="button" name="Hover" v-on:click="ancho=8,alto=9" @click="siguiente()">9 x 8</button>
             </div>
            </div>
           
         
        </div>
    </div>
  <!--   <div class="categorias padre fondo1">
        <div class="bloque">
            <div class="bloques">
                <button class="" type="submit" v-on:click="ancho=2,alto=3" @click="siguiente()">3x2</button>
            </div>
            <div class="bloques">
                <button class="" type="submit" v-on:click="ancho=3,alto=4" @click="siguiente()">4x3</button>
            </div>
            <br>
            <div class="bloques">
                <button class="" type="submit" v-on:click="ancho=4,alto=5" @click="siguiente()">5x4</button>
            </div>
            <div class="bloques">
                <button class="" type="submit" v-on:click="ancho=5,alto=6" @click="siguiente()">6x5</button>
            </div>
            <br>
            <div class="bloques">
                <button class="" type="submit" v-on:click="ancho=7,alto=8" @click="siguiente()">8x7</button>
            </div>
            <div class="bloques">
                <button class="" type="submit" v-on:click="ancho=8,alto=9" @click="siguiente()">9x8</button>
            </div>
        </div>
    </div> -->
</template>

<script>
export default {
    name: 'GridGame',
    data(){
        return{
            ancho: 0,
            alto: 0
        }
    },
    mounted(){
        localStorage.removeItem("alto")
        localStorage.removeItem("ancho")
        if (localStorage.getItem('categoria') === null) {
            this.$router.push("/categorias")
        }
    },
    methods: {
        siguiente(){
            localStorage.setItem('alto', this.alto);
            localStorage.setItem('ancho', this.ancho);
            this.$router.push("/memorama")
        }
    }
}
</script>