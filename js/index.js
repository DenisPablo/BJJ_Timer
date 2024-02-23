const reiniciarButton = document.getElementById("reiniciar");
const preparacionInput = document.getElementById("preparacion");
const trabajoInput = document.getElementById("trabajo");
const descansoInput = document.getElementById("descanso");
const rondasInput = document.getElementById("rondas");
const timerDisplay = document.getElementById("timer");
const iniciarButton = document.getElementById("iniciar");
const detenerButton = document.getElementById("detener");
const timer = document.getElementById("timer");
const configuracion = document.getElementById("configuracion");
const audio = document.getElementById("timbre");

let preparacionTime, trabajoTime, descansoTime;
let timerInterval;
let rondaActual = 0;
let tipoRonda = ""; // Variable para indicar el tipo de ronda actual (trabajo o descanso)
let primeraEjecucion = true;

iniciarButton.addEventListener("click", () => {
  preparacionTime = parseInt(preparacionInput.value, 10) * 60;
  trabajoTime = parseInt(trabajoInput.value, 10) * 60;
  descansoTime = parseInt(descansoInput.value, 10) * 60;
  rondas = parseInt(rondasInput.value, 10);
  rondaActual = 0;
  tipoRonda = ""; // Reiniciar el tipo de ronda
  primeraEjecucion = true;

  detenerTemporizador();
  iniciarTemporizador();
});

detenerButton.addEventListener("click", () => {
  detenerTemporizador();
});

reiniciarButton.addEventListener("click", () => {
  detenerTemporizador(); // Detener el temporizador actual
  iniciarTemporizador(); // Iniciar el temporizador nuevamente
});

const iniciarTemporizador = () => {
  let duracion;
  // Verificar si se han completado todas las rondas
  if (rondas === 0) {
    detenerTemporizador();
    timerDisplay.textContent = "¡Fin de las rondas!";
    return;
  }

  // Si es la primera ronda, incluir el tiempo de preparación
  if (primeraEjecucion) {
    primeraEjecucion = false;
    duracion = preparacionTime;
  } else if (tipoRonda === "trabajo") {
    // Si la ronda anterior fue de trabajo, establecer el tiempo de descanso
    duracion = descansoTime;
    tipoRonda = "descanso";
  } else {
    // Si la ronda anterior fue de descanso, establecer el tiempo de trabajo
    duracion = trabajoTime;
    tipoRonda = "trabajo";
  }

  let timer = duracion,
    minutos,
    segundos;

  timerInterval = setInterval(() => {
    minutos = Math.floor(timer / 60);
    segundos = timer % 60;

    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;

    timerDisplay.textContent = minutos + ":" + segundos;

    if (--timer < 0) {
      clearInterval(timerInterval);
      if (
        (rondaActual % 2 === 1 && duracion === trabajoTime) ||
        (rondaActual % 2 === 0 && duracion === descansoTime)
      ) {
        rondas--;
      }
      audio.play();
      setTimeout(() => {
        audio.pause();
      }, 1000); // Detiene la reproducción después de 5 segundos (5000 milisegundos)

      iniciarTemporizador();
    }
  }, 1000);
};

const detenerTemporizador = () => {
  clearInterval(timerInterval);
  timerDisplay.textContent = "--:--";

  preparacionTime = parseInt(preparacionInput.value, 10) * 60;
  trabajoTime = parseInt(trabajoInput.value, 10) * 60;
  descansoTime = parseInt(descansoInput.value, 10) * 60;
  rondas = parseInt(rondasInput.value, 10);
  rondaActual = 0;
  tipoRonda = ""; // Reiniciar el tipo de ronda
  primeraEjecucion = true;
};
