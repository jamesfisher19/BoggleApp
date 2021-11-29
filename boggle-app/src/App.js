import React, { useState, useEffect } from 'react';
import {findAllSolutions, spfLetter} from './boggle_solver.js';
// import findAllSolutions from './boggle_solver_timed.js';
import Board from './Board.js';
import GuessInput from './GuessInput.js';
import FoundSolutions from './FoundSolutions.js';
import SummaryResults from './SummaryResults.js';
import ToggleGameState from './ToggleGameState.js';
import logo from './logo.png';
import './App.css';
import {GAME_STATE} from './GameState.js';
import {RandomGrid} from './randomGen.js';
import LoginButton from './LoginButton.js';
// import TextInput from './TextInput.js';
import './firebase.js';

function App() {

  const [allSolutions, setAllSolutions] = useState([]);
  const [foundSolutions, setFoundSolutions] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE);
  const [grid, setGrid] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [size, setSize] = useState(3);
  const [user, setUser] = useState(null);
  const [letter, setLetter] = useState();
  // useEffect will trigger when the array items in the second argument are
  // updated so whenever grid is updated, we will recompute the solutions
  useEffect(() => {
    const wordList = require('./full-wordlist.json');
    let tmpAllSolutions = findAllSolutions(grid, wordList.words);
    setAllSolutions(tmpAllSolutions);
  }, [grid]);
 
  // This will run when gameState changes.
  // When a new game is started, generate a new random grid and reset solutions
  useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      if(size !== -11111)  // if Grid is not loaded from firestore
          setGrid(RandomGrid(size));
      setFoundSolutions([]);
    }
  }, [gameState, size]);

  // This will run when gameState changes
  // When a new game is started, generate a new random grid with solutions that start with a specific lettter
  useEffect(() => {
    const wordList = require('./full-wordlist.json');
    if (gameState === GAME_STATE.IN_PROGRESS) {
      setLetter(spfLetter(letter, wordList));
      setFoundSolutions([]);
    }
  }, [gameState, letter]);



  function correctAnswerFound(answer) {
    console.log("New correct answer:" + answer);
    setFoundSolutions([...foundSolutions, answer]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <LoginButton setUser={(user) => setUser(user)} />
        {user != null &&
          <p>Welcome, {user.displayName} ({user.email})</p> 
        } 
       </header>
        <img src={logo}  width="20%" height="20%"  alt="Boggle Logo"/>

        <ToggleGameState gameState={gameState}
                       setGameState={(state) => setGameState(state)}
                       setSize={(state) => setSize(state)}
                       setLetter={(state) => setLetter(state)}
                       setTotalTime={(state) => setTotalTime(state)}
                       numFound={foundSolutions.length}
                       theGrid={JSON.stringify(grid)}
                       setGrid={(state) => setGrid(state)}/>

      { gameState === GAME_STATE.IN_PROGRESS &&
        <div>
          <Board board={grid} />
          <GuessInput allSolutions={allSolutions}
                      foundSolutions={foundSolutions}
                      correctAnswerCallback={(answer) => correctAnswerFound(answer)}/>
          <FoundSolutions headerText="Solutions you've found" words={foundSolutions} />
          
        </div>
      }
      { gameState === GAME_STATE.ENDED &&
        <div>
          <Board board={grid} />
          <SummaryResults words={foundSolutions} totalTime={totalTime} />
          <FoundSolutions headerText="Missed Words [wordsize > 3]: " words={allSolutions}  />


        </div>
      }
    </div>
  );
}

export default App;
