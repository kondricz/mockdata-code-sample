import { Link } from "react-router-dom";
import { PostInterface } from "../config";
import { DataFetcher, PaginationState } from "../helpers";
import { useGetAllPosts } from "../hooks";

const AllPostView = ({
  data,
}: {
  data: PostInterface[];
  pagination: PaginationState;
}) => {
  return data.map((post) => (
    <Link key={post.id} to={`/${post.id}`}>
      <h3>{post.title}</h3>
    </Link>
  ));
};

export const AllPost = () => {
  return (
    <DataFetcher<PostInterface[]>
      query={useGetAllPosts}
      loadingView={<div>Loading...</div>}
      errorView={<div>Error</div>}
      successView={(data, pagination) => (
        <AllPostView data={data} pagination={pagination} />
      )}
      logoutOnUnAuthorized
    />
  );
};
