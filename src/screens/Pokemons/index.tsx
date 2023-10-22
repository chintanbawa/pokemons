import React from 'react';
import {Box, FlatList, Spinner, Pressable} from 'native-base';
import {useNavigation} from '@react-navigation/native';

//types
import {IPokemon} from 'types';
//hooks
import usePokemons from './__hooks/usePokemons';
//components
import {NBText} from 'components/Text';

const Pokemons = () => {
  const navigation = useNavigation();

  //useQuery hooks
  const {
    isLoading,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemons();

  if (isLoading) {
    return (
      <Box alignItems="center" my={5}>
        <Spinner color="black" size="lg" />
        <NBText mt={1}>Loading...</NBText>
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Box alignItems="center" my={5}>
        <NBText>Sorry! something went wrong!</NBText>
      </Box>
    );
  }

  const renderPokemon = ({item, index}: {item: IPokemon; index: number}) => (
    <Pressable
      key={item.name + index}
      onPress={() => navigation.push('Pokemon Details', {pokemon: item})}>
      <Box bgColor="green.700" p={5} m={2} borderRadius={10}>
        <NBText color="white" fontWeight={700}>
          {item.name.toUpperCase()}
        </NBText>
      </Box>
    </Pressable>
  );

  const getItemExtractorKey = (item, index) => index.toString();

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderFooterComponent = () =>
    isFetchingNextPage && <Spinner color="#000" size="lg" />;

  return (
    <FlatList
      my={5}
      data={data.pages.map(page => page.results).flat()}
      keyExtractor={getItemExtractorKey}
      renderItem={renderPokemon}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      ListFooterComponent={renderFooterComponent}
    />
  );
};

export default Pokemons;
