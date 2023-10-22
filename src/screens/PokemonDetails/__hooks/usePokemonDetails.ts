import {useQuery} from 'react-query';
import {AxiosResponse} from 'axios';

//types
import {IPokemonDetails} from 'types';
//apis
import {getPokemonDetails} from 'apis/pokemons';
//constants
import QueryKeys from 'constants/queryKeys';

const usePokemonDetails = (url: string) => {
  const {isLoading, data, error} = useQuery<
    AxiosResponse<IPokemonDetails, Error>
  >([QueryKeys.GET_POKEMON_DETAILS, url], () => getPokemonDetails(url));

  return {
    isLoading,
    pokemonDetails: data?.data,
    error,
  };
};

export default usePokemonDetails;
