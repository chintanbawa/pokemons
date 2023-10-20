import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//types
import {IPokemon} from 'types';
//hooks
import usePokemons from './__hooks/usePokemons';
//components
import {Text} from 'components/Text';
//constants
import Colors from 'constants/colors';

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
      <View style={styles.warning}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.warning}>
        <Text>Sorry! something went wrong!</Text>
      </View>
    );
  }

  const renderPokemon = ({item, index}: {item: IPokemon; index: number}) => (
    <TouchableOpacity
      key={item.name + index}
      onPress={() => navigation.push('Post', {post: item})}>
      <View style={styles.item}>
        <Text style={styles.text}>{item.name.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );

  const getItemExtractorKey = (item, index) => index.toString();

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderFooterComponent = () =>
    isFetchingNextPage && <ActivityIndicator color="#000" size="large" />;

  return (
    <View style={styles.container}>
      <React.Fragment>
        <FlatList
          style={styles.wrapper}
          data={data.pages.map(page => page.results).flat()}
          keyExtractor={getItemExtractorKey}
          renderItem={renderPokemon}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={renderFooterComponent}
        />
      </React.Fragment>
    </View>
  );
};

export default Pokemons;

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 10,
  },
  warning: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  wrapper: {
    flex: 1,
    paddingVertical: 30,
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#333',
    marginVertical: 10,
    borderRadius: 10,
  },
  text: {
    color: 'white',
  },
});
