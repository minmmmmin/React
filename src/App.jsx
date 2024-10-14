import { useState } from "react";

function generateRandomNumber(){
    return Math.floor(Math.random() * 100)+1;
}

export default function App() {
    const [previousGuesses,setPreviousGuesses] = useState({})
    const [randomNumber, setRandomnumber] = useState(generateRandomNumber)

    const guessCount = previousGuesses.length;
    const userGuess = guessCount === 0 ? null : previousGuesses[guessCount - 1];
    const gameClear = userGuess === randomNumber;
    const gameOver = guessCount === 10;
    const gameFinished = gameClear || gameOver;

    let lastResultMessage = "Wrong!";
  if (gameClear) {
    lastResultMessage = "Congratulations! You got it right!";
  } else if (gameOver) {
    lastResultMessage = "!!!GAME OVER!!!";
  }
  let lastResultColor = "";
  if (gameClear) {
    lastResultColor = "green";
  } else if (userGuess != null) {
    lastResultColor = "red";
  }

    return (
      <>
        <h1>Number guessing game</h1>
  
        <p>
          We have selected a random number between 1 and 100. See if you can guess
          it in 10 turns or fewer. We'll tell you if your guess was too high or
          too low.
        </p>
  
        <div class="form">

      
          <form
            onSubmit={(event)=>{
                event.preventDefault();
                console.log(event.target.elements.guessField.value);
                const guessField = event.target.elements.guessField;
                const guessValue = +guessField.value

                setPreviousGuesses([].concat(previousGuesses,[guessValue]));
                //新しい配列を作っている
                guessField.value = "";
                guessField.focus();
            }}
            >
            <label for="guessField">Enter a guess: </label>
            <input
              type="number"
              min="1"
              max="100"
              required
              class="guessField"
              disabled={gameFinished}
            />
            <input type="submit" value="Submit guess" class="guessSubmit" />
          </form>
        </div>

        {userGuess != null &&(
            <div class="resultParas">
            <p>Previous guess: {previousGuesses.join(" ")}</p>
            <p style={{backgroundColor: lastResultColor}}>
                {lastResultMessage}
            </p>
            {!gameClear &&(
                <p class="lowOrHi">
                   {userGuess < randomNumber
                ? "Last guess was too low!"
                : "Last guess was too high!"}
            </p>
            )}
            <p class="lowOrHi"></p>
          </div>
        )}

{gameFinished && (
        <button onClick={() => {
            setPreviousGuesses({});
            setRandomnumber(generateRandomNumber());
        }}
        > 
        Start new game
        </button>
        )}
      </>
    );
  }