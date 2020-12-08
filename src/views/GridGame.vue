<template>

    <div class="categorias gridcentral">
        <div class="main">
            <div class="child">
                <div class="button-container-1">
                     <button id='work'  type="button" name="Hover" v-on:click="ancho=2,alto=3" @click="siguiente()">3x2</button>
              </div>  
            </div>
            <div class="child">
              <div class="button-container-1">
                     <button id='work'  type="button" name="Hover" v-on:click="ancho=3,alto=4" @click="siguiente()">4x3</button>
              </div> 
            </div>
            <br>
            <div class="child">
                
                <div class="button-container-1">
                     <button id='work'  type="button" name="Hover"  v-on:click="ancho=4,alto=5" @click="siguiente()">5x4</button>
              </div>          
            </div>
            <div class="child">
                   
                <div class="button-container-1">
                     <button id='work'  type="button" name="Hover"  v-on:click="ancho=5,alto=6" @click="siguiente()">6x5</button>
              </div> 
              
            </div>
            <br>
            <div class="child">
                 <div class="button-container-1">
                     <button id='work'  type="button" name="Hover" v-on:click="ancho=7,alto=8" @click="siguiente()">8x7</button>
              </div> 
            
            </div>
            <div class="child">
                 <div class="button-container-1">
                     <button id='work'  type="button" name="Hover" v-on:click="ancho=8,alto=9" @click="siguiente()">9x8</button>          
               </div>
          
          </div>
          <br>
          <br>
          <br>
       <a href="/">
<img class="imagen" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Home_Icon.svg/768px-Home_Icon.svg.png"   alt="">

</a>
         </div>
    </div>
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
<style>
.gridcentral{
  background-size: 135%;
  text-align: center;
  width: 100%;
  height: 100vh;
  display: table;
}
.main{
  display: table-cell;
  vertical-align: middle;
}
.child{
  width: 50%;
  padding: 3px 3px 3px 5px;

  display: inline-block;
}
</style>