<template>
  <div class="gridprincipal mx-0">
    <!--texto superior-->
    <div class="gridsecundario bg-info row sinpadding mb-1 mx-0 fondo2">
      <div class="col mx-0">
        <h1 class="tituloencabezado">{{ categoria }}</h1>
        <p>
          <img
            class="pausa"
            @click="Pausargame"
            src="../assets/pausa1.png"
            alt=""
          />

          <span>Intentos: </span> {{ intentos }} <span>Puntos: </span>
          {{ aciertos }}
          <img class="pausa" src="../assets/reloj2.gif" alt="" />
          {{ formatearTiempo() }}
        </p>
      </div>
    </div>

    <!--cartas-->
    <div
      v-for="(fila, indiceFila) in memorama"
      :key="indiceFila"
      class="row mx-0 sinpadding"
    >
      <div
        :key="indiceFila + '' + indiceImagen"
        class="col gridimage mx-0"
        v-for="(imagen, indiceImagen) in fila"
      >
        <div class="mb-1">
          <img
            @click="voltear(indiceFila, indiceImagen)"
            :class="{ girar: imagen.mostrar }"
            :src="imagen.mostrar ? imagen.ruta : NOMBRE_IMAGEN_OCULTA"
            class="target-image card-img-top img-fluid"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//Cronometro
function pad(str, length, character) {
  var str = "" + str;
  while (str.length < length) {
    /* console.log('pad' + character); */
    str = character + str;
  }
  return str;
}

function formatearTiempoDesdeSegundos(seg) {
  var str = "";
  var hora = null;
  var minuto = null;

  hora = Math.floor(seg / 60.0 / 60.0);
  str += pad(hora, 2, "0");

  minuto = Math.floor(seg / 60.0);
  while (minuto >= 60) {
    minuto -= 60;
  }
  str += ":" + pad(minuto, 2, "0");

  seg = Math.floor(seg);
  while (seg >= 60) {
    seg -= 60;
  }
  str += ":" + pad(seg, 2, "0");
  return str;
}
//Cronometro

const // Intentos máximos que tiene el jugador
  MAXIMOS_INTENTOS = 999,
  SEGUNDOS_ESPERA_VOLTEAR_IMAGEN = 1, // Por cuántos segundos mostrar ambas imágenes
  NOMBRE_IMAGEN_OCULTA =
    "https://assets.stickpng.com/images/5a4613eed099a2ad03f9c996.png";
export default {
  name: "Memorama",
  data: () => ({
    tiempo: 0,
    categoria: "",
    anime: [],
    aviones: [],
    carros: [],
    frutas: [],
    juegos: [],
    peliculas: [],
    musica: [],
    COLUMNAS: 0,
    alto: 0,
    ciclo: 0,

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
    tamano: [],
  }),
  methods: {
    llenarimagenes() {
      (this.anime = [
        "https://staticr1.blastingcdn.com/media/photogallery/2018/2/10/660x290/b_1200x680/itachi-uchiha-y-su-extrana-enfermedad_1830045.jpg",
        "https://www.lifeder.com/wp-content/uploads/2017/01/frases-de-Pain.jpg",
        "https://sm.ign.com/ign_latam/screenshot/default/naruto-kakashi_3e4u.jpg",
        "https://www.alfabetajuega.com/wp-content/uploads/2020/04/my-hero-academia-deku.jpg",
        "https://www.alfabetajuega.com/wp-content/uploads/2020/11/madara-naruto-portada.jpg",
        "https://i1.wp.com/www.bitme.gg/wp-content/uploads/2020/06/Naruto_-Los-cinco-jutsus-ma%CC%81s-poderosos-de-Sasuke-Uchiha.jpg?fit=1280%2C720&ssl=1",
        "https://cde.peru.com//ima/0/1/1/5/8/1158452/611x458/naruto-shippuden-ultimate-ninja-storm.jpg",
        "https://laverdadnoticias.com/__export/1594778665927/sites/laverdad/img/2020/07/14/minato_namikaze_naruto.png_1902800913.png",
        "https://www.ecured.cu/images/7/72/Tsunade_la_Princesa_Babosa_de_Konoha.jpg",
        "https://www.tierragamer.com/wp-content/uploads/2019/07/Naruto-Sakura-450x300.jpg",
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bc2dbe06-3205-4a59-b95f-6c9a3d86cc73/dbkwk42-7dfb0d02-64db-47d7-aa93-87805315fa79.png/v1/fill/w_1600,h_900,q_80,strp/generic_purple_wallpaper__hinata__by_ddevs_dbkwk42-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD05MDAiLCJwYXRoIjoiXC9mXC9iYzJkYmUwNi0zMjA1LTRhNTktYjk1Zi02YzlhM2Q4NmNjNzNcL2Ria3drNDItN2RmYjBkMDItNjRkYi00N2Q3LWFhOTMtODc4MDUzMTVmYTc5LnBuZyIsIndpZHRoIjoiPD0xNjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.3uUoyeIfCGz1ZjVAaS4TVGFCtgLY_bD5BWnYC_P0GWY",
        "https://www.alfabetajuega.com/wp-content/uploads/2019/08/dragon-ball-goku.jpg",
        "https://www.enfoquederecho.com/wp-content/uploads/2017/02/Vegeta.png",
        "https://sites.google.com/site/infoisobredragonballz/_/rsrc/1468744323465/villanos/villanos-yamcha/villanos-de-dragon-ball/villanos-de-dragon-ball-piccolo-damao/villanos-de-dragon-ball-z-la-saga-de-los-sayayin/villanos-de-dragon-ball-z-dodoria-y-zarbon/villanos-de-dragon-ball-z-las-fuerzas-especiales-ginyu/villanos-de-dragon-ball-z-mecha-frezeer/villanos-de-dragon-ball-z-king-cold/villanos-de-dragon-balll-z-los-androides/villanos-de-dragon-ball-z-cell/viilanos-de-dragon-ball-z-saga-buu-spopovich-y-yamu/villanos-de-dragon-ball-z-saga-buu-babidi/vilanos-de-dragon-ball-z-saga-buu-dabura/villanos-de-dragon-ball-z-saga-buu-majin-buu/falso.png",
        "https://depor.com/resizer/hjvLdq7s6Oexwmihpyv2qv0SC2k=/580x330/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/DLZ2LYRPOJELTGWUJAZWSNCZB4.jpg",
        "https://lasoga.org/wp-content/uploads/2020/09/dragon-ball-freezer.jpg",
        "https://pm1.narvii.com/6539/cb18a5103ab9936c082b798b83d77d4e38dff42a_00.jpg",
        "https://as.com/meristation/imagenes/2019/05/08/noticias/1557312106_849234_1557312170_noticia_normal.jpg",
        "https://sm.ign.com/ign_latam/screenshot/default/supercampeones_d8sa.jpg",
        "https://vignette.wikia.nocookie.net/super-campeones-info/images/a/a1/CT-2018-Benji-ep-002-073.jpg/revision/latest/scale-to-width-down/340?cb=20200218214147&path-prefix=es",
        "https://mx.toluna.com//dpolls_images/2015/08/10/a032b79d-7b12-4418-8d05-938b3ef10a82.jpg",
        "https://as.com/meristation/imagenes/2019/08/05/noticias/1565010078_514445_1565010136_noticia_normal.jpg",
        "https://larepublica.pe/resizer/XAjlHDld2KpUCfjlBbzTUdw4C4k=/1250x735/top/smart/arc-anglerfish-arc2-prod-gruporepublica.s3.amazonaws.com/public/XJUMONF2HVF5NJS7IRLQDEHWV4.jpg",
        "https://www.tierragamer.com/wp-content/uploads/2020/09/Ace-One-Piece-Manga-450x300.jpg",
        "https://es.web.img3.acsta.net/newsv7/20/03/19/11/27/1847917.jpg",
        "https://www.mor.bo/wp-content/uploads/2020/03/bleach-studio-pierrot-600x400.jpg",
        "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/ea794acfce79acaaf6c9489a4e9543a503d628ba18b24950796ca258cf468c30._V_SX1080_.jpg",
        "https://laverdadnoticias.com/__export/1604697332375/sites/laverdad/img/2020/11/06/personajes.png_478486366.png",
        "https://occ-0-1723-1722.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABTdXX0pleEG-sDruJpbuhQ0YR9p9V5M8MR6M8ft9goUfVwNR3kTIW9VuVtCU6_hJlicomJcbHpdHinGbuHiLWzLPNGA4.jpg?r=b6a",
        "https://sm.ign.com/ign_es/screenshot/default/ben-10-launch-screenshot1-1-1510067661_dgeh.jpg",
        "https://images.clarin.com/2011/11/23/tom-y-jerry-un-infaltable___Hy4EZbvlm_340x340__1.jpg",
        "https://vignette.wikia.nocookie.net/ededdyeddy/images/6/68/Ed%2CEdd_n_Eddy.jpg/revision/latest/scale-to-width-down/340?cb=20100601222032&path-prefix=es",
        "https://static2.abc.es/Media/201410/14/cartoons-hd-wallpapers-top--644x362.jpg",
        "https://www.yaconic.com/wp-content/uploads/2019/02/pinturas-similares-a-el-viaje-de-chihiro-comida.jpg",
        "https://eresmama.com/wp-content/uploads/2019/05/el-viaje-de-chihiro-sin-cara-500x375.jpg",
        "https://vignette.wikia.nocookie.net/elviajedechihiro/images/1/19/Images_%282%29.jpg/revision/latest/scale-to-width-down/340?cb=20130707065453&path-prefix=es",
        "https://vignette.wikia.nocookie.net/elviajedechihiro/images/f/f4/Images_%2853%29.jpg/revision/latest/scale-to-width-down/340?cb=20130708203211&path-prefix=es",
      ]),
        (this.aviones = [
          "https://www.preferente.com/wp-content/uploads/2019/08/airbus-a220-300-2jpg-30176825650556b1.jpg",
          "https://www.ecestaticos.com/imagestatic/clipping/868/9ca/8689ca73237158da46e457a120354717/por-que-los-aviones-comerciales-no-llevan-paracaidas-para-casos-de-emergencia.jpg?mtime=1593793065",
          "https://cdn.hispantv.com/hispanmedia/files/images/thumbnail/20171006/06330339_xl.jpg",
          "https://services.meteored.com/img/article/por-que-vuelan-los-aviones-205391-1_768.jpg",
          "https://static.iris.net.co/dinero/upload/images/2020/11/3/305564_1.jpg",
          "https://cdn.ticbeat.com/src/uploads/2019/03/aviones.jpeg",
          "https://static.t13.cl/images/original/2018/07/1532249407-102561197bank60k.jpg",
          "https://ep01.epimg.net/economia/imagenes/2019/11/04/actualidad/1572875434_603384_1572875593_noticia_normal.jpg",
          "https://static2.abc.es/media/noticias/2020/03/30/aviones-sevilla-kI3C--1200x630@abc.jpg",
          "https://estaticos.muyinteresante.es/uploads/images/article/5f0822635cafe88d8a35ca72/avion_0.jpg",
          "https://i.ytimg.com/vi/Drh1mpUrNGY/maxresdefault.jpg",
          "https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2020/09/25/16010583652225.jpg",
          "https://i.pinimg.com/originals/60/f4/e3/60f4e34a6ea2e907018ff0d502594978.jpg",
          "https://i.pinimg.com/originals/dc/d2/ca/dcd2cac6553f24135f72d42c1e2f3fee.jpg",
          "https://static2.abc.es/media/ciencia/2020/06/19/Formacin-de-Supermarine-Spitfire-k2tB--1024x512@abc.jpg",
          "https://cdnmundo3.img.sputniknews.com/img/106866/36/1068663667_0:510:4000:2670_1000x541_80_0_0_8f568b350b2bb60e22edc9eeec0e9165.jpg",
          "https://www.wradio.com.co/images/3930038_n_imgg.jpg?u=220226",
          "https://i.pinimg.com/originals/70/c6/0a/70c60a5d12873ffec985fbf2ef818375.jpg",
          "https://www.portafolio.co/files/article_multimedia/uploads/2018/12/11/5c0fdc01f37da.jpeg",
          "https://parkingaeropuertosevilla.net/wp-content/uploads/2016/10/a400m.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/P-51_F-15.jpg/300px-P-51_F-15.jpg",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjbu_zJ7qiL7xDJtRxRILaZ5HStasjcEJlLw&usqp=CAU",
          "https://www.mundoaviones.top/wp-content/uploads/2020/01/Los-aviones-de-la-Primera-Guerra-Mundial.jpg",
          "https://aviacionaldia.com/wp-content/uploads/2019/03/Avi%C3%B3n-Privado.jpg",
          "https://i.ytimg.com/vi/FicE6EiIZ2M/maxresdefault.jpg",
          "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2018/01/22/15166008839255.jpg",
          "https://s03.s3c.es/imag/_v0/641x450/8/7/5/aviones-privados-portada.jpg",
          "https://actualidadaeroespacial.com/wp-content/uploads/2020/01/Delta-y-Wheels-Up-300120.jpeg",
          "https://forbes.es/app/uploads/2017/11/01-GettyImages-450358587.jpg",
          "https://cdnmundo3.img.sputniknews.com/img/107695/67/1076956706_0:0:3072:2048_1000x666_80_0_0_09f4f00f38e664af089508f866ffab8d.jpg",
          "https://cdnmundo3.img.sputniknews.com/img/108515/86/1085158660_0:139:2200:1377_1200x0_80_0_1_beaf564836304c06829044c1523ef95d.jpg",
          "https://wwwhatsnew.com/wp-content/uploads/2019/08/NASA-X-43.jpg",
          "https://cdni.rbth.com/rbthmedia/images/2019.08/original/5d5ab6d115e9f95c88490c66.jpg",
          "https://i.pinimg.com/originals/1b/cf/84/1bcf8435ee678748653148d1bb0180ab.jpg",
          "https://okdiario.com/img/2017/03/27/aviones-militares-655x368.jpg",
          "https://cde.laprensa.e3.pe/ima/0/0/2/2/7/227943.jpg",
          "https://israelnoticias.com/wp-content/uploads/2020/03/Cazas-F-35-volando.jpg",
        ]),
        (this.carros = [
          "https://img.autocosmos.com/noticias/fotosprinc/NAZ_b65480612b9249c0885a3ec88c5641e1.jpg",
          "https://static.iris.net.co/soho/upload/images/2020/2/10/61074_1.jpg",
          "https://sites.google.com/site/imagenesdecarrosgratis/_/rsrc/1421516636272/home/carros-deportivos-lamborghini-aventador-tron_aventador.jpg",
          "https://i.pinimg.com/564x/dd/9a/98/dd9a98fd38f6f8c5d12da319f3dc3b52.jpg",
          "https://www.comparaonline.com.co/blog-statics/co/uploads/2020/03/BMW-estuvo-entre-las-cinco-marcas-que-m%C3%A1s-carros-de-lujo-vendi%C3%B3-en-2019.jpg",
          "https://www.las2orillas.co/wp-content/uploads/2017/03/carros-pequenos.jpg",
          "https://arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/MELOGRHFLJBRVIPDJFCVTKPVWI.jpg",
          "https://st1.uvnimg.com/dims4/default/0643a26/2147483647/resize/420x620%3E/quality/75/?url=http%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F86%2F0b%2F1608028d4fb0981be598a974a9ec%2Ftoyota-corolla-hatchback-2019-1280-04.jpg",
          "https://www.pruebaderuta.com/wp-content/uploads/2015/08/lamborghini-veneno-roadster-620x264.jpg",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWYv9AfFdBZ_O9-fzAr5r9YtlyBMalWbaJaA&usqp=CAU",
          "https://miamimundo.com/wp-content/uploads/2020/01/carros.jpg",
          "https://static.retail.autofact.cl/blog/c_img_740x370.1e2kns1jxux2ish.jpg",
          "https://cnnespanol.cnn.com/wp-content/uploads/2016/01/151214163854-coolest-winter-driving-experiences-lamborghini-super-169.jpg?quality=100&strip=info&w=320&h=240&crop=1",
          "https://ss-static-01.esmsv.com/id/63211/galeriaimagenes/obtenerimagen/?id=6377&tipoEscala=stretch&width=2048&height=1152",
          "https://icdn2.digitaltrends.com/image/digitaltrends_es/carros-de-lujo-05-03-19-feat.jpg",
          "https://img.autocosmos.com/noticias/fotosprinc/NAZ_b11a7a11233744a491f5bfcc68676b60.jpg",
          "https://cnet2.cbsistatic.com/img/1q68PpBi8v5-g1g78OcHMG9sh6c=/940x0/2020/07/14/56de5250-ca13-47e6-bcf2-bcb3aa43f9e2/2021-toyota-corolla-apex-01.jpg",
          "https://media.metrolatam.com/2019/07/09/collagesintitulo-0d1aa291c51ef532870248d6210cf6fa-1200x800.jpg",
          "https://st1.uvnimg.com/dims4/default/44ebbaa/2147483647/resize/420x620%3E/quality/75/?url=http%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fbf%2F56%2F0c2a44654a22a07e529ed4b7fc32%2Fresizes%2F1500%2Fautos-060919-a.jpg",
          "https://www.carroya.com/noticias/sites/default/files/entradillas/452118074toyotaseaglass2.jpg",
          "https://www.comparaonline.com.co/blog-statics/co/uploads/2019/11/seat-2260785_1920.png",
          "https://www.kienyke.com/sites/default/files/styles/amp_1200x675_16_9/public/wp-content/uploads/2018/10/WhatsApp-Image-2018-10-28-at-12.19.48-PM.jpeg?itok=m2E_1TED",
          "https://www.elespectador.com/resizer/isAOoYwLzklHBEB2X3SYv2HqpnI=/657x0/arc-anglerfish-arc2-prod-elespectador.s3.amazonaws.com/public/VTYNKYMJEZGVFNIOJ3QBOILFUE.jpg",
          "https://www.portalautomotriz.com/sites/portalautomotriz.com/files/styles/pa3_modal/public/media/photos/clasico.jpg?itok=QLT8cToS",
          "https://static.iris.net.co/finanzas/upload/images/2013/6/18/50180_121039_1.jpg",
          "https://cnnespanol.cnn.com/wp-content/uploads/2017/03/170321162454-dubai-police-bugatti-exlarge-169.jpg?quality=100&strip=info",
          "https://www.monederosmart.com/wp-content/uploads/2020/01/28361889_l-scaled-e1578946375995.jpg",
          "https://autosdeprimera.com/v2/wp-content/uploads/2017/07/carros-importados-mas-vendidos-1-semestre-2017-colombia-c.jpg",
          "https://fress.co/wp-content/uploads/2014/02/10-carros-mas-caros-del-mundo-fress-fressco.jpg",
          "https://qpasa.com/wp-content/uploads/2020/01/8-jeep-696x522.jpg",
          "https://www.kia.com/content/dam/kwcms/co/es/images/showroom/cars/kia-soluto-colombia.jpg",
          "https://www.singasolina.co/img/cms/cafeche1.jpg",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCP7dSCw91LFHEcC4-TLwJhvMdNn_BRnJUrw&usqp=CAU",
          "https://loscoches.com/wp-content/uploads/2019/09/carros-mas-vendidos-colombia.jpg",
          "https://i.pinimg.com/originals/c5/f9/56/c5f956cd20876e62210debe869270da1.jpg",
          "https://www.gamecored.com/wp-content/uploads/2019/08/need-for-speed-heat.jpg",
          "https://www.kienyke.com/sites/default/files/styles/amp_1200x675_16_9/public/wp-content/uploads/2019/08/marcas-de-carros.jpg?itok=s0H9mdxK",
        ]),
        (this.frutas = [
          "https://revistamercados.com/wp-content/uploads/2019/10/Marisol-fresa.png",
          "https://s3-eu-west-1.amazonaws.com/yara-links/n6fn.jpg",
          "https://saboryestilo.com.mx/wp-content/uploads/2019/02/frutos-rojos.jpg",
          "https://travelandleisure.mx/wp-content/uploads/2019/01/pina.jpg",
          "https://okdiario.com/img/vida-sana/2016/06/30/sandia.jpg",
          "https://www.llaollaoweb.com/blog/wp-content/uploads/2016/02/Pitaya-e1456313751763.jpg",
          "https://i.blogs.es/40d04f/tangerines-1721633_1280-1-/450_1000.jpg",
          "https://www.hogarmania.com/archivos/201906/naranja-vitaminac-1280x720x80xX.jpg",
          "https://saboryestilo.com.mx/wp-content/uploads/2019/06/beneficios-del-melon-1-1200x720.jpg",
          "https://statics-cuidateplus.marca.com/sites/default/files/platanos_0.jpg",
          "https://dam.cocinafacil.com.mx/wp-content/uploads/2020/08/kiwi.jpg",
          "https://www.prensalibre.com/wp-content/uploads/2019/09/fruit-1534494_960_720.jpg?quality=82&w=760&h=430&crop=1",
          "https://storage.googleapis.com/portalfruticola/2019/11/53310a37-palta-adobestock_263808000-1024x683.jpeg",
          "https://s1.eestatic.com/2020/02/12/ciencia/nutricion/Fruta-Fibra-Salud-Nutricion_466965468_145009314_1024x576.jpg",
          "https://www.hogarmania.com/archivos/201305/melocotones-xl-1280x720x80xX.jpg",
          "https://static3.abc.es/media/bienestar/2019/11/13/granada-kcYD--1024x512@abc.jpg",
          "https://i.blogs.es/d202f8/persimon-marco/1366_2000.jpg",
          "https://www.lavanguardia.com/files/og_thumbnail/uploads/2018/06/26/5e997cc1247ab.jpeg",
          "https://mercadoabastocordoba.com/wp-content/uploads/2016/01/CIRUELA-500x300.jpg",
          "https://www.unotv.com/uploads/2020/09/salmonella-en-duraznos-000-1.jpg",
          "https://www.campusdelvino.com/media/k2/items/cache/39a27618f1dc54b80987c6706135e6b7_XL.jpg",
          "https://storage.googleapis.com/portalfruticola/2019/07/60e79e66-uva-shutterstock_130380677-1024x683.jpg",
          "https://static1.abc.es/media/bienestar/2020/03/24/arandanos-ficha-kbQD--1024x512@abc.jpg",
          "https://www.hola.com/imagenes/cocina/noticiaslibros/20200505167186/diferencia-arandanos-rojos-azules/0-819-201/arandanos-diferencias-m.jpg",
          "https://static2.abc.es/media/bienestar/2020/08/04/frambuesas-fichas-khKE--1200x630@abc.jpeg",
          "https://storage.googleapis.com/portalfruticola/2019/12/40af7ccd-cerezas-adobestock_65867905-e1581534170908.jpeg",
          "https://www.laprensa.hn/csp/mediapool/sites/dt.common.streams.StreamServer.cls?STREAMOID=X4ZaoTNeJFf_Nx1M3gqc2M$daE2N3K4ZzOUsqbU5sYtgH2$oeYlKdrFmWBNd8wWyWCsjLu883Ygn4B49Lvm9bPe2QeMKQdVeZmXF$9l$4uCZ8QDXhaHEp3rvzXRJFdy0KqPHLoMevcTLo3h8xh70Y6N_U_CryOsw6FTOdKL_jpQ-&CONTENTTYPE=image/jpeg",
          "https://cuidateplus.marca.com/sites/default/files/styles/natural/public/papaya_0.jpg",
          "https://www.ecestaticos.com/image/clipping/1200/675/bb13300e273dd9809a72b9cd87659522/coco-es-sanisimo-y-que-este-de-moda-no-es-casualidad.jpg?mtime=1579565836",
          "https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2017/01/20092322/maracuya-1920-2.jpg",
          "https://agraria.pe/imgs/a/lx/productores-de-oxapampa-mejoran-calidad-genetica-de-la-grana-15537.jpg",
          "https://www.65ymas.com/uploads/s1/22/69/84/tomate.jpeg",
          "https://www.hola.com/imagenes/cocina/recetas/20191029152655/recetas-membrillo-producto-temporada/0-738-789/membrillo-adobe-z.jpg",
          "https://frutasyverduras.info/wp-content/uploads/2018/05/toronja.jpg",
          "https://www.lavanguardia.com/files/og_thumbnail/uploads/2018/09/30/5e9976f576bca.jpeg",
          "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/frutas-1552246920.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Berries_in_Berlin.jpg/1200px-Berries_in_Berlin.jpg",
        ]),
        (this.juegos = [
          "https://i.ytimg.com/vi/BBntD3VynRY/hqdefault.jpg",
          "https://miracomosehace.com/wp-content/uploads/mch/id_4140.jpg",
          "https://cnet1.cbsistatic.com/img/l8RbnOsHzo6C0fHx-A7yGCDZxGI=/1200x675/2019/09/18/c07d7cfa-5cc7-4d64-a3bb-aabf6b778dcc/call-of-duty-mobile.jpg",
          "https://i.ytimg.com/vi/_K7YhuZa4QQ/maxresdefault.jpg",
          "https://vignette.wikia.nocookie.net/tomb-raider/images/a/ad/TR2013_Portada_cuadrada.png/revision/latest?cb=20180305194222&path-prefix=es",
          "https://www.muycomputer.com/wp-content/uploads/2019/09/Epic-Games-Store-BatmanTrilogy-Gratis-e1568965379179.jpg",
          "https://cr00.epimg.net/radio/imagenes/2018/09/10/tecnologia/1536585385_722906_1536586923_noticia_normal.jpg",
          "https://s3.gaming-cdn.com/images/products/824/orig/need-for-speed-cover.jpg",
          "https://steamcdn-a.akamaihd.net/steam/apps/349040/capsule_616x353.jpg?t=1605601927",
          "https://static.wixstatic.com/media/d6456f_399fafcf99c3426ead49868d37d9beb2~mv2.png/v1/fill/w_977,h_729,al_c,lg_2,q_90,usm_0.66_1.00_0.01/Titulo.webp",
          "https://i2.wp.com/pivigames.blog/wp-content/uploads/2019/05/Descargar-BLUR-PC-Espa%C3%B1ol-Gratis.jpg?fit=620%2C350&ssl=1",
          "https://i.ytimg.com/vi/vCgmULcmYOc/maxresdefault.jpg",
          "https://depor.com/resizer/fQzmi5xipslm-EaJADorylg0s50=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/XSGPIAL4CFADBMIL4LMTTVGDZI.jpg",
          "https://hipertextual.com/files/2020/04/hipertextual-lords-mobile-se-renueva-y-sortea-macbook-pro-y-ps4-celebrarlo-2020856144.jpg",
          "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/03/28/15537334218713.jpg",
          "https://cdn.game.tv/game-tv-content/images_2/mobile/game_banner/fcad9e099e98f684b3b5496e1bd75ddf/en/fcad9e099e98f684b3b5496e1bd75ddf.jpg",
          "https://steamcdn-a.akamaihd.net/steam/apps/1064270/capsule_616x353.jpg?t=1594696879",
          "https://elandroidelibre.elespanol.com/wp-content/uploads/2019/05/League-of-Legends-destacada.jpg",
          "https://static1.abc.es/media/tecnologia/2020/08/17/fort-k68F--620x349@abc.jpg",
          "https://as.com/meristation/imagenes/2020/05/09/noticias/1589032194_187525_1589032404_noticia_normal.jpg",
          "https://www.lavanguardia.com/r/GODO/LV/p7/WebSite/2020/09/09/Recortada/img_mbrugat_20200909-121233_imagenes_lv_terceros_1599479218_889550_1599479298_noticia_normal-kOzF-U483385684527U8G-992x558@LaVanguardia-Web.jpg",
          "https://bitwares.files.wordpress.com/2020/08/maxresdefault.jpg?w=1280",
          "https://i.blogs.es/dfbccc/trucosgtavps4/1366_2000.jpg",
          "https://www.minecraft.net/content/dam/games/minecraft/key-art/Games_Subnav_Minecraft-300x465.jpg",
          "https://i.blogs.es/de368e/dota-2-wallpaper/1366_2000.jpg",
          "https://image.api.playstation.com/cdn/UP0006/CUSA08724_00/knyiQNrzbp6tEe8t04AYRhhJUF5wLIGO.png",
          "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2018/03/pubg-mobile-portada.jpg?itok=59HwvgT8",
          "https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_Warframe.jpg",
          "https://n9e5v4d8.ssl.hwcdn.net/uploads/c7bd5567579bb5e9c30fe31fb724e5f7.jpg",
          "https://depor.com/resizer/lHaubYVw73ciQACvopHNNwbnq4k=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/CL4BJNQS4VDWJMQGBKY74ZHAAU.jpg",
          "https://esports.as.com/2019/05/14/cs-go/partida-presencial-larga-CSGO-rondas_1245185514_158040_1440x600.jpg",
          "https://i.ytimg.com/vi/XqzFqfyv7qc/maxresdefault.jpg",
          "https://fotos02.laopiniondemurcia.es/mmp/2018/04/05/1024x341/wotmusiccover-1.jpg",
          "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2017/06/destiny_2_caratula.png?itok=3014kE94",
          "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop191x100.1200w.jpg",
          "https://bnetcmsus-a.akamaihd.net/cms/blog_thumbnail/u9/U9OR9LSH8R7U1590775227064.png",
          "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/07/26/15641703332704.jpg",
        ]),
        (this.peliculas = [
          "https://estaticos.muyinteresante.es/uploads/images/article/58c7ce615cafe870917e529c/elpadrino_0.jpg",
          "https://lamenteesmaravillosa.com/wp-content/uploads/2014/02/Hachiko.jpg",
          "https://es.web.img2.acsta.net/pictures/17/06/15/11/08/353746.jpg",
          "https://fundacioncirro.files.wordpress.com/2014/01/en-busca-de-la-felicidad.jpg",
          "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/07/19/15951914642129.jpg",
          "https://es.web.img2.acsta.net/pictures/17/09/14/10/49/2019727.jpg",
          "https://r1.abcimg.es/resizer/resizer.php?imagen=https%3A%2F%2Fstatic3.abc.es%2Fmedia%2Fpeliculas%2F000%2F023%2F844%2Fratatouille-1.jpg&nuevoancho=690&medio=abc",
          "https://pics.filmaffinity.com/Forrest_Gump-212765827-large.jpg",
          "https://i.ytimg.com/vi/eTGysRd9qNM/maxresdefault.jpg",
          "https://www.recursosyhabilidades.com/cmsAdmin/uploads/o_1c6k6tvrp17iq16ki1me51rn81hcma.jpg",
          "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/08/11/15971559642829.jpg",
          "https://as.com/tikitakas/imagenes/2019/04/26/portada/1556258369_131914_1556258703_noticia_normal.jpg",
          "https://pics.filmaffinity.com/Toy_Story-626273371-large.jpg",
          "https://noti-notisistema.netdna-ssl.com/noticias/wp-content/media/2019/02/Intocable.jpg",
          "https://es.web.img3.acsta.net/medias/nmedia/18/67/06/38/20350558.jpg",
          "https://i.pinimg.com/474x/7e/a9/1b/7ea91b38c5ede8e8f4da7df7ace0a790.jpg",
          "https://icdn2.digitaltrends.com/image/digitaltrends_es/dumboheader.jpg",
          "https://m.media-amazon.com/images/M/MV5BMTA1NDQ3NTcyOTNeQTJeQWpwZ15BbWU3MDA0MzA4MzE@._V1_.jpg",
          "https://m.media-amazon.com/images/M/MV5BMmYxZWY2NzgtYzJjZC00MDFmLTgxZTctMjRiYjdjY2FhODg3XkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_UY1200_CR85,0,630,1200_AL_.jpg",
          "https://es.web.img2.acsta.net/pictures/14/05/27/12/07/438875.jpg",
          "https://www.ecartelera.com/carteles/5600/5676/003_m.jpg",
          "https://es.web.img3.acsta.net/medias/nmedia/18/70/92/02/20149073.jpg",
          "https://es.web.img2.acsta.net/medias/nmedia/18/90/11/84/20081758.jpg",
          "https://www.ecured.cu/images/0/0c/1369-la.dama.y.el.vagabundo-.jpg",
          "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2016/11/big-hero-6.jpg?itok=NuXBAXDV",
          "https://m.media-amazon.com/images/I/51kIArG7kzL.jpg",
          "https://www.biodiversidadvirtual.org/etno/data/media/609/Wall.E-Batallon-de-limpieza-51879.jpg",
          "https://i.ytimg.com/vi/CRhSIUFFRgU/maxresdefault.jpg",
          "https://es.web.img2.acsta.net/pictures/14/04/01/10/42/226928.jpg",
          "https://pics.filmaffinity.com/Princesa_por_accidente-124935121-large.jpg",
          "https://pics.filmaffinity.com/Los_nuevos_mutantes-737308298-large.jpg",
          "https://diablorock.com/wp-content/uploads/2018/11/Bohemian-Rhapsody-poster.jpg",
          "https://media.gq.com.mx/photos/5ce19f41d09b9ac33d16885a/16:9/w_1920,c_limit/john%20wick%203.jpg",
          "https://studiosol-a.akamaihd.net/uploadfile/letras/playlists/9/2/9/d/929deda6025a4428b2607b5b9992b596.jpg",
          "https://lamenteesmaravillosa.com/wp-content/uploads/2015/02/un-sueno-posible.jpg",
          "https://i.pinimg.com/originals/d9/1a/60/d91a60a305245f51a136279e75ff99af.jpg",
          "https://i.ytimg.com/vi/4XkWfpTTbE8/maxresdefault.jpg",
        ]),
        (this.musica = [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkPBt1reqR68FqRxP-eLnWHEdewFlw_Epx2g&usqp=CAU",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlrMJtC-RnOhwHFzMb2lRmaGXc0HNzYI9gaQ&usqp=CAU",
          "https://imagenes.20minutos.es/files/article_amp/files/fp/uploads/2018/09/14/781666.r_d.262-231-0.jpg",
          "https://alfaenlinea.com/wp-content/uploads/cache_img/Blog_20170216_Alfa_ArtistasMichael-600x400-n4c1mlyd6bbdbmtsxtwbdpdnpqdtvwu5xn0esb2940.jpg",
          "https://los40es00.epimg.net/los40/imagenes/2019/03/15/musica/1552668518_058414_1552668655_noticia_normal.jpg",
          "https://cflvdg.avoz.es/default/2017/12/21/00121513853160833518700/Foto/j18d7023.jpg",
          "https://s3.amazonaws.com/s3.timetoast.com/public/uploads/photos/6907718/michael.jpg",
          "https://st-listas.20minutos.es/images/2013-04/359660/3991638_640px.jpg?1366229504",
          "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/03/16/15843697699924.jpg",
          "https://e.an.amtv.pe/espectaculos-sulli-artistas-k-pop-lamentan-muerte-cantante-y-cancelan-sus-actividades-n392183-612x406-623528.jpg",
          "https://ugc.kn3.net/i/760x/http://www.santafestereo.com/wp-content/uploads/2012/11/madonna-2012-hd.jpg",
          "https://i.ytimg.com/vi/wSgv5Vbvnok/maxresdefault.jpg",
          "https://happyfm.es/wp-content/uploads/2018/12/estos-son-los-artistas-k-pop-que-van-a-comenzar-su-servicio-militar-en-2019-01.jpg",
          "https://los40es00.epimg.net/los40/imagenes/2018/12/05/musica/1544019080_470550_1544029760_noticia_normal.jpg",
          "https://s3.amazonaws.com/s3.timetoast.com/public/uploads/photos/6666554/descarga_%282%29.jpg",
          "https://4.bp.blogspot.com/_ahWXDB_ujRM/Srfitwn3AVI/AAAAAAAADvA/0QiHpEYzKgQ/s320/Wallpaper.jpg",
          "https://pm1.narvii.com/6474/13bf9512946157a30030434931840e6647caba0e_00.jpg",
          "https://i.pinimg.com/originals/6b/c3/10/6bc310290e12894769fa674d326a7fd3.jpg",
          "https://garajedelrock.com/wp-content/uploads/2020/10/ACDC-1-600x400.jpg",
          "https://i.ibb.co/SRPG6HT/mejores-bandas-de-rock-7.jpg",
          "https://images3.alphacoders.com/553/thumb-1920-553567.jpg",
          "https://i1.wp.com/www.sopitas.com/wp-content/uploads/2020/12/sopitas-te-regala-guitarra-autografiada-angus-young-ac-dc.png",
          "https://i.pinimg.com/originals/bc/b6/41/bcb6413b2dc15017e929430544b3ac94.jpg",
          "https://www.beatmashmagazine.com/wp-content/uploads/2015/06/skrillex.jpg",
          "https://www.buenamusica.com/media/fotos/cantantes/biografia/alan-walker.jpg",
          "https://image.slidesharecdn.com/artistasdemsicaelectrnica-130313213439-phpapp02/95/artistas-de-msica-electrnica-6-638.jpg?cb=1363210514",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnBHK82TsZlkwU0Kyb3xx4eLP6_gEUojZfGg&usqp=CAU",
          "https://eyeife.com/wp-content/uploads/2019/04/dennis-ever-festival-eyeife.jpg",
          "https://st-listas.20minutos.es/images/2012-02/319387/3375704_640px.jpg?1328316378",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnBiu0vSJ5ljHyvQuN89xf_j_V-6eDAN3Ncw&usqp=CAU",
          "https://allmusicspain.com/wp-content/uploads/2019/06/AVICII-TIM-420x270.jpeg",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ILUjfGRD88LqomBT-75-yQZXqcqUXc5vxg&usqp=CAU",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROnHbpDgYbLrLxbbIMfr2n-bn1RKdLWAjZEA&usqp=CAU",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTJR6kl07_OrpLj67UDs8fjwCNDebTzUxAEQ&usqp=CAU",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIuZjuNUNXnj36LpQIi-bAhUQ0JrPVRR8BFw&usqp=CAU",
          "https://pabloadan.es/wp-content/uploads/2014/11/festa_rock_roll1.jpg",
        ]);
    },

    //cronometro
    continuarTiempo: function (event) {
      this.tiempo = parseInt(localStorage.tiempo);
    },
    pararTiempo: function (event) {
      this.tiempo = null;
    },
    reiniciarTiempo: function (event) {
      /*  event.preventDefault(); */
      //this.tiempo = null;
      this.tiempo = 0;
      this.guardarEnLocalStorage();
    },
    formatearTiempo: function () {
      return formatearTiempoDesdeSegundos(this.tiempo);
    },
    guardarEnLocalStorage: function () {
      localStorage.tiempo = this.tiempo;
    },

    contarSegundos: function () {
      var self = this;
      setInterval(function () {
        if (self.tiempo !== null) {
          self.tiempo++;

          self.guardarEnLocalStorage();
        }
      }, 1000);
    },
  
 
    // Mostrar alerta de victoria y reiniciar juego
    Pausargame() {
      this.pararTiempo(),
        swal({
          icon:
            "https://4.bp.blogspot.com/-nILIXNvdCbM/WVJ6lrPV8XI/AAAAAAAABL8/-iex1ceb6OwjcJ3De3mDYR6MX9B0ATGywCLcBGAs/s640/Pausa.jpg",

          buttons: {
            reanudar: {
              text: "Reanudar",
            },

            salir: {
              text: "Salir",
            },
          },

          closeOnClickOutside: false,
          allowOutsideClick: false,
        }).then((data) => {
          switch (data) {
            case "reanudar":
              this.continuarTiempo();
              break;

            case "salir":
              this.$router.replace("/categorias") + this.pararTiempo();
              break;
          }
        });
    },
    indicarVictoria() {
      var resultado = this.aciertos;
      var intentos = this.intentos;
      var tiempo = this.tiempo;
      Swal.fire({
        title: "¡Ganaste!",
        html: `
                <img class="img-fluid" src="https://image.freepik.com/vector-gratis/copa-ganadores-oro_1284-18399.jpg" alt="Ganaste">
                <p class="h4">Bien Jugado</p> Puntos:${resultado}
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
      this.tiempo = 0;

      let memorama = [];
      let tamano = [];
      let rev = [];
      rev = this.rev;

      this.mezclarArreglo(rev);
      this.imagenes = rev;

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
  },
  mounted() {
    if (
      localStorage.getItem("alto") === null &&
      localStorage.getItem("ancho") === null
    ) {
      this.$router.push("/gridgame");
    } else {
      let a;
      (this.categoria = localStorage.getItem("categoria")),
        (this.COLUMNAS = parseInt(localStorage.getItem("ancho"))),
        (this.alto = parseInt(localStorage.getItem("alto"))),
        (this.ciclo = this.alto * this.COLUMNAS),
        this.llenarimagenes();

      switch (this.categoria) {
        case "anime":
          this.rev = this.anime;
          break;
        case "aviones":
          this.rev = this.aviones;
          break;
        case "carros":
          this.rev = this.carros;
          break;
        case "frutas":
          this.rev = this.frutas;
          break;
        case "juegos":
          this.rev = this.juegos;
          break;
        case "peliculas":
          this.rev = this.peliculas;
          break;
        case "musica":
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
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  box-sizing: border-box;
}
.sinpadding {
  margin: 0;
  padding: 0;
}
.gridsecundario {
  border-left: solid 3px white;
  border-right: solid 3px white;
  border-bottom: solid 3px white;
  text-align: center;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  height: auto;
}
.tituloencabezado {
  text-transform: capitalize;
  color: white;
  font-family: fantasy;
  font-size: 35px;
  border-block-color: initial;
}

.col {
  width: 99%;
  height: 99%;
  margin: auto;
  position: relative;
}
.gridimage img {
  position: absolute;
  height: 99%;
  width: 99%;
  top: 0px;
  left: 0px;
  border-radius: 15px;
}
/* swal */
.swal-overlay {
  background-color: rgba(0, 0, 0, 0.8);
}
.swal-modal {
  border: 3px solid rgb(255, 255, 255);
}
.swal-title {
  margin: 0px;
  font-size: 18px;
  margin-bottom: 28px;
  color: #000;
  text-transform: uppercase;
}

.swal-text {
  color: black;
}
.swal-footer {
  background-color: rgb(245, 248, 250);
  margin-top: 32px;
  border-top: 1px solid #bac2c7;
  overflow: hidden;
  text-align: center;
}
.swal-button {
  padding: 10px 19px;
  border-radius: 5px;
  font-size: 12px;
  border: 1px solid #000000;
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.3);
  color: rgb(255, 255, 255);
}

.swal-button--home {
  background-color: rgba(255, 0, 0, 0.952);
}
/*fondos*/

.gridprincipal {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 120px auto;
  background: url("../assets/fondo1.jpg");
}

/* sin pading */
.gridimage {
  padding: 0px 2px;
}
.target-image {
  width: 99%;
  position: relative;
  border-radius: 9px;
  border-style: solid;
  border-width: 1px;
  border-color: black;
}
img.card-img-top.girar {
  animation: fadein 2s;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/*animacion del boton*/

.img-btn {
  width: 11px;
  height: 11px;
}

.pausa {
  width: 40px;
}
.imagen {
  width: 50px;
  height: 50px;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-1000px) rotate(360deg);
    opacity: 0;
  }
}
</style>
