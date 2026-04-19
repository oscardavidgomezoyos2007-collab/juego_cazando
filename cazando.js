let canvas = document.getElementById("Juego");
let ctx = canvas.getContext("2d");
let btnArriba = document.getElementById("btnArriba");
let btnIzquierda = document.getElementById("btnIzquierda");
let btnAbajo = document.getElementById("btnAbajo");
let btnDerecha = document.getElementById("btnDerecha");
const VELOCIDAD = 15;
// Gato
let gatoX = 0;
let gatoY = 0;
const ANCHOGATO = 50;
const ALTURAGATO = 50;
 
// Raton
let ratonX = 50;
let ratonY = 50;
const ANCHORATON = 30;
const ALTURARATON = 30;

function graficarRectangular(x,y,acho,alto,color) {
    ctx.fillstyle=color;
    ctx.fillRect(x,y,acho,alto)
};

//Comida
let comidaX=50;
let comidaY=50;
const ANCHOCOMIDA = 30;
const ALTUCOMIDA = 30;


function graficarGato() {
    graficarRectangular(gatoX,gatoY,ANCHOGATO,ALTURAGATO, "#000000");
};

function graficarRaton() {
    graficarRectangular(ratonX, ratonY, ANCHORATON, ALTURARATON, "#ff0000");
};



function graficarComida() {
    graficarRectangular(comidaX,comidaY,ANCHOCOMIDA,ALTUCOMIDA, "#FF0000")
};

function inicarjuego() {
    gatoX = (canvas.width / 2) - (ANCHOGATO / 2);
    gatoY =(canvas.height / 2) - (ALTURAGATO / 2);
    graficoGato();
    graficarRaton();
};

function mover(direccion){
    if (direccion === "arriba") gatoY = VELOCIDAD;
    if (direccion === "abajo")  gatoY = VELOCIDAD;
    if (direccion === "izquierda") gatoX = VELOCIDAD;
    if (direccion === "derecha")  gatoX += VELOCIDAD;
    graficarGato();
}

document.getElementById("btnArriba").onclick = () => mover ("arriba")
document.getElementById("btnAbajo").onclick = () => mover ("abajo")
document.getElementById("btnIzquierda").onclick = () => mover ("izquierda")
document.getElementById("btnDerecha").onclick = () => mover ("derecha")