import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL, PostInterface } from "../config";

export const useGetAllPosts = (page?: number) => {
  const asyncFunction = async () => {
    const { data } = await axios<PostInterface[]>({
      method: `GET`,
      url: `${BASE_URL}/posts?page=${page || 1}`,
    });
    return data;
  };
  return useQuery<PostInterface[], AxiosError>({
    queryKey: [`posts`, page],
    queryFn: asyncFunction,
    retry: false,
    staleTime: Infinity,
  });
};
