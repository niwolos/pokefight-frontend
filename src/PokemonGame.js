import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PokemonGame.css";

class PokemonGame extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  }
    }
    render() { 
      return ( 
        <>
          <div className="totalContainer">
            <div className="firstColumn">
                <button className="saveButton">Save Match</button><br/>
                <label className="winnerLabel">WinnerPokemon</label>
                <div className="leftFirstSubContainer">
                    <div className="leftSecondSubContainer">
                        <textarea className="idArea"></textarea>
                        <textarea className="inArea"></textarea>
                    </div>
                    <div className="leftThirdSubContainer">
                        <textarea className="resultsOne"></textarea>
                        <textarea className="resultsOne"></textarea>
                        <textarea className="resultsOne"></textarea>
                        <textarea className="resultsTwo"></textarea>
                    </div>
                    <div className="leftFighter">
                        <img src="https://www.pngkit.com/png/detail/10-103745_report-abuse-cutest-pokemon-picture-ever.png" width="200px"></img>
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
            <button className="randButton">Randomize</button><br/>
                <label className="winnerLabel">WinnerPokemon</label>
                <div className="rightFirstSubContainer">
                    <div className="rightSecondSubContainer">
                        <textarea className="inArea"></textarea>
                        <textarea className="idArea"></textarea>
                    </div>
                    <div className="rightThirdSubContainer">
                        <textarea className="resultsOneRight"></textarea>
                        <textarea className="resultsOneRight"></textarea>
                        <textarea className="resultsOneRight"></textarea>
                        <textarea className="resultsTwoRight"></textarea>
                    </div>
                    <div className="rightFighter">
                    <img src="https://www.pngkit.com/png/detail/10-103745_report-abuse-cutest-pokemon-picture-ever.png" width="200px"></img>
                    </div>
                </div>
            </div>
          </div>
        </>
       );
    }
  }
   
  export default PokemonGame;