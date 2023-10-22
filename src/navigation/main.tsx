import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//screens
import Pokemons from 'screens/Pokemons';
import PokemonDetails from 'screens/PokemonDetails';

const MainStack = createStackNavigator();

const Main = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Pokemons" component={Pokemons} />
    <MainStack.Screen name="Pokemon Details" component={PokemonDetails} />
  </MainStack.Navigator>
);

export default Main;
