<template>
<div class="padre fondox1">
  <div class="bloque">


    <a href="/categorias">
      <button class="btnx1">
        <div></div>
      </button>
    </a>
   <!--  <button class="bttn bttn-inicio fondo2" type="submit" @click="siguiente()">jugar</button> -->
  </div>
</div>
 
</template>

<script>

export default {
  name: 'Home',
  mounted(){
    localStorage.clear();

  },
  methods: {
        siguiente(){
            localStorage.setItem('categoria', this.cat);
            this.$router.push("/Categorias")
        }
    }
}
</script>

<style >
 

.fondox1 {
  background: url("../assets/fondo2.jpg") no-repeat center top;
  width: 100%;
  height: 100%;
  height: 100vh;
  background-size: cover;
}

.padre {
  background-size: 100%;

  width: 100%;
  height: 100vh;
  display: table;
}

.btnx1 {
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  display: block;
  width: 240px;
  height: 80px;
  padding: 40px;
  margin: 0 auto;
  border: 0;
  cursor: pointer;
  border-radius: 2px;
  transform: translateY(-50%);
  box-shadow: 0 10px 20px -5px #94a6af;
  overflow: hidden;
}

.btnx1:before,
.btnx1:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.btnx1:before {
  transform: scale(1);
  background-image: url("https://himalayasingh.github.io/button-hover-effect-1/img/bg.jpg");
  background-size: cover;
  transition: 0.3s ease transform;
  z-index: 1;
}

.btnx1:after {
  background-color: #000;
  opacity: 0.16;
  z-index: 2;
}

.btnx1 div {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
}

.btnx1 div:before,
.btnx1 div:after {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  color: #fff;
  font-size: 30px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
  line-height: 1;
  text-align: center;
  padding: 25px 0;
  transition: 0.3s ease all;
}

.btnx1 div:before {
  content: "JUEGA";
  letter-spacing: 0;
  opacity: 1;
  transform: scale(1);
}

.btnx1 div:after {
  content: "AHORA";
  letter-spacing: -10px;
  transform: scale(0);
  opacity: 0;
}

.btnx1:hover:before {
  transform: scale(1.3);
}

.btnx1:hover div:before {
  letter-spacing: 3px;
  opacity: 0;
  transform: scale(4);
}

.btnx1:hover div:after {
  letter-spacing: 0;
  opacity: 1;
  transform: scale(1);
}


</style>
