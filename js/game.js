/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diaminds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */
(() => {
  "use strict";

  let deck = [];
  const types = ["C", "D", "H", "S"];
  const specials = ["A", "J", "Q", "K"];

  let pointPlayer = 0;
  let pointCPU = 0;

  // Referencias HTML
  const btnGetLetter = document.querySelector("#btn-get-letter");
  const btnStopGame = document.querySelector("#btn-stop-game");
  const btnNewGame = document.querySelector("#btn-new-game");
  const pointCounter = document.querySelectorAll("small");
  const contentLetter = document.querySelectorAll("#content-letters");

  /* Funciones */

  // función, set de cartas
  const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
      for (let type of types) {
        // se agrega la informacion al array deck[]
        deck.push(i + type);
      }
    }

    for (let type of types) {
      for (let special of specials) {
        // se agrega la informacion al array deck[]
        deck.push(special + type);
      }
    }

    // _.shuffle() funcion de la libreria underscore.js, que organiza los elementos de un Array de forma aleatoria
    deck = _.shuffle(deck);
    return deck;
  };

  // función, pedir una carta
  const getLetter = () => {
    if (deck.length === 0) {
      // throw, manda un error en consola
      throw "No hay cartas en el deck";
    }
    const currentLetter = deck.shift();
    return currentLetter;
  };

  // funcion optener valor de la carta
  const valueLetter = (letter) => {
    const value = letter.substring(0, letter.length - 1);
    // isNaN(), funcion que evalua si es o no un numero
    return isNaN(value) ? (value === "A" ? 11 : 10) : parseInt(value);
  };

  // funcion crear carta en el DOM
  const createLetter = (letter) => {
    // crea la carta dinamicamente en el DOM
    const letterImgTag = document.createElement("img");
    letterImgTag.src = `assets/${letter}.png`;
    letterImgTag.classList.add("letter");
    return letterImgTag;
  };

  // funcion optener cartas CPU
  const getLetterCPU = (getPointPlayer) => {
    do {
      const _getLetter = getLetter();
      // asigna el valor de la carta en el DOM
      pointCPU += valueLetter(_getLetter);
      pointCounter[1].innerText = pointCPU;
      // crea la carta dinamicamente en el DOM
      contentLetter[1].append(createLetter(_getLetter));
      if (getPointPlayer > 21) {
        break;
      }
    } while (pointCPU < getPointPlayer && getPointPlayer <= 21);

    setTimeout(() => {
      if (pointCPU === getPointPlayer) {
        alert("There has been a tie!!");
      } else if (getPointPlayer > 21) {
        alert("CPU is the winner!!");
      } else if (pointCPU > 21) {
        alert("You are winner!!");
      } else {
        alert("CPU is the winner!!");
      }
    }, 10);
  };

  // funcion que bloquea los botones -> perdir carta y detener
  const buttonsDisabled = () => {
    btnGetLetter.disabled = true;
    btnStopGame.disabled = true;
  };

  buttonsDisabled();

  // funcion que habilita los botones -> perdir carta y detener
  const buttonsEnable = () => {
    btnGetLetter.disabled = false;
    btnStopGame.disabled = false;
  };

  const clearNewGame = () => {
    console.clear();
    pointCPU = 0;
    pointPlayer = 0;
    // resetear el puntaje en el DOM
    pointCounter[0].innerText = pointCPU;
    pointCounter[1].innerText = pointPlayer;
    // eliminar las cartas en el DOM
    contentLetter[0].innerHTML = "";
    contentLetter[1].innerHTML = "";
  };

  /* Eventos */

  // evento para el boton perdir carta
  btnGetLetter.addEventListener("click", () => {
    const _getLetter = getLetter();
    // asigna el valor de la carta en el DOM
    pointPlayer += valueLetter(_getLetter);
    pointCounter[0].innerText = pointPlayer;
    // crea la carta dinamicamente en el DOM
    contentLetter[0].append(createLetter(_getLetter));

    // controlar los puntos optenidos
    if (pointPlayer > 21) {
      console.warn("Sorry!, you lose");
      buttonsDisabled();
      btnNewGame.disabled = false;
      // se llama la funcion optener cartas para la CPU
      getLetterCPU(pointPlayer);
    } else if (pointPlayer === 21) {
      console.warn("You Winner!!");
      buttonsDisabled();
      btnNewGame.disabled = false;
      getLetterCPU(pointPlayer);
    }
  });

  // evento para el boton detener
  btnStopGame.addEventListener("click", () => {
    buttonsDisabled();
    btnNewGame.disabled = false;
    getLetterCPU(pointPlayer);
  });

  // evento para el boton nuevo
  btnNewGame.addEventListener("click", () => {
    deck = [];
    createDeck();
    buttonsEnable();
    clearNewGame();
    btnNewGame.disabled = true;
  });
})();
