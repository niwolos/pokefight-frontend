import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import PokemonDetails from "./PokemonDetails";
import axios from "axios";

function App() {
  const [pokemonData, setPokemonData] = useState();
  useEffect(() => {
    /*
    fetch("http://localhost:3001/pokemon")
      .then((res) => {
        res.json();
        console.log({ data: res.data});
        setPokemonData(res.body);
      })
      */
    axios
      .get("/api/pokemon")
      .then((res) => {
        console.log({ pokemon_data: res.data });
        setPokemonData(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  if (pokemonData) {
    return (
      <>
        <Route exact path="/">
          {pokemonData.map((onePokemon) => {
            const pokemonLink = `/pokemon/${onePokemon.id}`;
            return (
              <p>
                <a href={pokemonLink}>{onePokemon.name.english}</a>
              </p>
            );
          })}
          ;
        </Route>
        <Route exact path="/pokemon/:id">
            <PokemonDetails pokemonList={pokemonData}></PokemonDetails>
          </Route>
        <Route path="/pokemon/:id/:info">
            <PokemonDetails pokemonList={pokemonData}></PokemonDetails>
          </Route>
      </>
    );
  }
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>404. You don't have pokemon data available yet.</p>
        </header>
      </div>
    </>
  );
}

export default App;
