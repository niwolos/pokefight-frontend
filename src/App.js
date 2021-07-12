import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import PokemonDetails from "./PokemonDetails";
import PokemonGame from "./PokemonGame.js";
import axios from "axios";
import {  } from "react-router-dom";

function App() {

  const history = useHistory();  

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
      .get("http://localhost:3001/pokemon")
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
      <Switch>
        <Route exact path="/">
        <div>
        <img className="vertical" src="https://64.media.tumblr.com/5f4739c30849a8b294592c86bb197c80/tumblr_pdgplvgHte1v2nl25o1_500.png"/>
        <button className="vertical button" onClick={()=> history.push("/pokemon/games")}>Join the fight</button>
          {pokemonData.map((onePokemon) => {
            const pokemonLink = `/pokemon/${onePokemon.id}`;
            return (
                <p>
                  <a href={pokemonLink}>{onePokemon.name.english}</a>
                </p>
            );
          })}
          
        </div>
          ;
        </Route>
        
          <Route exact path="/pokemon/games">
              <PokemonGame></PokemonGame>
            </Route>
          <Route path="/pokemon/:id">
              <PokemonDetails pokemonList={pokemonData}></PokemonDetails>
            </Route>
          <Route path="/pokemon/:id/:info">
              <PokemonDetails pokemonList={pokemonData}></PokemonDetails>
            </Route>
          
          
      </Switch>      
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
