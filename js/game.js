/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diaminds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */
const startGame = (() => {
  "use strict";

  let deck = [];
  const types = ["C", "D", "H", "S"],
    specials = ["A", "J", "Q", "K"];

  // let pointPlayer = 0,
  //   pointCPU = 0;

  let pointPlayers = [];

  // Referencias HTML
  const btnGetLetter = document.querySelector("#btn-get-letter"),
    btnStopGame = document.querySelector("#btn-stop-game"),
    btnNewGame = document.querySelector("#btn-new-game"),
    pointCounter = document.querySelectorAll("small"),
    contentLetters = document.querySelectorAll(".content-letters");

  /* Funciones */

  // función, que inicializa el set de cartas
  const startDeck = (numPlayers = 2) => {
    deck = createDeck();
    pointPlayers = [];
    for (let i = 0; i < numPlayers; i++) {
      pointPlayers.push(0);
      pointCounter[i].innerText = 0;
      contentLetters[i].innerText = "";
    }
  };

  // función, set de cartas
  const createDeck = () => {
    deck = [];
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
    return _.shuffle(deck);
  };

  // función, pedir una carta
  const getLetter = () => {
    if (deck.length === 0) {
      // throw, manda un error en consola
      throw "No hay cartas en el deck";
    }
    return deck.shift();
  };

  // funcion optener valor de la carta
  const valueLetter = (letter) => {
    const value = letter.substring(0, letter.length - 1);
    // isNaN(), funcion que evalua si es o no un numero
    return isNaN(value) ? (value === "A" ? 11 : 10) : parseInt(value);
  };

  // funcion crear carta en el DOM
  const createLetter = (letter, turn) => {
    // crea la carta dinamicamente en el DOM
    const letterImgTag = document.createElement("img");
    letterImgTag.src = `assets/${letter}.png`;
    letterImgTag.classList.add("letter");
    // crea la carta dinamicamente en el DOM
    contentLetters[turn].append(letterImgTag);
    // return letterImgTag;
  };

  // funcion crea el puntaje correspondiente al jugador
  const createPoint = (letter, turn) => {
    // optiene el puntaje de la carta, se solicita con getLetter();
    pointPlayers[turn] += valueLetter(letter);
    // asigna el valor de la carta en el DOM
    pointCounter[turn].innerText = pointPlayers[turn];
    return pointPlayers[turn];
  };

  // funcion determinar ganador
  const isWinner = () => {
    // destrucuración de Array
    const [getPointPlayer, pointCPU] = pointPlayers;
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
    }, 150);
  };

  // funcion optener cartas CPU
  const getLetterCPU = (getPointPlayer) => {
    let pointCPU = 0;
    do {
      const _getLetter = getLetter(),
        _pointPlayers = pointPlayers.length - 1;

      pointCPU = createPoint(_getLetter, _pointPlayers);
      createLetter(_getLetter, _pointPlayers);
    } while (pointCPU < getPointPlayer && getPointPlayer <= 21);

    isWinner();
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
  };

  /* Eventos */

  // evento para el boton perdir carta
  btnGetLetter.addEventListener("click", () => {
    const _getLetter = getLetter();
    const pointPlayer = createPoint(_getLetter, 0);
    createLetter(_getLetter, 0);

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
    const [getPointPlayer, pointCPU] = pointPlayers;
    btnNewGame.disabled = false;
    buttonsDisabled();
    getLetterCPU(getPointPlayer);
  });

  // evento para el boton nuevo
  btnNewGame.addEventListener("click", () => {
    clearNewGame();
    buttonsEnable();
    startDeck();
    btnNewGame.disabled = true;
  });

  // se exporta a public la funcion inicializar juego
  return {
    newGame: startDeck,
  };
})();
