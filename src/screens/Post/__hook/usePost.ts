import {useQuery} from 'react-query';
import axios, {AxiosResponse} from 'axios';

//types
import {IComment} from 'types';

const fetchPost = async (postId: number) => {
  const {data} = await axios.get(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
  );
  return data;
};

const usePost = (postId: number) =>
  useQuery<AxiosResponse<IComment, Error>>(['posts', postId], () =>
    fetchPost(postId),
  );
export default usePost;
