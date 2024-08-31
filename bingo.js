let botonesFila1 = [];
let botonesFila2 = [];
let botonesFila3 = [];
let botonesFila4 = [];
let botonesFila5 = [];
let bolaActual = null;
let esperandoConfirmacion = false;
let historialBolas = [];
let numerosGenerados = new Set();

function inicializar() {
  const botones = document.querySelectorAll(".container button:not(.bingo)");
  botones.forEach((boton) => {
    boton.classList.remove("tachado");
    boton.disabled = false;
  });

  botonesFila1 = Array.from(
    document.querySelectorAll("#boton1, #boton2, #boton3, #boton4, #boton5")
  );
  botonesFila2 = Array.from(
    document.querySelectorAll("#boton6, #boton7, #boton8, #boton9, #boton10")
  );
  botonesFila3 = Array.from(
    document.querySelectorAll("#boton11, #boton12, #boton14, #boton15")
  );
  botonesFila4 = Array.from(
    document.querySelectorAll(
      "#boton16, #boton17, #boton18, #boton19, #boton20"
    )
  );
  botonesFila5 = Array.from(
    document.querySelectorAll(
      "#boton21, #boton22, #boton23, #boton24, #boton25"
    )
  );

  crearNumero(1, 15, botonesFila1);
  crearNumero(16, 30, botonesFila2);
  crearNumero(31, 45, botonesFila3);
  crearNumero(46, 60, botonesFila4);
  crearNumero(61, 75, botonesFila5);

  historialBolas = [];
  document.getElementById("historial-bolas").innerHTML = "";
  document.getElementById("pregunta-container").classList.add("oculto");
  bolaActual = null;
  esperandoConfirmacion = false;
  numerosGenerados.clear();
  document.getElementById("celebracion").style.display = "none";
}

function crearNumero(min, max, botones) {
  let numerosUsados = new Set();
  for (let y = 0; y < botones.length; y++) {
    let nuevoNumero;
    do {
      nuevoNumero = aleatorio(min, max);
    } while (numerosUsados.has(nuevoNumero));
    numerosUsados.add(nuevoNumero);
    botones[y].textContent = nuevoNumero;
  }
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarBola() {
  if (esperandoConfirmacion) return;

  const letras = ["B", "I", "N", "G", "O"];
  const letra = letras[Math.floor(Math.random() * letras.length)];
  const min = letras.indexOf(letra) * 15 + 1;
  const max = min + 14;
  let numero;

  do {
    numero = aleatorio(min, max);
  } while (numerosGenerados.has(`${letra}${numero}`));

  bolaActual = `${letra}${numero}`;
  numerosGenerados.add(bolaActual);

  document.getElementById("bola-bingo").textContent = bolaActual;

  historialBolas.push(bolaActual);
  const historialDiv = document.getElementById("historial-bolas");
  const span = document.createElement("span");
  span.textContent = bolaActual;
  historialDiv.appendChild(span);

  document.getElementById("pregunta-container").classList.remove("oculto");
  esperandoConfirmacion = true;
}

function confirmarNumero(estaEnCarton) {
  const botones = document.querySelectorAll(".container button");
  const numero = bolaActual.slice(1);
  let numeroEncontrado = false;

  botones.forEach((boton) => {
    if (boton.textContent === numero) {
      numeroEncontrado = true;
      if (estaEnCarton) {
        boton.classList.add("tachado");
        boton.disabled = true;
      }
    }
  });

  if (estaEnCarton && !numeroEncontrado) {
    alert("El número no está en tu cartón.");
    reiniciarJuego();
    return;
  } else if (!estaEnCarton && numeroEncontrado) {
    alert("El número está en tu cartón pero seleccionaste 'No'.");
    reiniciarJuego();
    return;
  } else if (estaEnCarton && numeroEncontrado) {
    document.getElementById("pregunta-container").classList.add("oculto");
    esperandoConfirmacion = false;
    verificarFinJuego();
    return;
  } else if (!estaEnCarton && !numeroEncontrado) {
    document.getElementById("pregunta-container").classList.add("oculto");
    esperandoConfirmacion = false;
    verificarFinJuego();
    return;
  }
}

function verificarFinJuego() {
  const botones = document.querySelectorAll(".container button");
  const todosTachados = Array.from(botones).every((boton) =>
    boton.classList.contains("tachado")
  );

  if (todosTachados) {
    mostrarCelebracion();
  }
}

function mostrarCelebracion() {
  const celebracion = document.getElementById("celebracion");
  celebracion.style.display = "flex";
  setTimeout(() => {
    celebracion.style.display = "none";
  }, 5000);
}

function reiniciarJuego() {
  alert("Reiniciando el juego...");
  inicializar();
}

function toggleHistorial() {
  const historial = document.getElementById("historial-bolas");
  if (historial.classList.contains("oculto")) {
    historial.classList.remove("oculto");
  } else {
    historial.classList.add("oculto");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  inicializar();
});
