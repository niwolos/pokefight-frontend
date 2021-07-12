import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./PokemonGame.css";
import App from "./App.js";

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
  let gameLog = [];
  let gameWinnerId = -1;

  useEffect(() => {}, [pokemonACurrentHP, pokemonBCurrentHP]);

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
      updatePokemonAIdentity("id", pokemonAObj.id);
      updatePokemonAIdentity("name", pokemonAObj.name);
      inputName1.current.value = pokemonAObj.name.english;
      //identity B
      updatePokemonBIdentity("id", pokemonBObj.id);
      updatePokemonBIdentity("name", pokemonBObj.name);
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
      let pokemonBStatsFormatted;
      pokemonBStatsFormatted = {
        HP: pokemonBObj.base.HP,
        ATK: pokemonBObj.base.Attack,
        ATK_SP: pokemonBObj.base["Sp. Attack"],
        DEF: pokemonBObj.base.Defense,
        DEF_SP: pokemonBObj.base["Sp. Defense"],
        SPD: pokemonBObj.base.Speed,
      };
      initPokemonBStats(pokemonAStatsFormatted);
      initPokemonAStats(pokemonBStatsFormatted);
    } else {
      console.log({ pokemon_A: pokemonAObj }, { pokemon_B: pokemonBObj });
      console.error(
        "Unable to begin game, invalid IDs or names. Consider randomizing IDs"
      );
      alert("Unable to start game.\nConsider randomizing IDs!");
    }
  };

  const saveGame = () => {
    //TODO:implement saving feature towards API game/save with data from end of game like defined in backend .txt file
    //pokemon_1_name String (english)
    //pokemon_1_id Number
    //pokemon_2_name String (english)
    //pokemon_2_id Number
    //game_winner_name String (if draw:"DRAW")
    //game_winner_id Number (if draw:-1)
    //game_rounds Number
    //game_log Array (of strings)
  };

  const checkIfGameOver = () => {
    if (pokemonACurrentHP <= 0 || pokemonBCurrentHP <= 0) {
      return true;
    }
    return false;
  };

  const determineWinnerAndFinish = () => {
    let winnerId = -1;
    let winnerSide = "X";
    if (pokemonACurrentHP !== 0) {
      console.log(`## ${pokemonAIdentity.name.english} has won the fight!`);
      gameLog.push(`${pokemonAIdentity.name.english} has won the fight!`);
      gameWinnerId = pokemonAIdentity.id;
      setWinner("A");
    } else if (pokemonBCurrentHP !== 0) {
      console.log(`## ${pokemonBIdentity.name.english} has won the fight!`);
      gameLog.push(`${pokemonBIdentity.name.english} has won the fight!`);
      gameWinnerId = pokemonBIdentity.id;
      setWinner("B");
    } else {
      console.log("## It's a draw!");
      gameLog.push("It's a draw!");
      gameWinnerId = -1;
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
        damagePhase1 = defRoll - atkRoll < 0 ? (defRoll - atkRoll) * 0.5 : 0;
        //update health if damage >=0
        updatePokemonBHealth(damagePhase1);
        const specialString = spAttack?" (SP)":"";
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
        damagePhase1 = defRoll - atkRoll < 0 ? (defRoll - atkRoll) * 0.5 : 0;
        //update health if damage >=0
        updatePokemonAHealth(damagePhase1);
        const specialString = spAttack?" (SP)":"";
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
        damagePhase2 = defRoll - atkRoll < 0 ? (defRoll - atkRoll) * 0.5 : 0;
        //update health if damage >=0
        updatePokemonAHealth(damagePhase2);
        const specialString = spAttack?" (SP)":"";
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
        damagePhase2 = defRoll - atkRoll < 0 ? (defRoll - atkRoll) * 0.5 : 0;
        //update health if damage >=0
        updatePokemonBHealth(damagePhase2);
        const specialString = spAttack?" (SP)":"";
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
      //game state check phase
      if (checkIfGameOver()) {
        //game winner check phase
        determineWinnerAndFinish();
      }
    } else {
      console.log("No active game. Cannot calculate next turn.");
      return;
    }
    return;
  };

  const updatePokemonAIdentity = (key, value) => {
    console.log(
      `Changing PokemonA's Identity param: ${key} value to: ${JSON.stringify(value)}`
    );
    setPokemonAIdentity({
      ...pokemonAIdentity,
      [key]: value,
    });
  };

  const updatePokemonBIdentity = (key, value) => {
    console.log(
      `Changing PokemonB's Identity param: ${key} value to: ${JSON.stringify(value)}`
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
          <button className="saveButton">Save Match</button>
          <br />
          {(!gameActive && winner === "A") && (
            <label className="winnerLabel">Winner!</label>
          )}
          {(!gameActive && winner === "X") && (
            <label className="winnerLabel">DRAW!</label>
          )}
          <div className="leftFirstSubContainer">
            <div className="leftSecondSubContainer">
              <label text="id" />
              <textarea
                ref={inputId1}
                className="id1 identityInput"
                placeholder="id.."
              ></textarea>
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
              ></textarea>
              <label>HP_max</label>
              <textarea
                disabled="true"
                className="hp_1_max gameplayUIValue"
                value={pokemonAStats ? pokemonAStats.HP : "-"}
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
              ></textarea>
              <label>SPD</label>
              <textarea
                disabled="true"
                className="speed_1 gameplayUIValue"
                value={pokemonAStats ? pokemonAStats.SPD : "-"}
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
              className="turnLabel gameplayUIValue"
              value={currentTurn ? currentTurn : "0"}
            ></textarea>
          </div>
        </div>
        <div className="thirdColumn">
          <button className="randomButton" onClick={randomizeIds}>
            Randomize
          </button>
          <br />
          {(!gameActive && winner === "B") && (
            <label className="winnerLabel">Winner!</label>
          )}
          {(!gameActive && winner === "X") && (
            <label className="winnerLabel">DRAW!</label>
          )}
          <div className="rightFirstSubContainer">
            <div className="rightSecondSubContainer">
              <label text="id" />
              <textarea
                ref={inputId2}
                className="id2 identityInput"
                placeholder="id.."
              ></textarea>
              <label text="name" />
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
              ></textarea>
              <label>HP_max</label>
              <textarea
                disabled="true"
                className="hp_2_max gameplayUIValue"
                value={pokemonBStats ? pokemonBStats.HP : "-"}
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
              ></textarea>
              <label>SPD</label>
              <textarea
                disabled="true"
                className="speed_2 gameplayUIValue"
                value={pokemonBStats ? pokemonBStats.SPD : "-"}
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
