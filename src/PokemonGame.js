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
                <label className="winnerLabel">Winner</label>
                <div className="leftFirstSubContainer">
                    <div className="leftSecondSubContainer">
                        <textarea className="idArea"></textarea>
                        <textarea></textarea>
                    </div>
                    <div className="leftThirdSubContainer">
                        <textarea clasName="resultsOne"></textarea>
                        <textarea clasName="resultsOne"></textarea>
                        <textarea clasName="resultsOne"></textarea>
                        <textarea></textarea>
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
            <button className="randomButton">Randomize</button><br/>
                <label className="winnerLabel">Winner</label>
                <div className="leftFirstSubContainer">
                    <div className="leftSecondSubContainer">
                        <textarea className="idArea"></textarea>
                        <textarea></textarea>
                    </div>
                    <div className="leftThirdSubContainer">
                        <textarea clasName="resultsOne"></textarea>
                        <textarea clasName="resultsOne"></textarea>
                        <textarea clasName="resultsOne"></textarea>
                        <textarea></textarea>
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