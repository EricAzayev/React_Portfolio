import { useState, useEffect } from "react";

import "./App.css";

function App() {
  let names = [
    "Trivia/Fun at all parties!",
    "Physics/Would you make Newton proud?",
    "Chemistry/Did they get the pizza down?",
  ];
  let descriptions = [
    "A collection of fun facts and jokes to impress your friends with!",
    "A collection of physics questions to test your knowledge!",
    "A collection of chemistry questions to test your knowledge!",
  ];

  const [cat, setCategory] = useState(0);
  const [card, setCard] = useState(0);
  const [side, setSide] = useState(0);
  const [randShuffle, setRandShuffle] = useState(false);

  const deck = [
    [
      // Category 0: Trivia
      ["What year did the Titanic sink?", "1912"],
      ["Who painted the Mona Lisa?", "Leonardo da Vinci"],
      ["What is the smallest country in the world?", "Vatican City"],
      ["Which planet is known as the Red Planet?", "Mars"],
      ["Who developed the theory of relativity?", "Albert Einstein"],
    ],
    [
      // Category 1: Physics
      [
        "What is Newton's first law of motion?",
        "An object in motion stays in motion unless acted upon by an external force.",
      ],
      [
        "What is the speed of light in a vacuum?",
        "299,792,458 meters per second",
      ],
      ["What is the unit of force?", "Newton (N)"],
      [
        "What phenomenon explains why time slows down at high speeds?",
        "Time dilation",
      ],
      ["What is the formula for kinetic energy?", "KE = 1/2 mv^2"],
    ],
    [
      // Category 2: Chemistry
      ["What is the atomic number of hydrogen?", "1"],
      ["What is the most abundant gas in Earth's atmosphere?", "Nitrogen"],
      ["What is the chemical formula for table salt?", "NaCl"],
      ["What is Avogadro’s number?", "6.022 × 10^23"],
      ["What type of bond forms between two nonmetals?", "Covalent bond"],
    ],
  ];
  // useEffect(() => {
  //   fetch("Flashcards.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setDeck(Object.values(data.deck));
  //     })
  //     .catch((error) => console.error("Error loading JSON:", error));
  // }, []);

  // Check if deck is loaded
  if (!deck) return <h1>Loading...</h1>;

  return (
    <>
      <h1>Category: {names[cat].substring(0, names[cat].indexOf("/"))}</h1>
      <h2> {names[cat].substring(names[cat].indexOf("/") + 1)}</h2>
      <h2>{descriptions[cat]}</h2>
      <h2>
        Card Number: {card + 1} / {deck[cat]?.length ?? 0}
      </h2>
      <div className="user-guess">
        <h3>What is your guess?</h3>
        <input id="userInput" type="text"></input>
        <button
          type="submit"
          onClick={() => {
            const inputVal = document.getElementById("userInput").value;
            const inputArea = document.getElementById("userInput");
            if (inputVal === deck[cat][card][1]) {
              inputArea.style.backgroundColor = "green";
              setSide(1);
            } else {
              inputArea.style.backgroundColor = "red";
            }
          }}
        >
          Submit
        </button>
      </div>

      <div
        onClick={() => setSide(side === 0 ? 1 : 0)}
        className={`card ${side === 1 ? "flipped" : ""}`}
      >
        <h3 className="card-content">{deck[cat][card][side]}</h3>
      </div>

      <div className="buttons">
        <button
          onClick={() => {
            if (card > 0) setCard(card - 1);
            setSide(0);
            const inp = document.getElementById("userInput");
            inp.val = "";
            inp.style.backgroundColor = "white";
          }}
        >
          Previous Card
        </button>
        <button
          onClick={() => {
            if (card < deck[cat].length - 1 || randShuffle) {
              const inp = document.getElementById("userInput");
              inp.val = "";
              inp.style.backgroundColor = "white";
              if (randShuffle) {
                let rand = Math.floor(Math.random() * deck[cat].length);
                while (rand === card) {
                  rand = Math.floor(Math.random() * deck[cat].length);
                }
                setCard(rand);
              } else {
                setCard(card + 1);
                setSide(0);
              }
            }
          }}
        >
          Next Card
        </button>
        <div className="switch-container">
          <label class="switch">
            <input
              type="checkbox"
              onClick={() => setRandShuffle(!randShuffle)}
            ></input>
            <span class="slider round"></span>
          </label>
          <h3>Random Draw</h3>
        </div>
      </div>
      <div className="buttons">
        <button
          onClick={() => {
            if (cat > 0) {
              const inp = document.getElementById("userInput");
              inp.val = "";
              inp.style.backgroundColor = "white";
              setCard(0);
              setSide(0);
              setCategory(cat - 1);
            }
          }}
        >
          Previous Category
        </button>
        <button
          onClick={() => {
            if (cat < deck.length - 1) {
              const inp = document.getElementById("userInput");
              inp.val = "";
              inp.style.backgroundColor = "white";
              setCard(0);
              setSide(0);
              setCategory(cat + 1);
            }
          }}
        >
          Next Category
        </button>
      </div>
    </>
  );
}

export default App;
