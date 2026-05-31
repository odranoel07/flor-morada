// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  { text: "Flores moradas saltan de la bugambilia", time: 3 },
  { text: "Seguramente fue porque me vieron llorar", time: 7.5 },
  { text: "Y mientras caen acarician mis mejillas", time: 14 },
  { text: "Pobres suicidas solo me querian besar", time: 20 },
  { text: "Y baila lento flor morada", time: 29 },
   {text: "Que me recuerdas a mi amada", time:29.3} ,
  { text: "Ella me esta esperando en casa", time: 33 },
  { text: "Y yo muriendo por volver", time: 36 },
  { text: "Asi es la vida flor morada", time: 38 },
  { text: "A veces suele ser malvada", time: 40 },
  { text: "Tu de mi estas enamorada", time: 44 },
  { text: "Y yo muriendo por volver", time: 45 },
  { text: "muriendo por volver", time: 49 },
  { text: "muriendo por volver", time: 50 },
  { text: "muriendo por volverrrrrrrrrr", time: 52 },
  { text: "Perdon por lastimarte", time: 80 },
  { text: "muriendo por volver", time: 50 },
  { text: "muriendo por volver", time: 50 },
  { text: "Caen semillas que planto con mis dos pies", time: 99 },
  { text: "Mientras crecen bugambilias", time: 102},
  { text: "Llueven mis pupilas una y otra vez", time: 105 },
  { text: "Y mientras bailan van adornando mi piel", time: 110 },
  { text: "Mejor me duermo otro rato para poder verte otra vez", time: 115 },
  { text: "Y baila lento flor morada", time: 120 },
  { text: "¡Que me recuerdas a mi amada! Ella me está esperando en casa", time: 124 },
  { text: "Y yo muriendo por volver", time: 125 },
  { text: "¡Así es la vida flor morada!", time: 129 },
  { text: "A veces suele ser malvada", time: 132 },
  { text: "Tu de mi estas enamorada", time: 135 },
  { text: "Y yo muriendo por volver", time: 139 },
 { text: "¡Muriendo por volver!", time: 142 }, 
 { text: "¡Muriendo por volver!", time: 144 },
 { text: "¡Ay! Corazón", time: 159 },
 { text: "Me muero por volver", time: 160 },
 {text:"Llévame de acá", time: 163},
 { text: "Llévame de acáaaaaaaaaa", time: 164},
 { text: "Llévame de acá", time: 167 },
];



// Animar las letras
function updateLyrics() {
  var time = Math.floor(audio.currentTime);
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    // Calcula la opacidad basada en el tiempo en la línea actual
    var fadeInDuration = 0.1; // Duración del efecto de aparición en segundos
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    // Aplica el efecto de aparición
    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    // Restablece la opacidad y el contenido si no hay una línea actual
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

setInterval(updateLyrics, 1000);

//funcion titulo
// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation =
    "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000); // Espera 3 segundos antes de ocultar completamente
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);