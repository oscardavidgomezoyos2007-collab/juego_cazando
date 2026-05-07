let canvas = document.getElementById("Juego");
let ctx = canvas.getContext("2d");

const VELOCIDAD = 15;

// Objetos del juego
let gato = { x: 300, y: 200, w: 50, h: 50 };
let raton = { x: 100, y: 100, w: 20, h: 20 };

// Estado
let puntos = 0;
let tiempo = 30;
let juegoActivo = true;

// Funciones básicas
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

// Dibujar rectángulos
function dibujarRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

// Dibujar todo
function dibujarTodo() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gato grande negro
  dibujarRect(gato.x, gato.y, gato.w, gato.h, "black");

  // Ratón pequeño anaranjado
  dibujarRect(raton.x, raton.y, raton.w, raton.h, "orange");
}

// Detectar colisión
function colision(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

// Posición aleatoria
function moverAleatorio(obj) {
  obj.x = generarAleatorio(0, canvas.width - obj.w);
  obj.y = generarAleatorio(0, canvas.height - obj.h);
}

// Posición aleatoria sin chocar con el gato
function moverAleatorioSinChocar(obj) {
  moverAleatorio(obj);

  while (colision(obj, gato)) {
    moverAleatorio(obj);
  }
}

// Movimiento del gato
function mover(direccion) {
  if (!juegoActivo) return;

  if (direccion === "arriba") gato.y -= VELOCIDAD;
  if (direccion === "abajo") gato.y += VELOCIDAD;
  if (direccion === "izquierda") gato.x -= VELOCIDAD;
  if (direccion === "derecha") gato.x += VELOCIDAD;

  // Límites
  gato.x = Math.max(0, Math.min(canvas.width - gato.w, gato.x));
  gato.y = Math.max(0, Math.min(canvas.height - gato.h, gato.y));

  // Colisión con ratón
  if (colision(gato, raton)) {
    puntos += 1;
    moverAleatorioSinChocar(raton);
    document.getElementById("mensaje").innerText = "🐭 ¡Atrapaste al ratón!";
  }

  mostrarEnSpan("puntos", puntos);
  dibujarTodo();
}

// Control teclado
document.addEventListener("keydown", function(e) {
  if (e.key === "ArrowUp") mover("arriba");
  if (e.key === "ArrowDown") mover("abajo");
  if (e.key === "ArrowLeft") mover("izquierda");
  if (e.key === "ArrowRight") mover("derecha");
});

// Control botones
document.getElementById("btnArriba").addEventListener("click", function() {
  mover("arriba");
});

document.getElementById("btnAbajo").addEventListener("click", function() {
  mover("abajo");
});

document.getElementById("btnIzquierda").addEventListener("click", function() {
  mover("izquierda");
});

document.getElementById("btnDerecha").addEventListener("click", function() {
  mover("derecha");
});

// Temporizador
let timer = setInterval(function() {
  if (!juegoActivo) return;

  tiempo--;
  mostrarEnSpan("tiempo", tiempo);

  if (tiempo <= 0) {
    juegoActivo = false;
    clearInterval(timer);
    document.getElementById("mensaje").innerText =
      "⏰ Fin del juego. Puntaje final: " + puntos;
  }
}, 1000);

// Posición inicial del ratón
moverAleatorioSinChocar(raton);

// Mostrar datos iniciales
mostrarEnSpan("puntos", puntos);
mostrarEnSpan("tiempo", tiempo);

// Iniciar juego
dibujarTodo();