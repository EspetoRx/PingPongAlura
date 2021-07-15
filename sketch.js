let xBolinha = 300
let yBolinha = 200;
let diametroBolinha = 15;
let raioBolinha = diametroBolinha / 2;

let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

let tamanhoRaquete = 90;
let larguraRaquete = 10;

let tamanhoXCanvas = 600;
let tamanhoYCanvas = 400;

// Variaveis da minha raquete
let XRaquete = -1; //Começar fechado para evitar o bug da bolinha bater na lateral.
let YRaquete = (tamanhoYCanvas / 2) - (tamanhoRaquete / 2);

// Variaveis da raquete do oponente
let xRaqueteOponente = 591;
let yRaqueteOponente = (tamanhoYCanvas / 2) - (tamanhoRaquete / 2);

let velocidadeYOponente;

let velocidadeYRaquete = yBolinha - YRaquete - larguraRaquete/2 -30;

let colidiu = false;

// Placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// Sons do jogo
let raquetada;
let ponto;
let trilha;

// Chance de errar do oponente
let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(tamanhoXCanvas, tamanhoYCanvas);
  trilha.loop();
}

function draw() {
  background(0);
  
  mostraBolinha();
  movimentaBolinha();
  checaColisoesBorda();
  mostraRaquete(XRaquete, YRaquete);
  movimentaRaquete();
  colisaoRaquete(XRaquete, YRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametroBolinha);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function checaColisoesBorda(){
  if(xBolinha < raioBolinha || xBolinha > (tamanhoXCanvas - raioBolinha)){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha < raioBolinha || yBolinha > (tamanhoYCanvas - raioBolinha)){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, larguraRaquete, tamanhoRaquete);
}

function movimentaRaquete(){
  if((YRaquete - 5 >= 0) && keyIsDown(UP_ARROW)){
    YRaquete -= 5;
  }
  if((YRaquete + 5 <= (tamanhoYCanvas - tamanhoRaquete)) && keyIsDown(DOWN_ARROW)){
    YRaquete += 5
  }
}

function colisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, larguraRaquete, tamanhoRaquete, xBolinha, yBolinha, raioBolinha);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - larguraRaquete/2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto(){
  if(xBolinha >= (tamanhoXCanvas - raioBolinha)){
     meusPontos++;
     ponto.play();
  }
  
  if(xBolinha <= (0+raioBolinha)){
    pontosDoOponente++;
    ponto.play();
  }
}