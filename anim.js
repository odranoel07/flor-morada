// -*- coding: utf-8 -*-
// ?? Referencias ??????????????????????????????????????????????????????
var audio1       = document.getElementById("audio1");
var audio2       = document.getElementById("audio2");
var lyrics       = document.getElementById("lyrics");
var catScene     = document.getElementById("cat-scene");
var moonScene    = document.getElementById("moon-scene");
var moonL        = document.getElementById("moonLeft");
var moonR        = document.getElementById("moonRight");
var carta        = document.getElementById("carta");
var cartaText    = document.getElementById("carta-text");
var cursor       = document.getElementById("cursor");
var btnCerrar    = document.getElementById("btnCerrar");
var shootingStar = document.getElementById("shooting-star");
var floresDiv    = document.querySelector(".flowers");
var nightDiv     = document.querySelector(".night");
var leoBg        = document.getElementById("leo-bg");
var leoFinal     = document.getElementById("leo-final");

// ????????????????????????????????????????????????????????????????????
// MENSAJE QUE APARECE EN VEZ DE LAS LETRAS DE LA CANCI?N
// Se muestra en fragmentos sincronizados con el audio
// ????????????????????????????????????????????????????????????????????
var lyricsData = [
  { text: "Hola, espero que est\u00e9s bien.", time: 5 },
  { text: "Me acord\u00e9 de que ibas a empezar esta nueva etapa...", time: 16 },
  { text: "...combinando trabajo y estudios.", time: 27 },
  { text: "Ten\u00eda curiosidad por saber c\u00f3mo te est\u00e1 yendo.", time: 38 },
  { text: "Imagino que deben ser d\u00edas bastante ocupados y cansados...", time: 50 },
  { text: "...pero s\u00e9 que eres una persona muy dedicada.", time: 62 },
  { text: "Espero que sigas avanzando poco a poco.", time: 74 },
  { text: "No olvides darte un respiro de vez en cuando.", time: 86 },
  { text: "Reconoce todo el esfuerzo que haces cada d\u00eda.", time: 98 },
  { text: "A veces uno olvida lo mucho que ya ha avanzado.", time: 110 },
  { text: "Espero que esta etapa te deje experiencias y aprendizajes.", time: 122 },
  { text: "Momentos que te ayuden a crecer.", time: 134 },
  { text: "Y cuando tengas un poco de tiempo...", time: 146 },
  { text: "...me gustar\u00eda saber c\u00f3mo te ha ido. \ud83d\ude0a", time: 158 },
  { text: "Sigue adelante. Vas muy bien. \u2728", time: 172 },
];

// Mensaje motivacional para la segunda canción
var lyricsData2 = [
  { text: "NUNCA DUDES DE TI \u2728",                          time: 5   },
  { text: "T\u00da SABES QUE PUEDES",                          time: 18  },
  { text: "CON TODO EL MUNDO \ud83d\udcab",                    time: 30  },
  { text: "ERES UNA MUJER",                                    time: 45  },
  { text: "QUE JAM\u00c1S PODR\u00c1N COMPARAR CON NADIE",      time: 57  },
  { text: "PORQUE T\u00da ERES DIFERENTE",                      time: 72  },
  { text: "AL RESTO DE PERSONAS \ud83c\udf1f",                 time: 84  },
  { text: "\u00daNICA",                                        time: 100 },
  { text: "\u2728 \u00daNICA \u2728",                          time: 118 },
  { text: "NUNCA LO OLVIDES \ud83d\udc9c",                     time: 135 },
];

// ????????????????????????????????????????????????????????????????????
// ESTADO
// ????????????????????????????????????????????????????????????????????
var usingSong2       = false;
var catShown         = false;
var moonShown        = false;
var moonSplit        = false;
var cartaOpen        = false;
var shootingStarDone = false;
var floresFading     = false;

var SONG1_DURATION  = 233;
var CAT_APPEAR_TIME = SONG1_DURATION - 25;
var CAT_SHOW_MS     = 7000;
var FINALE_TIME     = 145;

// ????????????????????????????????????????????????????????????????????
// LOOP LETRAS / MENSAJE
// ????????????????????????????????????????????????????????????????????
function updateLyrics() {
  var activeAudio = usingSong2 ? audio2 : audio1;
  var activeData  = usingSong2 ? lyricsData2 : lyricsData;
  var time        = activeAudio.currentTime;

  // Ocultar letras cuando la carta está abierta, o cuando está el gatito o la luna
  if (cartaOpen || catShown || moonShown) {
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
    return;
  }

  var currentLine = null;
  for (var i = activeData.length - 1; i >= 0; i--) {
    if (time >= activeData[i].time && time < activeData[i].time + 9) {
      currentLine = activeData[i]; break;
    }
  }
  if (currentLine) {
    lyrics.style.opacity = 1;
    lyrics.innerHTML = currentLine.text;
  } else {
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }

  // Clase especial para el mensaje de la segunda canción (letras grandes)
  if (usingSong2) {
    lyrics.classList.add("bold-msg");
  } else {
    lyrics.classList.remove("bold-msg");
  }

  if (!usingSong2 && !catShown && time >= CAT_APPEAR_TIME) mostrarGatito();
  if (usingSong2 && !shootingStarDone && audio2.currentTime >= FINALE_TIME) iniciarFinale();
}
setInterval(updateLyrics, 250);

audio1.addEventListener("ended", function () {
  usingSong2 = true;
  audio2.play().catch(function(){});
});

// ????????????????????????????????????????????????????????????????????
// GATITO
// ????????????????????????????????????????????????????????????????????
function mostrarGatito() {
  catShown = true;
  catScene.classList.add("visible");
  setTimeout(function () {
    catScene.classList.remove("visible");
    setTimeout(mostrarLuna, 1200);
  }, CAT_SHOW_MS);
}

// ????????????????????????????????????????????????????????????????????
// LUNA
// ????????????????????????????????????????????????????????????????????
function mostrarLuna() {
  if (moonShown) return;
  moonShown = true;
  moonScene.classList.add("visible");
  setTimeout(partirLuna, 3500);
}

function partirLuna() {
  if (moonSplit) return;
  moonSplit = true;
  moonL.classList.add("split-left");
  moonR.classList.add("split-right");
  setTimeout(function () {
    if (cartaOpen) return;
    cartaOpen = true;
    carta.classList.add("open");
    lanzarEstrellas();
    if (!usingSong2) {
      audio1.pause();
      usingSong2 = true;
      audio2.play().catch(function(){});
    }
    setTimeout(iniciarEscritura, 800);
  }, 1000);
}

// ????????????????????????????????????????????????????????????????????
// CARTA ? escritura animada (mensaje completo)
// ????????????????????????????????????????????????????????????????????
var mensajeCarta =
"Hola,\n\n" +
"Quer\u00eda escribirte unas palabras porque, entre tantas cosas que haces " +
"durante el d\u00eda, espero que encuentres unos minutos para sonre\u00edr al leer esto.\n\n" +
"Primero, quiero decirte que sigo sin entender c\u00f3mo logras sobrevivir a una " +
"rutina de trabajo y estudios tan intensa. Estoy convencido de que en alg\u00fan " +
"momento descubriste el secreto para que los d\u00edas tengan m\u00e1s de 24 horas " +
"y simplemente no se lo has contado a nadie.\n\n" +
"Fuera de bromas, admiro mucho el esfuerzo que pones en todo lo que haces. " +
"No porque todo te resulte f\u00e1cil, sino porque sigues adelante incluso cuando " +
"las cosas se ponen dif\u00edciles. Eso es algo que no todo el mundo tiene.\n\n" +
"Tambi\u00e9n quer\u00eda agradecerte porque fue una bonita casualidad haber coincidido " +
"contigo. Conocerte me dej\u00f3 buenos recuerdos, conversaciones divertidas y m\u00e1s " +
"de una sonrisa que apareci\u00f3 cuando menos la esperaba.\n\n" +
"Espero que esta nueva etapa te traiga muchas experiencias, aprendizajes y " +
"momentos felices. Y si alg\u00fan d\u00eda el cansancio intenta convencerte de que no " +
"puedes, recuerda todo lo que ya has conseguido hasta ahora. Has llegado m\u00e1s " +
"lejos de lo que muchas veces crees.\n\n" +
"Por cierto, no olvides descansar de vez en cuando. El mundo puede esperar " +
"unos minutos mientras recuperas energ\u00eda, aunque sospecho que t\u00fa intentar\u00e1s " +
"demostrar que puedes hacer tres cosas al mismo tiempo.\n\n" +
"Te deseo lo mejor en todo lo que viene. Sigue avanzando, sigue aprendiendo " +
"y sigue siendo esa persona que trabaja por sus metas con tanta determinaci\u00f3n.\n\n" +
"Y cuando tengas un momento libre entre trabajo, estudios y tu aparente " +
"habilidad para desafiar las leyes del tiempo, me encantar\u00e1 saber c\u00f3mo te est\u00e1 yendo.\n\n" +
"Cu\u00eddate mucho y no olvides sonre\u00edr. \ud83d\ude0a";

function iniciarEscritura() {
  var idx = 0, base = 22;
  function escribir() {
    if (idx >= mensajeCarta.length) {
      cursor.style.display = "none";
      btnCerrar.classList.add("show");
      return;
    }
    var ch = mensajeCarta[idx];
    cartaText.innerHTML += (ch === "\n") ? "<br>" : ch;
    idx++;
    carta.scrollTop = carta.scrollHeight;
    var next = base;
    if (ch === "." || ch === "!" || ch === "?") next = base * 9;
    else if (ch === ",")  next = base * 5;
    else if (ch === "\n") next = base * 12;
    else if (ch === " ")  next = base * 0.35;
    setTimeout(escribir, next);
  }
  escribir();
}

// ????????????????????????????????????????????????????????????????????
// FINALE
// ????????????????????????????????????????????????????????????????????
function iniciarFinale() {
  shootingStarDone = true;
  carta.classList.remove("open");
  setTimeout(function () { moonScene.classList.remove("visible"); }, 600);
  setTimeout(desvanecerFlores, 1400);
  // Leo + helado + texto aparecen juntos
  setTimeout(mostrarLeoFinal, 2800);
}

function desvanecerFlores() {
  if (floresFading) return;
  floresFading = true;
  if (floresDiv) { floresDiv.style.transition="opacity 3s ease"; floresDiv.style.opacity="0"; setTimeout(function(){floresDiv.style.display="none";},3100); }
  if (nightDiv)  { nightDiv.style.transition="opacity 3s ease";  nightDiv.style.opacity="0";  setTimeout(function(){nightDiv.style.display="none";}, 3100); }
  if (leoBg)     { leoBg.style.transition="opacity 3s ease";     leoBg.style.opacity="0.6"; }
}

function dispararEstrellaFugaz() { /* integrado en leo-final */ }

function mostrarLeoFinal() {
  if (!leoFinal) return;
  leoFinal.classList.add("visible");
  // Mensaje del helado aparece 1.5s después con animación
  setTimeout(function () {
    var h = document.getElementById("helado-inner");
    if (h) h.classList.add("show");
  }, 1500);
  // Texto constelación empieza a escribirse 3s después
  setTimeout(escribirTextoLeo, 3000);
}

var textoLeo = "Fue un gran regalo del destino que nuestros caminos se cruzaran. Admiro la dedicaci\u00f3n con la que persigues tus metas y me alegra haber coincidido con alguien que inspira tanto con su esfuerzo y determinaci\u00f3n.";

function escribirTextoLeo() {
  var leoTextEl = document.getElementById("leo-final-text");
  if (!leoTextEl) return;
  var idx = 0, base = 32;
  function escribir() {
    if (idx >= textoLeo.length) {
      var leoCursor = document.getElementById("leo-cursor");
      if (leoCursor) leoCursor.style.display = "none";
      // Mostrar bot?n volver a ver
      var btnVolver = document.getElementById("btn-volver");
      if (btnVolver) btnVolver.classList.add("show");
      return;
    }
    var ch = textoLeo[idx];
    leoTextEl.innerHTML += (ch === " ") ? "&nbsp;" : ch;
    idx++;
    var next = base;
    if (ch === "." || ch === "!") next = base * 9;
    else if (ch === ",") next = base * 5;
    else if (ch === " ") next = base * 0.4;
    setTimeout(escribir, next);
  }
  escribir();
}

// ????????????????????????????????????????????????????????????????????
// ESTRELLAS DECORATIVAS
// ????????????????????????????????????????????????????????????????????
function lanzarEstrellas() {
  var emojis = ["\u2b50","\u2728","\u1f49c","\u1f338","\u1f319","\u1f4ab","\u1f31f","\u1f33a"];
  for (var i = 0; i < 20; i++) {
    (function(idx) {
      setTimeout(function () {
        var el = document.createElement("div");
        el.className = "star-burst";
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        var angle = Math.random() * Math.PI * 2;
        var dist  = 100 + Math.random() * 320;
        el.style.setProperty("--dx", (Math.cos(angle)*dist)+"px");
        el.style.setProperty("--dy", (Math.sin(angle)*dist)+"px");
        el.style.setProperty("--rot", (Math.random()*720-360)+"deg");
        el.style.left = "50%"; el.style.top = "50%";
        document.body.appendChild(el);
        setTimeout(function(){ el.remove(); }, 2200);
      }, idx * 65);
    })(i);
  }
}

// Cerrar carta con estrellas
function cerrarEscena() {
  lanzarEstrellasCierre();
  setTimeout(function () {
    carta.classList.remove("open");
    setTimeout(function () { moonScene.classList.remove("visible"); }, 700);
  }, 380);
}

function lanzarEstrellasCierre() {
  var emojis = ["\u1f49c","\u2728","\u1f338","\u1f4ab","\u2b50","\u1f31f"];
  for (var i = 0; i < 12; i++) {
    (function(idx) {
      setTimeout(function () {
        var el = document.createElement("div");
        el.className = "star-burst";
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        var angle = Math.random() * Math.PI * 2;
        var dist  = 50 + Math.random() * 180;
        el.style.setProperty("--dx", (Math.cos(angle)*dist)+"px");
        el.style.setProperty("--dy", (Math.sin(angle)*dist)+"px");
        el.style.setProperty("--rot", (Math.random()*360-180)+"deg");
        el.style.left = "50%";
        el.style.top  = "68%";
        document.body.appendChild(el);
        setTimeout(function(){ el.remove(); }, 2000);
      }, idx * 50);
    })(i);
  }
}

// Volver a ver ? fade y recarga
function volverAVer() {
  var overlay = document.createElement("div");
  overlay.style.cssText = "position:fixed;inset:0;z-index:9999;background:#02020f;opacity:0;transition:opacity 1.2s ease;pointer-events:all;";
  document.body.appendChild(overlay);
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      overlay.style.opacity = "1";
      setTimeout(function(){ location.reload(); }, 1350);
    });
  });
}

function ocultarTitulo() {
  var t = document.querySelector(".titulo");
  if (!t) return;
  t.style.animation = "fadeOut 3s ease-in-out forwards";
  setTimeout(function(){ t.style.display="none"; }, 3000);
}
setTimeout(ocultarTitulo, 216000);
