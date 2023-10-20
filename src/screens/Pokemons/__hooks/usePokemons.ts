import {useInfiniteQuery} from 'react-query';

//apis
import {getPokemons} from 'apis/pokemons';
//constants
import QueryKeys from 'constants/queryKeys';

const usePokemons = () =>
  useInfiniteQuery([QueryKeys.GET_POKEMONS], getPokemons, {
    getNextPageParam: lastPage => {
      if (lastPage.next !== null) {
        return lastPage.next;
      }
      return lastPage;
    },
  });

export default usePokemons;
