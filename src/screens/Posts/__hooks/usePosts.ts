import {useQuery} from 'react-query';
import axios, {AxiosResponse} from 'axios';

//types
import {IComment} from 'types';

const fetchPosts = () =>
  axios.get('https://jsonplaceholder.typicode.com/posts');

const usePosts = () =>
  useQuery<AxiosResponse<IComment[], Error>>('posts', fetchPosts);
export default usePosts;
