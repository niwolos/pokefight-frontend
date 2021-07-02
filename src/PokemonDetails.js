import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PokemonDetails({ pokemonList }) {
  const { id } = useParams();
  const { info } = useParams();
  const [pokemonById, setPokemonById] = useState();

  useEffect(() => {
    if (!info) {
      axios
        .get(`/api/pokemon/${id}`)
        .then((res) => {
          console.log({ pokemon_data: res.data });
          setPokemonById(res.data);
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
      axios
        .get(`/api/pokemon/${id}/${info}`)
        .then((res) => {
          console.log({ pokemon_data: res.data });
          setPokemonById(res.data);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  }, []);

  /**
  if (pokemonList) {
    const selectedPokemonById = pokemonList.find((pokemon) => {
      return pokemon.id == id;
    });
    */

  if (pokemonById) {
    if (info) {
        let infoElement = <p>Invalid Parameter. Please use 'name', 'type' or 'base' in the URL! e.g.: ".../pokemon/id/type/"</p>;
        switch (info.toLowerCase()) {
            case "name":
              infoElement = <p>Name: {pokemonById.name.english}</p>;
              break;
            case "type":
                infoElement = <p>Name: {JSON.stringify(pokemonById.type)}</p>;
              break;
            case "base":
                infoElement = <p>Name: {JSON.stringify(pokemonById.base)}</p>;
              break;
            default:
              break;
        }
    
        return (
            <>
              <a href="/">List of Pokemons</a>
              {infoElement}
            </>
          );
    } else {
      return (
        <>
          <a href="/">List of Pokemons</a>
          <p>Name: {pokemonById.name.english}</p>
          <p>Name: {JSON.stringify(pokemonById.type)}</p>
          <p>Name: {JSON.stringify(pokemonById.base)}</p>
        </>
      );
    }
  }

  return (
    <>
      <>404. No pokemon detailed data available for this id.</>
    </>
  );
}
