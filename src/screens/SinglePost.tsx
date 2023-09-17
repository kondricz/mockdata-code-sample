// import { Link } from "react-router-dom";
import { PostInterface } from "../config";
import { DataFetcher } from "../helpers";
import { useGetSinglePost } from "../hooks";

const SinglePostView = ({ data }: { data: PostInterface }) => {
  return <p>{JSON.stringify(data)}</p>
};

export const SinglePost = () => {
  return (
    <DataFetcher<PostInterface>
      query={useGetSinglePost}
      loadingView={<div>Loading...</div>}
      errorView={<div>Error</div>}
      successView={(data) => <SinglePostView data={data} />}
      redirectOnNotFound
    />
  );
};
