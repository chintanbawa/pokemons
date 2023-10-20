import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';

//hooks
import usePost from './__hook/usePost';
//types
import {IPost} from 'types';
//components
import {Text} from 'components/Text';
//colors
import colors from 'constants/colors';

const Post = () => {
  const route = useRoute();

  const {post} = route && (route.params as {post: IPost});

  //useQuery hooks
  const {data: comments, isSuccess, isLoading} = usePost(post.id);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{post.title}</Text>
      <View style={styles.post}>
        <Text>{post.body}</Text>
      </View>
      {isLoading && <Text style={{textAlign: 'center'}}>Loading...</Text>}

      {isSuccess && (
        <React.Fragment>
          <Text style={styles.commentHeader}>Comments</Text>
          {comments.map(comment => (
            <View key={comment.id} style={styles.post}>
              <Text>{comment.body}</Text>
              <Text>{comment.email}</Text>
            </View>
          ))}
        </React.Fragment>
      )}
    </ScrollView>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 30,
  },
  header: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 40,
    color: colors.primary,
    paddingVertical: 10,
  },
  commentHeader: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 30,
    color: colors.primary,
    paddingVertical: 30,
  },
  post: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
});
