import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { GAME_STATE } from "./GameState.js";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import "./ToggleGameState.css";
import {
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { firestore } from "./firebase.js";

function ToggleGameState({
  gameState,
  setGameState,
  setSize,
  setLetter,
  setLength,
  setTotalTime,
  numFound,
  theGrid,
  setGrid,
}) {
  const [buttonText, setButtonText] = useState("Start a new game!");
  const [startTime, setStartTime] = useState(0);
  const [boardSize, setBoardSize] = useState(3);
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [input, setInput] = useState("");
  const [deltaTime, setDeltaTime] = useState(0);
  const [letterChoice, setLetterChoice] = useState("");
  const [lengthChoice, setLengthChoice] = useState(3);

  let d = 0;

  function updateGameState(endTime) {
    if (
      gameState === GAME_STATE.SHOW_LEADERBOARD ||
      gameState === GAME_STATE.BEFORE ||
      gameState === GAME_STATE.ENDED
    ) {
      setStartTime(Date.now());
      setGameState(GAME_STATE.IN_PROGRESS);
      setButtonText("End game");
    } else if (gameState === GAME_STATE.IN_PROGRESS) {
      d = (endTime - startTime) / 1000.0;
      setDeltaTime(d);
      setTotalTime(d);

      setGameState(GAME_STATE.ADD_LEADERBOARD);
      /*    
      setGameState(GAME_STATE.ENDED);
      setButtonText("Start a new game!");
      StoreGameResults();
  */
    }
  }

  /*Query Firestore to get all games ordered by boardSize, Time Solved */
  async function showLeaderBoard() {
    setGameState(GAME_STATE.SHOW_LEADERBOARD);
    setButtonText("Play Existing Game!");

    // build query and bind results to menu list

    try {
      const q = query(
        collection(firestore, "LeaderBoard"),
        orderBy("boardSize"),
        orderBy("solveTime", "asc"),
        limit(10)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());

        leaderBoard.push(doc.data());
        setLeaderBoard([...leaderBoard, leaderBoard]); //doc.boardSize, doc.solveTime, doc.playerName
        console.log("Entry = ", leaderBoard);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  /* Store the Game in Firestore */
  async function StoreGameResults() {
    try {
      /*const docRef =*/ await addDoc(collection(firestore, "LeaderBoard"), {
        letterChoice: letterChoice,
        lengthChoice: lengthChoice,
        boardSize: boardSize,
        solveTime: deltaTime,
        numFound: numFound,
        playerName: input,
        theBoard: theGrid,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function evaluateInput() {
    setGameState(GAME_STATE.ENDED);
    setButtonText("Start a new game!");
    StoreGameResults();
  }

  function keyPress(e) {
    if (e.key === "Enter") {
      e.target.value = "";
      evaluateInput();
    }
  }

  const handleGridChange = (event) => {
    setSize(-11111);
    setGrid(JSON.parse(event.target.value));
    console.log("theGrid = ", event.target.value);
  };

  const handleSizeMenuChange = (event) => {
    setBoardSize(event.target.value);
    setSize(event.target.value);
  };

  const handleLetterChoice = (event) => {
    setLetterChoice(event.target.value);
    setLetter(event.target.value);
  };

  const handleLengthChoice = (event) => {
    setLengthChoice(event.target.value);
    setLength(event.target.value);
  };

  // const handleLetterLength = (event) => {
  //   setBoardSize(event.target.value);
  //   setSize(event.target.value);
  // };

  return (
    <div>
      <div className="game-state-buttons">
        {/* {(gameState === GAME_STATE.BEFORE ||
          gameState === GAME_STATE.ENDED) && (
          <div className="Play-existing-game">
            <Button variant="outlined" onClick={() => showLeaderBoard()}>
              Play Existing Game
            </Button>
          </div>
        )} */}

        {gameState !== GAME_STATE.ADD_LEADERBOARD && (
          <Button
            variant="outlined"
            onClick={() => updateGameState(Date.now())}
          >
            {buttonText}
          </Button>
        )}
      </div>

      <div className="Toggle-game-state">
        {gameState === GAME_STATE.ADD_LEADERBOARD && (
          <TextField
            id="outlined-basic"
            label="Enter Your Name"
            variant="outlined"
            onKeyPress={(e) => keyPress(e)}
            onChange={(event) => setInput(event.target.value)}
          />
        )}
        <div className="game-customizations">
          {(gameState === GAME_STATE.BEFORE ||
            gameState === GAME_STATE.ENDED) && (
            <div className="Input-select-size">
              <FormControl>
                <Select
                  labelId="sizelabel"
                  id="sizemenu"
                  onChange={handleSizeMenuChange}
                >
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={11}>11</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                </Select>
                <FormHelperText>Set Grid Size</FormHelperText>
              </FormControl>
            </div>
          )}

          {(gameState === GAME_STATE.BEFORE ||
            gameState === GAME_STATE.ENDED) && (
            <div className="Input-select-letter">
              <FormControl>
                <Select
                  labelId="letterlabel"
                  id="lettermenu"
                  onChange={handleLetterChoice}
                >
                  <MenuItem value={"None"}>None</MenuItem>
                  <MenuItem value={"a"}>a</MenuItem>
                  <MenuItem value={"b"}>b</MenuItem>
                  <MenuItem value={"c"}>c</MenuItem>
                  <MenuItem value={"d"}>d</MenuItem>
                  <MenuItem value={"e"}>e</MenuItem>
                  <MenuItem value={"f"}>f</MenuItem>
                  <MenuItem value={"g"}>g</MenuItem>
                  <MenuItem value={"h"}>h</MenuItem>
                  <MenuItem value={"i"}>i</MenuItem>
                  <MenuItem value={"j"}>j</MenuItem>
                  <MenuItem value={"k"}>k</MenuItem>
                  <MenuItem value={"l"}>l</MenuItem>
                  <MenuItem value={"m"}>m</MenuItem>
                  <MenuItem value={"n"}>n</MenuItem>
                  <MenuItem value={"o"}>o</MenuItem>
                  <MenuItem value={"p"}>p</MenuItem>
                  <MenuItem value={"q"}>q</MenuItem>
                  <MenuItem value={"r"}>r</MenuItem>
                  <MenuItem value={"s"}>s</MenuItem>
                  <MenuItem value={"t"}>t</MenuItem>
                  <MenuItem value={"u"}>u</MenuItem>
                  <MenuItem value={"v"}>v</MenuItem>
                  <MenuItem value={"w"}>w</MenuItem>
                  <MenuItem value={"x"}>x</MenuItem>
                  <MenuItem value={"y"}>y</MenuItem>
                  <MenuItem value={"z"}>z</MenuItem>
                </Select>
                <FormHelperText>Select Specific Letter</FormHelperText>
              </FormControl>
            </div>
          )}
          {(gameState === GAME_STATE.BEFORE ||
            gameState === GAME_STATE.ENDED) && (
            <div className="Input-select-length">
              <FormControl>
                <Select
                  labelId="lengthlabel"
                  id="lengthmenu"
                  onChange={handleLengthChoice}
                >
                  <MenuItem value={null}>None</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={11}>11</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                </Select>
                <FormHelperText>Select Word Size</FormHelperText>
              </FormControl>
            </div>
          )}

          {gameState === GAME_STATE.SHOW_LEADERBOARD && (
            <div className="Input-select-length">
              <FormControl>
                <Select
                  labelId="leaderboardlabel"
                  id="leaderboardmenu"
                  onChange={handleGridChange}
                >
                  {leaderBoard.map((item, idx) => {
                    return (
                      <MenuItem key={idx} value={item.theBoard}>
                        Size: {item.boardSize} Words Found: {item.numFound}{" "}
                        Name: {item.playerName} Time: {item.solveTime} Letter:{" "}
                        {item.letterChoice} Length: {item.lengthChoice}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>Select Game</FormHelperText>
              </FormControl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToggleGameState;
