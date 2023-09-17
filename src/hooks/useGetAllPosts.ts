import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL, PostInterface } from "../config";

export const useGetAllPosts = () => {
  const asyncFunction = async () => {
    const { data } = await axios<PostInterface[]>({
      method: `GET`,
      url: `${BASE_URL}/posts`,
    });
    return data;
  };
  return useQuery<PostInterface[], AxiosError>({
    queryKey: [`posts`],
    queryFn: asyncFunction,
    retry: false,
    staleTime: Infinity
  });
};
