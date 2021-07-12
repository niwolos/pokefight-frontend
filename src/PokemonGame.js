import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PokemonGame.css";

function PokemonGame() {
  const [pokemonAIdentity, setPokemonAIdentity] = useState({ id: 0 });
  const [pokemonBIdentity, setPokemonBIdentity] = useState({ id: 1 });
  const [pokemonACurrentHP, setPokemonACurrentHP] = useState();
  const [pokemonAStats, setPokemonAStats] = useState();
  const [pokemonBCurrentHP, setPokemonBCurrentHP] = useState();
  const [pokemonBStats, setPokemonBStats] = useState();
  const [currentTurn, setCurrentTurn] = useState("0");
  const [gameActive, setGameActive] = useState("false");

  const updatePokemonAIdentity = (e) => {
    console.log(
      `Changing PokemonA's Identity param: ${e.target.name} value to: ${e.target.value}`
    );
    setPokemonAIdentity({
      ...pokemonAIdentity,
      [e.target.name]: e.target.value,
    });
  };

  const updatePokemonBIdentity = (e) => {
    console.log(
      `Changing PokemonB's Identity param: ${e.target.name} value to: ${e.target.value}`
    );
    setPokemonBIdentity({
      ...pokemonBIdentity,
      [e.target.name]: e.target.value,
    });
  };

  const initPokemonAStats = (stats) => {
    setPokemonAStats(stats);
    setPokemonACurrentHP(stats.hp);
  };

  const initPokemonBStats = (stats) => {
    setPokemonBStats(stats);
    setPokemonBCurrentHP(stats.hp);
  };

  const updatePokemonAHealth = (change) => {
    setPokemonACurrentHP(pokemonACurrentHP + change);
  };

  const updatePokemonBHealth = (change) => {
    setPokemonBCurrentHP(pokemonBCurrentHP + change);
  };

  return (
    <>
      <div className="totalContainer">
        <div className="firstColumn">
          <button className="saveButton">Save Match</button>
          <br />
          <label className="winnerLabel">Winner</label>
          <div className="leftFirstSubContainer">
            <div className="leftSecondSubContainer">
              <label text="id" />
              <textarea className="id1" placeholder="id.."></textarea>
              <label text="name" />
              <textarea className="name1" placeholder="name.."></textarea>
            </div>
            <div className="leftThirdSubContainer">
              <label text="HP" />
              <textarea clasName="hp_1"></textarea>
              <label text="ATK" />
              <textarea clasName="atk_1"></textarea>
              <label text="DEF" />
              <textarea clasName="def_1"></textarea>
              <label text="SPD" />
              <textarea clasName="speed_1"></textarea>
              <img
                src="https://www.pngkit.com/png/detail/10-103745_report-abuse-cutest-pokemon-picture-ever.png"
                width="200px"
                alt="Pokemon img not found"
              ></img>
            </div>
          </div>
        </div>
        <div className="secondColumn">
          <h1>PokéFight?</h1>
          <div>
            <button>Next turn</button>
            <label>Turn</label>
            <button>x</button>
          </div>
        </div>
        <div className="thirdColumn">
          <button className="randomButton">Randomize</button>
          <br />
          <label className="winnerLabel">Winner</label>
          <div className="rightFirstSubContainer">
            <div className="rightSecondSubContainer">
              <label text="id" />
              <textarea className="id2" placeholder="id.."></textarea>
              <label text="name" />
              <textarea className="name2" placeholder="name.."></textarea>
            </div>
            <div className="rightThirdSubContainer">
              <label text="HP" />
              <textarea clasName="hp_2"></textarea>
              <label text="ATK" />
              <textarea clasName="atk_2"></textarea>
              <label text="DEF" />
              <textarea clasName="def_2"></textarea>
              <label text="SPD" />
              <textarea clasName="speed_2"></textarea>
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
