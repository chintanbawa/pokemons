import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//hooks
import usePosts from './__hooks/usePosts';
//components
import {Text} from 'components/Text';
//colors
import Colors from 'constants/colors';

const Posts = () => {
  const navigation = useNavigation();

  //useQuery hooks
  const {data, isLoading, isSuccess} = usePosts();

  return (
    <View style={styles.container}>
      {isLoading && (
        <React.Fragment>
          <Text>Loading...</Text>
        </React.Fragment>
      )}

      {isSuccess && (
        <React.Fragment>
          <Text style={styles.header}>all posts</Text>
          <FlatList
            data={data.data}
            style={styles.wrapper}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.push('Post', {post: item})}
                style={styles.post}>
                <View style={styles.item}>
                  <Text style={styles.postTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </React.Fragment>
      )}
    </View>
  );
};

export default Posts;

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 10,
  },
  wrapper: {
    flex: 1,
    paddingVertical: 30,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 30,
    color: Colors.primary,
    paddingVertical: 10,
  },
  post: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  postTitle: {color: Colors.white, textTransform: 'capitalize'},
});
