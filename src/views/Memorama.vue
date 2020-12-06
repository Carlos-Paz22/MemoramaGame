<template>
  <div class="bg-info mx-0">
    <div class="d-flex flex-row justify-content-center mx-0">
      <div
        style="tam max-height:100px; border-radius: 20px "
      >
        <div class="d-flex flex-row justify-content-between">
          <div class="">
            <h3 class="text-center">Carros</h3>

            <p>
              <span>Intentos: </span> {{ intentos }} <span>Puntos: </span>
              {{ aciertos }}
                Tiempo: {{ formatearTiempo() }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="grid-block col-sm-md-12 "
      style="background-image: url('https://image.freepik.com/vector-gratis/fondo-degradado-tonos-verdes_23-2148380476.jpg');no-repeat center top; width: 100%; height: 100%;   height: 100vh; background-size: cover; "
    >
      <div class="d-flex flex-row justify-content-center mx-my-0">
      <!--   <div
          class="bg-info mb-4 mt-4 p-4 col-sm-4"
          style="tam max-height:3000px; border-radius: 20px"
        > -->
          <div class="d-flex flex-row justify-content-center mx-my-0">
            <div class="">
              <div
                v-for="(fila, indiceFila) in memorama"
                :key="indiceFila"
                class="row mx-0"
              >
                <div
                  :key="indiceFila + '' + indiceImagen"
                  class="col p-1 mx-my-0 space"
                  v-for="(imagen, indiceImagen) in fila"
                >
                  <div class="distancia">
                    <img
                      @click="voltear(indiceFila, indiceImagen)"
                      :class="{ girar: imagen.mostrar }"
                      :src="imagen.mostrar ? imagen.ruta : NOMBRE_IMAGEN_OCULTA"
                  
                      class="target-image6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
       <!--  </div> -->
      </div>
    </div>
  </div>
</template>

<script>

//Cronometro
function pad(str, length, character) {
	var str = '' + str;
	while (str.length < length) {
		/* console.log('pad' + character); */
		str = character + str;
	}
	return str;
};

function formatearTiempoDesdeSegundos(seg) {
	var str = '';
	var hora = null;
	var minuto = null;
	
	hora = Math.floor(seg / 60.0 / 60.0);
	str += pad(hora, 2, '0');

	minuto = Math.floor(seg / 60.0);
	while (minuto >= 60) {
		minuto -=60;
	}
	str += ':' + pad(minuto, 2, '0');

	seg = Math.floor(seg);
	while (seg >= 60) {
		seg -=60;
	}
	str += ':' + pad(seg, 2, '0');
	return str;

};
//Cronometro

const // Intentos máximos que tiene el jugador
  MAXIMOS_INTENTOS = 999,
 
  SEGUNDOS_ESPERA_VOLTEAR_IMAGEN = 1, // Por cuántos segundos mostrar ambas imágenes
  NOMBRE_IMAGEN_OCULTA =
    "https://assets.stickpng.com/images/5a4613eed099a2ad03f9c996.png";
export default {
  name: "Memorama",
  data: () => ({
    tiempo:0,
    categoria:"",
    anime:[],
    aviones:[],
    carros:[],
    frutas:[],
    juegos:[],
    peliculas:[],
    musica:[],
    COLUMNAS:0,
    alto:0,
    ciclo:0,
   
    memorama: [],
    // Útiles para saber cuál fue la carta anteriormente seleccionada
    ultimasCoordenadas: {
      indiceFila: null,
      indiceImagen: null,
    },
    NOMBRE_IMAGEN_OCULTA: NOMBRE_IMAGEN_OCULTA,
    MAXIMOS_INTENTOS: "",
    intentos: 1,
    aciertos: 0,
    esperandoTimeout: false,
    rev: [],
    tamano: []

  }),
  methods: {
    llenarimagenes(){
    this.anime=[
         "https://img.autocosmos.com/noticias/fotosprinc/NAZ_b65480612b9249c0885a3ec88c5641e1.jpg",
      "https://sites.google.com/site/imagenesdecarrosgratis/_/rsrc/1421516636272/home/carros-deportivos-lamborghini-aventador-tron_aventador.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGkCm1qMGErnoHwP7s2Sj36g-XsHDNyAqPnw&usqp=CAU",
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/08/15863374252712.jpg",
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/08/15863374252712.jpg",
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/08/15863374252712.jpg",
      "https://img.autocosmos.com/noticias/fotosprinc/NAZ_b65480612b9249c0885a3ec88c5641e1.jpg",
      "https://sites.google.com/site/imagenesdecarrosgratis/_/rsrc/1421516636272/home/carros-deportivos-lamborghini-aventador-tron_aventador.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGkCm1qMGErnoHwP7s2Sj36g-XsHDNyAqPnw&usqp=CAU",
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/08/15863374252712.jpg",
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/08/15863374252712.jpg",
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/08/15863374252712.jpg",
      "https://img.autocosmos.com/noticias/fotosprinc/NAZ_b65480612b9249c0885a3ec88c5641e1.jpg",
      "https://sites.google.com/site/imagenesdecarrosgratis/_/rsrc/1421516636272/home/carros-deportivos-lamborghini-aventador-tron_aventador.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGkCm1qMGErnoHwP7s2Sj36g-XsHDNyAqPnw&usqp=CAU",
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/08/15863374252712.jpg",
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/08/15863374252712.jpg",
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/08/15863374252712.jpg",
      "https://img.autocosmos.com/noticias/fotosprinc/NAZ_b65480612b9249c0885a3ec88c5641e1.jpg",
      "https://sites.google.com/site/imagenesdecarrosgratis/_/rsrc/1421516636272/home/carros-deportivos-lamborghini-aventador-tron_aventador.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGkCm1qMGErnoHwP7s2Sj36g-XsHDNyAqPnw&usqp=CAU",
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/08/15863374252712.jpg",
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/08/15863374252712.jpg",
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/08/15863374252712.jpg",
      "https://img.autocosmos.com/noticias/fotosprinc/NAZ_b65480612b9249c0885a3ec88c5641e1.jpg",
      "https://sites.google.com/site/imagenesdecarrosgratis/_/rsrc/1421516636272/home/carros-deportivos-lamborghini-aventador-tron_aventador.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGkCm1qMGErnoHwP7s2Sj36g-XsHDNyAqPnw&usqp=CAU",
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/08/15863374252712.jpg",
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/08/15863374252712.jpg",
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/08/15863374252712.jpg",
      "https://img.autocosmos.com/noticias/fotosprinc/NAZ_b65480612b9249c0885a3ec88c5641e1.jpg",
      "https://sites.google.com/site/imagenesdecarrosgratis/_/rsrc/1421516636272/home/carros-deportivos-lamborghini-aventador-tron_aventador.jpg",
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/08/15863374252712.jpg",
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/08/15863374252712.jpg",
      "https://img.autocosmos.com/noticias/fotosprinc/NAZ_b65480612b9249c0885a3ec88c5641e1.jpg",
      "https://sites.google.com/site/imagenesdecarrosgratis/_/rsrc/1421516636272/home/carros-deportivos-lamborghini-aventador-tron_aventador.jpg",
    ]
  },

     //cronometro
 
			reiniciarTiempo: function(event) {
			   /*  event.preventDefault(); */
      			//this.tiempo = null;
				this.tiempo = 0;
				//this.guardarEnLocalStorage();
			},
			formatearTiempo: function () {
				return formatearTiempoDesdeSegundos(this.tiempo);
			},
		
			contarSegundos: function() {
				var self = this;
				setInterval(function() {
					if (self.tiempo !== null) {
						self.tiempo++;
					
					
					}
				}, 1000);
			},
    // Método que muestra la alerta indicando que el jugador ha perdido; después
    // de mostrarla, se reinicia el juego
    indicarFracaso() {
      Swal.fire({
        title: "Perdiste",
        html: `
                <img class="img-fluid" src="./img/perdiste.png" alt="Perdiste">
                <p class="h4">Agotaste tus intentos</p>`,
        confirmButtonText: "Jugar de nuevo",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(this.reiniciarJuego);
    },
    // Mostrar alerta de victoria y reiniciar juego
    indicarVictoria() {
       var resultado = this.aciertos;
      var intentos = this.intentos;
       var tiempo = this.tiempo
      Swal.fire({
        title: "¡Ganaste!",
           html: `
                <img class="img-fluid" src="https://image.freepik.com/vector-gratis/copa-ganadores-oro_1284-18399.jpg" alt="Ganaste">
                <p class="h4">Muy bien hecho</p> Puntos:${resultado}
                <br>
                Intentos:${intentos}
                <br>
                 Tiempo:${tiempo} Segundos
                <br>
                <a href="/">
<img class="imagen" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Home_Icon.svg/768px-Home_Icon.svg.png"   alt="">

</a>
                `,
        confirmButtonText: "Jugar de nuevo",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(this.reiniciarJuego);
    },
    // Método que indica si el jugador ha ganado
    haGanado() {
      return this.memorama.every((arreglo) =>
        arreglo.every((imagen) => imagen.acertada)
      );
    },
    // Ayudante para mezclar un arreglo
    mezclarArreglo(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    },
    // Aumenta un intento y verifica si el jugador ha perdido
    aumentarIntento() {
      this.intentos++;
      if (this.intentos >= MAXIMOS_INTENTOS) {
        this.indicarFracaso();
      }
    },
    // Se desencadena cuando se hace click en la imagen
    voltear(indiceFila, indiceImagen) {
      // Si se está regresando una imagen a su estado original, detener flujo
      if (this.esperandoTimeout) {
        return;
      }
      // Si es una imagen acertada, no nos importa que la intenten voltear
      if (this.memorama[indiceFila][indiceImagen].acertada) {
        return;
      }
      // Si es la primera vez que la selecciona
      if (
        this.ultimasCoordenadas.indiceFila === null &&
        this.ultimasCoordenadas.indiceImagen === null
      ) {
        this.memorama[indiceFila][indiceImagen].mostrar = true;
        this.ultimasCoordenadas.indiceFila = indiceFila;
        this.ultimasCoordenadas.indiceImagen = indiceImagen;
        return;
      }
      // Si es el que estaba mostrada, lo ocultamos de nuevo
      let imagenSeleccionada = this.memorama[indiceFila][indiceImagen];
      let ultimaImagenSeleccionada = this.memorama[
        this.ultimasCoordenadas.indiceFila
      ][this.ultimasCoordenadas.indiceImagen];
      if (
        indiceFila === this.ultimasCoordenadas.indiceFila &&
        indiceImagen === this.ultimasCoordenadas.indiceImagen
      ) {
        this.memorama[indiceFila][indiceImagen].mostrar = false;
        this.ultimasCoordenadas.indiceFila = null;
        this.ultimasCoordenadas.indiceImagen = null;
        this.aumentarIntento();
        return;
      }

      // En caso de que la haya encontrado, ¡acierta!
      // Se basta en ultimaImagenSeleccionada
      this.memorama[indiceFila][indiceImagen].mostrar = true;
      if (imagenSeleccionada.ruta === ultimaImagenSeleccionada.ruta) {
        this.aciertos += 100;
        this.memorama[indiceFila][indiceImagen].acertada = true;
        this.memorama[this.ultimasCoordenadas.indiceFila][
          this.ultimasCoordenadas.indiceImagen
        ].acertada = true;
        this.ultimasCoordenadas.indiceFila = null;
        this.ultimasCoordenadas.indiceImagen = null;
        // Cada que acierta comprobamos si ha ganado
        if (this.haGanado()) {
          this.indicarVictoria();
        }
      } else {
        // Si no acierta, entonces giramos ambas imágenes
        this.esperandoTimeout = true;
        setTimeout(() => {
          this.memorama[indiceFila][indiceImagen].mostrar = false;
          this.memorama[indiceFila][indiceImagen].animacion = false;
          this.memorama[this.ultimasCoordenadas.indiceFila][
            this.ultimasCoordenadas.indiceImagen
          ].mostrar = false;
          this.ultimasCoordenadas.indiceFila = null;
          this.ultimasCoordenadas.indiceImagen = null;
          this.esperandoTimeout = false;
        }, SEGUNDOS_ESPERA_VOLTEAR_IMAGEN * 1000);
        this.aumentarIntento();
      }
    },
    reiniciarJuego() {

       /* event.preventDefault(); */
       this.tiempo=0;
        
      let memorama = [];
       let tamano=[];
       let rev=[];
      rev=this.rev;
      
      this.mezclarArreglo(rev);
      this.imagenes=rev;
     
      this.imagenes.forEach((imagen, indice) => {
        let imagenDeMemorama = {
          ruta: imagen,
          mostrar: false, // No se muestra la original
          acertada: false, // No es acertada al inicio
        };
        // Poner dos veces la misma imagen
          tamano.push(imagenDeMemorama, Object.assign({}, imagenDeMemorama));
      });

       //solo tomar la cantidad requerida
      for (let i = 0; i < this.ciclo; i++) {
        memorama[i] = tamano[i];
      }

      // Sacudir o mover arreglo; es decir, hacerlo aleatorio
      this.mezclarArreglo(memorama);

      // Dividirlo en subarreglos o columnas
      let memoramaDividido = [];
      for (let i = 0; i < this.ciclo; i += this.COLUMNAS) {
        memoramaDividido.push(memorama.slice(i, i + this.COLUMNAS));
      }
      // Reiniciar intentos
      this.intentos = 0;
      this.aciertos = 0;
      // Asignar a instancia de Vue para que lo dibuje
      this.memorama = memoramaDividido;
    },
    // Método que precarga las imágenes para que las mismas ya estén cargadas
    // cuando el usuario gire la tarjeta
   /*  precargarImagenes() {
      // Mostrar la alerta
      Swal.fire({
        title: "Cargando",
        html: `Cargando imágenes...`,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(this.reiniciarJuego);
      // Ponerla en modo carga
      Swal.showLoading();

      let total = this.imagenes.length,
        contador = 0;
      let imagenesPrecarga = Array.from(this.imagenes);
      // También vamos a precargar la "espalda" de la tarjeta
      imagenesPrecarga.push(NOMBRE_IMAGEN_OCULTA);
      // Cargamos cada imagen y en el evento load aumentamos el contador
      imagenesPrecarga.forEach((ruta) => {
        const imagen = document.createElement("img");
        imagen.src = ruta;
        imagen.addEventListener("load", () => {
          contador++;
          if (contador >= total) {
            // Si el contador >= total entonces se ha terminado la carga de todas
            this.reiniciarJuego();
            Swal.close();
          }
        });
        // Agregamos la imagen y la removemos instantáneamente, así no se muestra
        // pero sí se carga
        document.body.appendChild(imagen);
        document.body.removeChild(imagen);
      });
    }, */
  },
  mounted() {
     if (localStorage.getItem('alto') === null && localStorage.getItem('ancho') === null) {
            this.$router.push("/gridgame")
        }else{
            let a;
            this.categoria = localStorage.getItem("categoria"),
            this.COLUMNAS = parseInt(localStorage.getItem("ancho")),
            this.alto = parseInt(localStorage.getItem("alto")),
            this.ciclo = (this.alto*this.COLUMNAS),
            
            this.llenarimagenes();

            switch(this.categoria){
                case 'anime':
                    this.rev = this.anime;
                    break;
                case 'aviones':
                    this.rev = this.aviones;
                    break;
                case 'carros':
                    this.rev = this.carros;
                    break;
                case 'frutas':
                    this.rev = this.frutas;
                    break;
                case 'juegos':
                    this.rev = this.juegos;
                    break;
                case 'peliculas':
                    this.rev = this.peliculas;
                    break;
                case 'musica':
                    this.rev = this.musica;
                    break;
            }
            
        }

    this.reiniciarJuego();
    this.contarSegundos();

  },
  
};
</script>

<style >
*{
  margin: 0;
  padding: 0;
  text-decoration: none;
  box-sizing: border-box;
}

.distancia {
  margin-bottom: 1px;

}

/* .tam {
  width: 500px;
  background: red;
} */
img.card-img-top.girar {
    animation: fadein 2s;
}
 .target-image6{
  /* width: 85%; */
  height: 60px;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: black;
} 
.imagen{
  width: 50px;
  height: 50px;
}
#ditanciadere {
  padding: 1px;
}
.tam2{
  margin-right: 1px;
}

body{
  overflow-y: hidden;
}

img {
   width:100%;
    max-width:400px;
  
}
</style>