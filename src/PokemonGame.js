import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./PokemonGame.css";
import App from "./App.js";
import axios from "axios";

function PokemonGame({ pokemonList }) {
  const inputId1 = useRef(-1);
  const inputName1 = useRef("");
  const hp1 = useRef("XX/YY");

  const inputId2 = useRef(-1);
  const inputName2 = useRef("");
  const hp2 = useRef("XX/YY");

  const [pokemonAIdentity, setPokemonAIdentity] = useState({ id: 0 });
  const [pokemonBIdentity, setPokemonBIdentity] = useState({ id: 1 });
  const [pokemonACurrentHP, setPokemonACurrentHP] = useState();
  const [pokemonAStats, setPokemonAStats] = useState();
  const [pokemonBCurrentHP, setPokemonBCurrentHP] = useState();
  const [pokemonBStats, setPokemonBStats] = useState();
  const [gameActive, setGameActive] = useState(false);
  const [winner, setWinner] = useState("");
  const [currentTurn, setCurrentTurn] = useState(0);
  const [gameWinnerId, setGameWinnerId] = useState(-1);
  const [gameLogState, setGameLogState] = useState([]);
  let gameLog = [];

  useEffect(() => {
    if (checkIfGameOver()) {
      //game winner check phase
      determineWinnerAndFinish();
    }
  }, [pokemonACurrentHP, pokemonBCurrentHP]);

  const randomizeIds = () => {
    console.log("Randomizing pokemon IDs.");
    const randomIdA = 1 + Math.floor(Math.random() * 808);
    inputId1.current.value = randomIdA;
    console.log({ id_1: randomIdA });

    const randomIdB = 1 + Math.floor(Math.random() * 808);
    inputId2.current.value = randomIdB;
    console.log({ id_2: randomIdB });
  };

  const startGame = () => {
    console.log("Initializing PokeFight game!.");
    //TODO: initialize game:
    //1. reset game logic states
    //2. set identity, stats, currenthp

    //1. game logic reset
    setGameActive(true);
    setWinner("");
    setCurrentTurn(0);
    setGameLogState([]);
    gameLog=[];

    //2.
    console.log({ id_1: inputId1.current.value });
    console.log({ name_1: inputName1.current.value });
    console.log({ id_2: inputId2.current.value });
    console.log({ name_2: inputName2.current.value });

    console.log(`looking for pokemons in list ${JSON.stringify(pokemonList)}`);
    let pokemonAObj;
    let pokemonBObj;
    const id1Number = Number.parseInt(inputId1.current.value);
    const id2Number = Number.parseInt(inputId2.current.value);
    console.log({ id_1_number: id1Number });
    console.log({ id_2_number: id2Number });

    if (1 <= id1Number && id1Number <= 809) {
      console.log("Id 1 is valid and will be used to retrieve data.");
      pokemonAObj = pokemonList.find((pokemon) => {
        return pokemon.id == id1Number;
      });
      console.log({ pokemonAObj_value: pokemonAObj });
    } else if (inputName1 !== "" && inputName1.current.value) {
      pokemonAObj = pokemonList.find(
        (x) =>
          x.name.english.toLowerCase() ===
          inputName1.current.value.toLowerCase()
      );
    }
    if (1 <= id2Number && id2Number <= 809) {
      console.log("Id 2 is valid and will be used to retrieve data.");
      pokemonBObj = pokemonList.find((pokemon) => {
        return pokemon.id == id2Number;
      });
    } else if (inputName2 !== "" && inputName2.current.value) {
      pokemonBObj = pokemonList.find(
        (x) =>
          x.name.english.toLowerCase() ===
          inputName2.current.value.toLowerCase()
      );
    }

    console.log({ pokemonAObj_value: pokemonAObj });

    if (pokemonAObj && pokemonBObj) {
      console.log("Two valid pokemon IDs or names entered. Initializing game.");
      //identities
      //identity A
      setPokemonAIdentity({ id: pokemonAObj.id, name: pokemonAObj.name });
      //updatePokemonAIdentity("id", pokemonAObj.id);
      //updatePokemonAIdentity("name", pokemonAObj.name);
      inputName1.current.value = pokemonAObj.name.english;
      //identity B
      setPokemonBIdentity({ id: pokemonBObj.id, name: pokemonBObj.name });
      //updatePokemonBIdentity("id", pokemonBObj.id);
      //updatePokemonBIdentity("name", pokemonBObj.name);
      inputName2.current.value = pokemonBObj.name.english;

      //stats
      setPokemonAStats({});

      let pokemonAStatsFormatted;
      pokemonAStatsFormatted = {
        HP: pokemonAObj.base.HP,
        ATK: pokemonAObj.base.Attack,
        ATK_SP: pokemonAObj.base["Sp. Attack"],
        DEF: pokemonAObj.base.Defense,
        DEF_SP: pokemonAObj.base["Sp. Defense"],
        SPD: pokemonAObj.base.Speed,
      };
      initPokemonAStats(pokemonAStatsFormatted);

      let pokemonBStatsFormatted;
      pokemonBStatsFormatted = {
        HP: pokemonBObj.base.HP,
        ATK: pokemonBObj.base.Attack,
        ATK_SP: pokemonBObj.base["Sp. Attack"],
        DEF: pokemonBObj.base.Defense,
        DEF_SP: pokemonBObj.base["Sp. Defense"],
        SPD: pokemonBObj.base.Speed,
      };
      initPokemonBStats(pokemonBStatsFormatted);

    } else {
      console.log({ pokemon_A: pokemonAObj }, { pokemon_B: pokemonBObj });
      console.error(
        "Unable to begin game, invalid IDs or names. Consider randomizing IDs"
      );
      alert("Unable to start game.\nConsider randomizing IDs!");
    }
  };

  const saveGame = () => {
    if (!gameActive && winner !== "") {
      console.log(
        "Called save game - formatting information for leaderboard entry to API."
      );
      //TODO:implement saving feature towards API game/save with data from end of game like defined in backend .txt file
      //pokemon_1_name String (english)
      //pokemon_1_id Number
      //pokemon_2_name String (english)
      //pokemon_2_id Number
      //game_winner_name String (if draw:"DRAW")
      //game_winner_id Number (if draw:-1)
      //game_rounds Number
      //game_log Array (of strings)
      //  router.post('/game/save', async (req, res) => {
      //  const { pokemon_1_name, pokemon_1_id, pokemon_2_name, pokemon_2_id, game_winner_name, game_winner_id, game_rounds } = req.body;

      /**
      const leaderboardEntry = {
        method: "post",
        url: "http://localhost:3001/game/save",
        body: {
          pokemon_1_name: `${pokemonAIdentity.name.english}`,
          pokemon_1_id: `${pokemonAIdentity.id}`,
          pokemon_2_name: `${pokemonBIdentity.name.english}`,
          pokemon_2_id: `${pokemonBIdentity.id}`,
          game_winner_name: `${gameWinnerName}`,
          game_winner_id: `${gameWinnerId}`,
          game_rounds: `${currentTurn}`,
        },
        // transformRequest: [
        //  (body, headers) => {
        // transform the data
        //    return body;
        //  },
        //],
      };
      console.log(leaderboardEntry);
      axios(leaderboardEntry);
      */

      
      console.log({ pokemonAIdentity: pokemonAIdentity });
      console.log({ pokemonBIdentity: pokemonBIdentity });
      let gameWinnerName = "draw";
      if (winner === "A") {
        gameWinnerName = pokemonAIdentity.name.english;
      } else if (winner === "B") {
        gameWinnerName = pokemonBIdentity.name.english;
      }
      console.log({gameLogState : JSON.stringify(gameLogState)})

      console.log("Sending axios leaderboard entry request.");
      axios.post('http://localhost:3001/game/save', {
        pokemon_1_name: pokemonAIdentity.name.english,
        pokemon_1_id: pokemonAIdentity.id,
        pokemon_2_name: pokemonBIdentity.name.english,
        pokemon_2_id: pokemonBIdentity.id,
        game_winner_name: gameWinnerName,
        game_winner_id: gameWinnerId,
        game_rounds: currentTurn,
        game_log: gameLogState
      })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
    } else {
      console.log(
        "Unable to save game data. Make sure you only save when a completed game has a winner (or draw)"
      );
    }
  };

  const checkIfGameOver = () => {
    if (pokemonACurrentHP <= 0 || pokemonBCurrentHP <= 0) {
      return true;
    }

    return false;
  };

  const determineWinnerAndFinish = () => {
    if (pokemonACurrentHP !== 0) {
      console.log(`## ${pokemonAIdentity.name.english} has won the fight!`);
      gameLog.push(`${pokemonAIdentity.name.english} has won the fight!`);
      setGameLogState([...gameLogState,`${pokemonAIdentity.name.english} has won the fight!`])
      setGameWinnerId(pokemonAIdentity.id);
      setWinner("A");
    } else if (pokemonBCurrentHP !== 0) {
      console.log(`## ${pokemonBIdentity.name.english} has won the fight!`);
      gameLog.push(`${pokemonBIdentity.name.english} has won the fight!`);
      setGameLogState([...gameLogState,`${pokemonBIdentity.name.english} has won the fight!`])
      setGameWinnerId(pokemonBIdentity.id);
      setWinner("B");
    } else {
      console.log("## It's a draw!");
      gameLog.push("It's a draw!");
      setGameLogState([...gameLogState,"It's a draw!"])
      setGameWinnerId(-1);
      setWinner("X");
    }
    setGameActive(false);
  };

  const executeTurn = () => {
    if (gameActive === true) {
      console.log("Calculating next turn...");
      setCurrentTurn(currentTurn + 1);
      //roll speed
      let speedPhaseText = "";
      let attackPhaseOneText = "";
      let attackPhaseTwoText = "";

      //speed roll phase
      const speedRollA = Math.floor(Math.random() * pokemonAStats.SPD);
      const speedRollB = Math.floor(Math.random() * pokemonBStats.SPD);
      let AB = false;
      let fasterPokemon = "A";
      if (speedRollA > speedRollB) {
        AB = true;
        fasterPokemon = "A";
        speedPhaseText = `${JSON.stringify(
          pokemonAIdentity.name.english
        )} rolled ${JSON.stringify(
          speedRollA
        )} speed and goes first vs ${JSON.stringify(
          pokemonBIdentity.name.english
        )}(${JSON.stringify(speedRollB)}).`;
      } else if (speedRollB > speedRollA) {
        AB = false;
        fasterPokemon = "B";
        speedPhaseText = `${JSON.stringify(
          pokemonBIdentity.name.english
        )} rolled ${JSON.stringify(
          speedRollB
        )} speed and goes first vs ${JSON.stringify(
          pokemonAIdentity.name.english
        )}(${JSON.stringify(speedRollA)}).`;
      } else {
        const x = Math.floor(Math.random() * 2) == 0;
        if (x) {
          AB = true;
          fasterPokemon = "A";
          speedPhaseText = `${JSON.stringify(
            pokemonAIdentity.name.english
          )} rolled ${JSON.stringify(
            speedRollA
          )} speed and goes first vs ${JSON.stringify(
            pokemonBIdentity.name.english
          )}(${JSON.stringify(speedRollB)}).`;
        } else {
          AB = false;
          fasterPokemon = "B";
          speedPhaseText = `${JSON.stringify(
            pokemonBIdentity.name.english
          )} rolled ${JSON.stringify(
            speedRollB
          )} speed and goes first vs ${JSON.stringify(
            pokemonAIdentity.name.english
          )}(${JSON.stringify(speedRollA)}).`;
        }
      }
      console.log(speedPhaseText);
      gameLog.push(speedPhaseText);
      setGameLogState([...gameLogState,speedPhaseText]);

      //attack phase one
      //TODO:implement attack pahse ONE (AB or BA based on order)
      let damagePhase1 = 0;
      if (AB) {
        //A attacks B
        //roll normal or sp attack
        const spAttack = Math.floor(Math.random() * 100) >= 80;
        //roll dmg
        //attacking 1.1x dmg value if speed roll won
        let atkRoll;
        if (spAttack) {
          atkRoll = Math.floor(Math.random() * pokemonBStats.ATK_SP * 1.1);
        } else {
          atkRoll = Math.floor(Math.random() * pokemonBStats.ATK * 1.1);
        }
        //roll defense
        let defRoll;
        if (spAttack) {
          defRoll = Math.floor(Math.random() * pokemonBStats.DEF_SP);
        } else {
          defRoll = Math.floor(Math.random() * pokemonBStats.DEF);
        }
        //determine damage
        damagePhase1 = defRoll - atkRoll < 0 ? (defRoll - atkRoll) : 0;
        //update health if damage >=0
        updatePokemonBHealth(damagePhase1);
        const specialString = spAttack ? " (SP)" : "";
        attackPhaseOneText = `Pokemon ${JSON.stringify(
          pokemonAIdentity.name.english
        )}(${JSON.stringify(pokemonACurrentHP)}) dealt ${JSON.stringify(
          Math.abs(damagePhase1)
        )} damage (${atkRoll} vs ${defRoll}${specialString}) to ${JSON.stringify(
          pokemonBIdentity.name.english
        )}(${JSON.stringify(pokemonBCurrentHP)}) during Phase1 `;
      } else {
        //B attacks A
        //roll normal or sp attack
        const spAttack = Math.floor(Math.random() * 100) >= 80;
        //roll dmg
        //getting attacked with 1.1x dmg value if speed roll lost
        let atkRoll;
        if (spAttack) {
          atkRoll = Math.floor(Math.random() * pokemonBStats.ATK_SP * 1.1);
        } else {
          atkRoll = Math.floor(Math.random() * pokemonBStats.ATK * 1.1);
        }
        //roll defense
        let defRoll;
        if (spAttack) {
          defRoll = Math.floor(Math.random() * pokemonBStats.DEF_SP);
        } else {
          defRoll = Math.floor(Math.random() * pokemonBStats.DEF);
        }
        //determine damage
        damagePhase1 = defRoll - atkRoll < 0 ? (defRoll - atkRoll) : 0;
        //update health if damage >=0
        updatePokemonAHealth(damagePhase1);
        const specialString = spAttack ? " (SP)" : "";
        attackPhaseOneText = `Pokemon ${JSON.stringify(
          pokemonBIdentity.name.english
        )}(${JSON.stringify(pokemonBCurrentHP)}) dealt ${JSON.stringify(
          Math.abs(damagePhase1)
        )} damage (${atkRoll} vs ${defRoll}${specialString}) to ${JSON.stringify(
          pokemonAIdentity.name.english
        )}(${JSON.stringify(pokemonACurrentHP)}) during Phase1 `;
      }
      console.log(attackPhaseOneText);
      gameLog.push(attackPhaseOneText);
      setGameLogState([...gameLogState,attackPhaseOneText]);
      //attack phase two
      //TODO:implement attack phase TWO (BA or AB based on order)
      let damagePhase2 = 0;
      if (AB) {
        //B attacks A
        //roll normal or sp attack
        const spAttack = Math.floor(Math.random() * 100) >= 80;
        //roll dmg
        let atkRoll;
        if (spAttack) {
          atkRoll = Math.floor(Math.random() * pokemonBStats.ATK_SP);
        } else {
          atkRoll = Math.floor(Math.random() * pokemonBStats.ATK);
        }
        //roll defense
        //defending with 1.3x def roll if won speed roll this turn
        let defRoll;
        if (spAttack) {
          defRoll = Math.floor(Math.random() * pokemonBStats.DEF_SP * 1.3);
        } else {
          defRoll = Math.floor(Math.random() * pokemonBStats.DEF * 1.3);
        }
        //determine damage
        damagePhase2 = defRoll - atkRoll < 0 ? (defRoll - atkRoll) : 0;
        //update health if damage >=0
        updatePokemonAHealth(damagePhase2);
        const specialString = spAttack ? " (SP)" : "";
        attackPhaseTwoText = `Pokemon ${JSON.stringify(
          pokemonBIdentity.name.english
        )}(${JSON.stringify(pokemonBCurrentHP)}) dealt ${JSON.stringify(
          Math.abs(damagePhase2)
        )} damage (${atkRoll} vs ${defRoll}${specialString}) to ${JSON.stringify(
          pokemonAIdentity.name.english
        )}(${JSON.stringify(pokemonACurrentHP)}) during Phase2 `;
      } else {
        //A attacks B
        //roll normal or sp attack
        const spAttack = Math.floor(Math.random() * 100) >= 80;
        //roll dmg
        let atkRoll;
        if (spAttack) {
          atkRoll = Math.floor(Math.random() * pokemonBStats.ATK_SP);
        } else {
          atkRoll = Math.floor(Math.random() * pokemonBStats.ATK);
        }
        //roll defense
        //getting defended against with 1.3x def roll if lost speed roll this turn
        let defRoll;
        if (spAttack) {
          defRoll = Math.floor(Math.random() * pokemonBStats.DEF_SP * 1.3);
        } else {
          defRoll = Math.floor(Math.random() * pokemonBStats.DEF * 1.3);
        }
        //determine damage
        damagePhase2 = defRoll - atkRoll < 0 ? (defRoll - atkRoll) : 0;
        //update health if damage >=0
        updatePokemonBHealth(damagePhase2);
        const specialString = spAttack ? " (SP)" : "";
        attackPhaseTwoText = `Pokemon ${JSON.stringify(
          pokemonAIdentity.name.english
        )}(${JSON.stringify(pokemonACurrentHP)}) dealt ${JSON.stringify(
          Math.abs(damagePhase1)
        )} damage (${atkRoll} vs ${defRoll}${specialString}) to ${JSON.stringify(
          pokemonBIdentity.name.english
        )}(${JSON.stringify(pokemonBCurrentHP)}) during Phase2 `;
      }
      console.log(attackPhaseTwoText);
      gameLog.push(attackPhaseTwoText);
      setGameLogState([...gameLogState,attackPhaseTwoText]);
      //game state check phase
    } else {
      console.log("No active game. Cannot calculate next turn.");
      return;
    }
    return;
  };

  const updatePokemonAIdentity = (key, value) => {
    console.log(
      `Changing PokemonA's Identity param: ${key} value to: ${JSON.stringify(
        value
      )}`
    );
    setPokemonAIdentity({
      ...pokemonAIdentity,
      [key]: value,
    });
  };

  const updatePokemonBIdentity = (key, value) => {
    console.log(
      `Changing PokemonB's Identity param: ${key} value to: ${JSON.stringify(
        value
      )}`
    );
    setPokemonBIdentity({
      ...pokemonBIdentity,
      [key]: value,
    });
  };

  const initPokemonAStats = (stats) => {
    setPokemonAStats(stats);
    setPokemonACurrentHP(stats.HP);
  };

  const initPokemonBStats = (stats) => {
    setPokemonBStats(stats);
    setPokemonBCurrentHP(stats.HP);
  };

  const updatePokemonAHealth = (change) => {
    setPokemonACurrentHP(
      pokemonACurrentHP + change < 0 ? 0 : pokemonACurrentHP + change
    );
  };

  const updatePokemonBHealth = (change) => {
    setPokemonBCurrentHP(
      pokemonBCurrentHP + change < 0 ? 0 : pokemonBCurrentHP + change
    );
  };

  return (
    <>
      <div className="totalContainer">
        <div className="firstColumn">
          <button className="saveButton" onClick={saveGame}>
            Save Match
          </button>
          <br />
          {!gameActive && winner === "A" && (
            <label className="winnerLabel">Winner!</label>
          )}
          {!gameActive && winner === "X" && (
            <label className="winnerLabel">DRAW!</label>
          )}
          <div className="leftFirstSubContainer">
          <div className="extracontainer">
          <label text="id" />
              <textarea
                ref={inputId1}
                className="id1 identityInput"
                placeholder="id.."
              ></textarea>
            </div>
            <div className="leftSecondSubContainer">
              <label text="name" />
              <textarea
                ref={inputName1}
                className="name1 identityInput"
                placeholder="name.."
                value={
                  pokemonAIdentity
                    ? pokemonAIdentity.name
                      ? pokemonAIdentity.name.english
                      : ""
                    : ""
                }
              ></textarea>
            </div>
            <div className="leftThirdSubContainer">
              <label>HP_current</label>
              <textarea
                disabled="true"
                ref={hp1}
                className="hp_1_current gameplayUIValue"
                value={
                  pokemonACurrentHP === 0
                    ? "0"
                    : pokemonACurrentHP
                    ? pokemonACurrentHP
                    : "-"
                }
                rows="1"
              ></textarea>
              <label>HP_max</label>
              <textarea
                disabled="true"
                className="hp_1_max gameplayUIValue"
                value={pokemonAStats ? pokemonAStats.HP : "-"}
                rows="1"
              ></textarea>
              <label>ATK</label>
              <textarea
                disabled="true"
                className="atk_1 gameplayUIValue"
                value={
                  pokemonAStats
                    ? pokemonAStats.ATK + "|" + pokemonAStats.ATK_SP
                    : "-|-"
                }
                rows="1"
              ></textarea>
              <label>DEF</label>
              <textarea
                disabled="true"
                className="def_1 gameplayUIValue"
                value={
                  pokemonAStats
                    ? pokemonAStats.DEF + "|" + pokemonAStats.DEF_SP
                    : "-|-"
                }
                rows="1"
              ></textarea>
              <label>SPD</label>
              <textarea
                disabled="true"
                className="speed_1 gameplayUIValue"
                value={pokemonAStats ? pokemonAStats.SPD : "-"}
                rows="1"
              ></textarea>
              <img
                src="https://www.pngkit.com/png/detail/10-103745_report-abuse-cutest-pokemon-picture-ever.png"
                width="200px"
                alt="Pokemon img not found"
              ></img>
            </div>
          </div>
        </div>
        <div className="secondColumn">
          <h1 className="pokeFightLogo">PokéFight</h1>
          <div>
            <button className="startGameButton" onClick={startGame}>
              FIGHT!
            </button>
            <br />
            <br />
            <button className="nextTurnButton" onClick={executeTurn}>
              Next turn
            </button>
            <br />
            <label>Turn: </label>
            <textarea
              disabled="true"
              className="turnLabel turnNumberValue"
              value={currentTurn ? currentTurn : "0"}
            ></textarea>
          </div>
        </div>
        <div className="thirdColumn">
          <button className="randomButton" onClick={randomizeIds}>
            Randomize
          </button>
          <br />
          {!gameActive && winner === "B" && (
            <label className="winnerLabel">Winner!</label>
          )}
          {!gameActive && winner === "X" && (
            <label className="winnerLabel">DRAW!</label>
          )}
          <div className="rightFirstSubContainer">
            <div>
            <textarea
                ref={inputId2}
                className="id2 identityInput"
                placeholder="id.."
                rows="1"
              ></textarea>
            </div>
            <div className="rightSecondSubContainer">
              <br />
              <textarea
                ref={inputName2}
                className="name2 identityInput"
                placeholder="name.."
                value={
                  pokemonBIdentity
                    ? pokemonBIdentity.name
                      ? pokemonBIdentity.name.english
                      : ""
                    : ""
                }
                rows="1"
              ></textarea>
            </div>
            <div className="rightThirdSubContainer">
              <label>HP_current</label>
              <textarea
                disabled="true"
                ref={hp2}
                className="hp_2 gameplayUIValue"
                value={
                  pokemonBCurrentHP === 0
                    ? "0"
                    : pokemonBCurrentHP
                    ? pokemonBCurrentHP
                    : "-"
                }
                rows="1"
              ></textarea>
              <label>HP_max</label>
              <textarea
                disabled="true"
                className="hp_2_max gameplayUIValue"
                value={pokemonBStats ? pokemonBStats.HP : "-"}
                rows="1"
              ></textarea>
              <label>ATK</label>
              <textarea
                disabled="true"
                className="atk_2 gameplayUIValue"
                value={
                  pokemonBStats
                    ? pokemonBStats.ATK + "|" + pokemonBStats.ATK_SP
                    : "-|-"
                }
                rows="1"
              ></textarea>
              <label>DEF</label>
              <textarea
                disabled="true"
                className="def_2 gameplayUIValue"
                value={
                  pokemonBStats
                    ? pokemonBStats.DEF + "|" + pokemonBStats.DEF_SP
                    : "-|-"
                }
                rows="1"
              ></textarea>
              <label>SPD</label>
              <textarea
                disabled="true"
                className="speed_2 gameplayUIValue"
                value={pokemonBStats ? pokemonBStats.SPD : "-"}
                rows="1"
              ></textarea>
              <img
                src="https://www.pngkit.com/png/detail/10-103745_report-abuse-cutest-pokemon-picture-ever.png"
                width="200px"
                alt="Pokemon img not found"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PokemonGame;
