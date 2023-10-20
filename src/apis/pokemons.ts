import axios from 'axios';

export const getPokemons = async ({pageParam = undefined}) => {
  const url =
    pageParam === undefined
      ? 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
      : pageParam;

  const data = await axios.get(url);

  return data.data;
};
