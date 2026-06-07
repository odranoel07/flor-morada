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
  { text: "Antes que nada, quiero pedirte disculpas...", time: 5 },
  { text: "...por cualquier momento en que mis acciones hayan podido hacerte sentir inc\u00f3moda.", time: 12 },
  { text: "He reflexionado mucho sobre ello", time: 22 },
  { text: "e intentado aprender de mis errores para ser una mejor persona.", time: 30 },
  { text: "Tambi\u00e9n quiero agradecerte...", time: 42 },
  { text: "porque fue un gran regalo del destino que nuestros caminos se cruzaran.", time: 50 },
  { text: "Eres una persona que admiro profundamente", time: 62 },
  { text: "por la dedicaci\u00f3n, la disciplina y el esfuerzo que pones en todo lo que haces.", time: 70 },
  { text: "Estas flores moradas representan esa admiraci\u00f3n,", time: 82 },
  { text: "respeto y esperanza que deseo para ti.", time: 90 },
  { text: "Que te recuerden siempre la fuerza que tienes", time: 100 },
  { text: "para superar cualquier obst\u00e1culo y alcanzar cada una de tus metas.", time: 108 },
  { text: "Y si alguna vez aparecen las dudas o el cansancio en tu camino...", time: 120 },
  { text: "espero que recuerdes todo lo que ya has logrado.", time: 130 },
  { text: "Conf\u00eda en ti, en tu esfuerzo", time: 140 },
  { text: "y en todo lo que eres capaz de construir.", time: 148 },
  { text: "Estoy seguro de que llegar\u00e1s muy lejos \u1f31f", time: 158 },
  { text: "porque tienes la determinaci\u00f3n necesaria para hacerlo.", time: 166 },
  { text: "Te deseo experiencias que te hagan crecer,", time: 178 },
  { text: "personas que te aporten felicidad y momentos de orgullo.", time: 186 },
  { text: "Nunca dejes de perseguir tus sue\u00f1os ni de creer en ellos. \u1f49c", time: 198 },
  { text: "Me alegrar\u00e1 seguir sabiendo de ti y de tus logros.", time: 210 },
  { text: "Espero que podamos seguir manteniendo el contacto.", time: 220 },
  { text: "Cu\u00eddate mucho y sigue brillando \u2728", time: 228 },
];

// Mensaje motivacional para la segunda canci?n
var lyricsData2 = [
  { text: "NUNCA DUDES DE TI \u2728",                                          time: 5   },
  { text: "T\u00da SABES QUE PUEDES",                                           time: 18  },
  { text: "CON TODO EL MUNDO \u1f4ab",                                          time: 30  },
  { text: "ERES UNA MUJER",                                                time: 45  },
  { text: "QUE JAM\u00c1S PODR\u00c1N COMPARAR CON NADIE",                          time: 57  },
  { text: "PORQUE T\u00da ERES DIFERENTE",                                      time: 72  },
  { text: "AL RESTO DE PERSONAS \u1f31f",                                       time: 84  },
  { text: "\u00daNICA",                                                         time: 100 },
  { text: "\u2728 \u00daNICA \u2728",                                                   time: 118 },
  { text: "NUNCA LO OLVIDES \u1f49c",                                           time: 135 },
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

  // Clase especial para el mensaje de la segunda canci?n (letras grandes)
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
"Antes que nada, quiero pedirte disculpas por cualquier momento " +
"en el que mis acciones hayan podido hacerte sentir inc\u00f3moda o mal. " +
"Con el tiempo he reflexionado mucho sobre ello y he intentado aprender " +
"de mis errores para ser una mejor persona.\n\n" +
"Tambi\u00e9n quiero agradecerte porque fue un gran regalo del destino que " +
"nuestros caminos se cruzaran y que tuviera la oportunidad de conocerte. " +
"Eres una persona que admiro profundamente por la dedicaci\u00f3n, la disciplina " +
"y el esfuerzo que pones en todo lo que haces.\n\n" +
"Estas flores moradas representan esa admiraci\u00f3n, respeto y esperanza que " +
"deseo para ti. Que te recuerden siempre la fuerza que tienes para superar " +
"cualquier obst\u00e1culo y la capacidad que posees para alcanzar cada una de tus metas.\n\n" +
"Y si alguna vez aparecen las dudas, el miedo o el cansancio en tu camino, " +
"espero que recuerdes todo lo que ya has logrado. Conf\u00eda en ti, en tu esfuerzo " +
"y en todo lo que eres capaz de construir. Estoy seguro de que llegar\u00e1s muy " +
"lejos porque tienes la determinaci\u00f3n necesaria para hacerlo.\n\n" +
"Te deseo experiencias que te hagan crecer, personas que te aporten felicidad " +
"y muchos momentos que te llenen de orgullo por todo lo que has conseguido. " +
"Nunca dejes de perseguir tus sue\u00f1os ni de creer en ellos.\n\n" +
"M\u00e1s all\u00e1 de todo, me alegrar\u00e1 seguir sabiendo de ti y de los logros que vayas " +
"alcanzando. Espero que podamos seguir manteniendo el contacto y que la vida nos " +
"permita compartir, aunque sea de vez en cuando, parte de nuestros caminos.\n\n" +
"Cu\u00eddate mucho y sigue brillando. \u1f49c";

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
  setTimeout(dispararEstrellaFugaz, 2800);
  setTimeout(mostrarLeoFinal, 5000);
}

function desvanecerFlores() {
  if (floresFading) return;
  floresFading = true;
  if (floresDiv) { floresDiv.style.transition="opacity 3s ease"; floresDiv.style.opacity="0"; setTimeout(function(){floresDiv.style.display="none";},3100); }
  if (nightDiv)  { nightDiv.style.transition="opacity 3s ease";  nightDiv.style.opacity="0";  setTimeout(function(){nightDiv.style.display="none";}, 3100); }
  if (leoBg)     { leoBg.style.transition="opacity 3s ease";     leoBg.style.opacity="0.82"; }
}

function dispararEstrellaFugaz() {
  shootingStar.classList.add("fire");
}

function mostrarLeoFinal() {
  if (leoFinal) {
    leoFinal.classList.add("visible");
    setTimeout(escribirTextoLeo, 1800);
  }
}

var textoLeo = "Y si alg\u00fan d\u00eda tu agenda te da un peque\u00f1o respiro, me gustar\u00eda invitarte a tomar un helado y compartir una buena conversaci\u00f3n. Sin presiones, solo como una oportunidad para ponernos al d\u00eda y pasar un momento agradable.";

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
