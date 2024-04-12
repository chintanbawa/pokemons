import React, {useMemo, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {Box, Divider, Flex, Image, ScrollView} from 'native-base';
import {useRoute} from '@react-navigation/native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {allColors} from 'constants/all-colors';
import Color from 'color';

//types
import {IPokemon} from 'types';
//hooks
import usePokemonDetails from './__hooks/usePokemonDetails';
//components
import {NBHeading, NBText} from 'components/Text';
import ShadowBox from 'components/ShadowBox';

const HeadingText = ({text}: {text: string}) => (
  <NBHeading fontSize="md" fontWeight={600} underline mt={2}>
    {text}
  </NBHeading>
);

const PokemonDetails = () => {
  const {width} = useWindowDimensions();
  const route = useRoute();

  const [activeDot, setActiveDot] = useState(0);

  const {pokemon} = route && (route.params as {pokemon: IPokemon});

  //useQuery hooks
  const {isLoading, pokemonDetails, error} = usePokemonDetails(pokemon.url);

  const pokemonImages = useMemo(
    () =>
      !pokemonDetails
        ? []
        : [
            pokemonDetails.sprites.other['official-artwork'].front_default,
            pokemonDetails.sprites.other['official-artwork'].front_shiny,
            pokemonDetails.sprites.other.home.front_default,
            pokemonDetails.sprites.other.home.front_shiny,
          ],
    [pokemonDetails],
  );

  if (isLoading) {
    return (
      <Box alignItems="center" my={5}>
        <NBText>Loading...</NBText>
      </Box>
    );
  }

  if (error || !pokemonDetails) {
    return (
      <Box alignItems="center" my={5}>
        <NBText>Sorry! something went wrong!</NBText>
      </Box>
    );
  }

  const renderItem = ({item, index}: {item: string; index: number}) => {
    return (
      <Image
        key={`${item}_${index}`}
        source={{uri: item}}
        alt={pokemonDetails.name}
        resizeMode="contain"
        w="100%"
        h={200}
      />
    );
  };

  const getColor = (colorName: string) => {
    const someNamedColor = allColors.find(
      color =>
        color.name.replaceAll(' ', '').toLowerCase() ===
        colorName.toLowerCase(),
    );
    const colorHex = someNamedColor ? someNamedColor.hex : '#330';

    if (!someNamedColor) {
      console.log(colorName);
    }
    return colorHex;
  };

  return (
    <ScrollView>
      <Box bgColor="#f5f5f5" flex={1}>
        <Box>
          <Carousel
            data={pokemonImages}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width}
            pagingEnabled
            onSnapToItem={slideIndex => setActiveDot(slideIndex)}
            loop
          />
          <Pagination
            dotsLength={pokemonImages.length}
            activeDotIndex={activeDot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            // eslint-disable-next-line react-native/no-inline-styles
            containerStyle={{paddingVertical: 10}}
          />
        </Box>

        <Divider />

        <Box p="10px">
          <NBHeading fontSize="4xl" fontWeight={600}>
            Name: {pokemonDetails.name.toUpperCase()}
          </NBHeading>

          <NBText mt={2}>
            <HeadingText text="Base experience:" />{' '}
            {pokemonDetails.base_experience}
          </NBText>

          <HeadingText text="Abilities:" />
          <ScrollView horizontal>
            {pokemonDetails.abilities.map((ability, index) => (
              <ShadowBox key={`${ability.ability.name}_${index}`}>
                <Flex
                  minW={width / 3}
                  h={60}
                  borderRadius={10}
                  alignItems="center"
                  justifyContent="center">
                  <NBText fontSize="12px" fontWeight="bold">
                    {ability.ability.name.toUpperCase()}
                  </NBText>
                </Flex>
              </ShadowBox>
            ))}
          </ScrollView>

          <HeadingText text="Game Indices:" />
          <ScrollView horizontal>
            {pokemonDetails.game_indices.map((gameIndex, index) => {
              const backgroundColor = getColor(gameIndex.version.name);
              const textColor = Color(backgroundColor).isLight()
                ? 'black'
                : 'white';
              return (
                <ShadowBox
                  key={`${gameIndex.version.name}_${index}`}
                  bgColor={backgroundColor}>
                  <Box
                    w={width / 3}
                    h={width / 3}
                    borderRadius={10}
                    alignItems="center"
                    justifyContent="center">
                    <NBText color={textColor} fontWeight="bold">
                      {gameIndex.version.name.toUpperCase()}
                    </NBText>
                  </Box>
                </ShadowBox>
              );
            })}
          </ScrollView>

          <HeadingText text="Moves:" />
          <ScrollView horizontal>
            {pokemonDetails.moves.map((move, index) => (
              <ShadowBox key={`${move.move.name}_${index}`}>
                <Flex
                  minW={width / 3}
                  h={60}
                  px={4}
                  alignItems="center"
                  justifyContent="center">
                  <NBText fontSize="12px" fontWeight="bold">
                    {move.move.name.toUpperCase()}
                  </NBText>
                </Flex>
              </ShadowBox>
            ))}
          </ScrollView>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default PokemonDetails;
