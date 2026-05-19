let canvas = document.getElementById("Juego");
let ctx = canvas.getContext("2d");

const VELOCIDAD = 15;

// Objetos
let gato = { x: 400, y: 100, w: 70, h: 60 };
let raton = { x: 100, y: 100, w: 60, h: 30 };

// Estado
let puntos = 0;
let tiempo = 10;
let juegoActivo = true;
let intervalo;

// ---------------- FUNCIONES ----------------

function generarAleatorio(min, max) {
  let random = Math.random();
  let numero = random * (max - min + 1);
  let numeroEntero = Math.ceil(numero);
  numeroEntero = numeroEntero + min - 1;
  return numeroEntero;
}

function mostrarEnSpan(idSpan, valor) {
  let componente = document.getElementById(idSpan);
  componente.textContent = valor;
}

function dibujarRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function limpiarCanva() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanva();

  dibujarRect(gato.x, gato.y, gato.w, gato.h, "red");

  dibujarRect(raton.x, raton.y, raton.w, raton.h, "green");
}

// ---------------- COLISION ----------------

function detectarColision() {
  if (
    gato.x < raton.x + raton.w &&
    gato.x + gato.w > raton.x &&
    gato.y < raton.y + raton.h &&
    gato.y + gato.h > raton.y
  ) {

    puntos++;

    mostrarEnSpan("puntos", puntos);

    moverAleatorio(raton);

    if (puntos >= 6) {
      alert("🎉 GANASTE");
      juegoActivo = false;
      clearInterval(intervalo);
    }
  }
}

// ---------------- POSICION ALEATORIA ----------------

function moverAleatorio(obj) {
  obj.x = generarAleatorio(0, canvas.width - obj.w);
  obj.y = generarAleatorio(0, canvas.height - obj.h);
}

// ---------------- MOVIMIENTO ----------------

function moverIzquierda() {
  if (!juegoActivo) return;

  gato.x -= 10;

  dibujarTodo();
  detectarColision();
}

function moverDerecha() {
  if (!juegoActivo) return;

  gato.x += 10;

  dibujarTodo();
  detectarColision();
}

function moverArriba() {
  if (!juegoActivo) return;

  gato.y -= 10;

  dibujarTodo();
  detectarColision();
}

function moverAbajo() {
  if (!juegoActivo) return;

  gato.y += 10;

  dibujarTodo();
  detectarColision();
}

// ---------------- BOTONES ----------------

document.getElementById("btnArriba").addEventListener("click", moverArriba);

document.getElementById("btnAbajo").addEventListener("click", moverAbajo);

document.getElementById("btnIzquierda").addEventListener("click", moverIzquierda);

document.getElementById("btnDerecha").addEventListener("click", moverDerecha);

// ---------------- TECLADO ----------------

document.addEventListener("keydown", function(e) {

  if (e.key === "ArrowUp") moverArriba();

  if (e.key === "ArrowDown") moverAbajo();

  if (e.key === "ArrowLeft") moverIzquierda();

  if (e.key === "ArrowRight") moverDerecha();

});

// ---------------- TIEMPO ----------------

function restarTiempo() {

  tiempo--;

  mostrarEnSpan("tiempo", tiempo);

  if (tiempo <= 0) {

    alert("⏰ GAME OVER");

    juegoActivo = false;

    clearInterval(intervalo);
  }
}

intervalo = setInterval(restarTiempo, 1000);

// ---------------- REINICIAR ----------------

function reiniciarJuego() {

  puntos = 0;
  tiempo = 10;

  juegoActivo = true;

  gato.x = 400;
  gato.y = 100;

  moverAleatorio(raton);

  mostrarEnSpan("puntos", puntos);
  mostrarEnSpan("tiempo", tiempo);

  dibujarTodo();

  clearInterval(intervalo);

  intervalo = setInterval(restarTiempo, 1000);
}

// ---------------- INICIO ----------------

moverAleatorio(raton);

mostrarEnSpan("puntos", puntos);

mostrarEnSpan("tiempo", tiempo);

dibujarTodo();