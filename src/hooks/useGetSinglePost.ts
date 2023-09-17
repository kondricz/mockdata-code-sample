import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL, PostInterface } from "../config";
import { useParams } from "react-router";

export const useGetSinglePost = () => {
  const { id } = useParams();

  const asyncFunction = async () => {
    const { data } = await axios<PostInterface>({
      method: `GET`,
      url: `${BASE_URL}/posts/${id}`,
    });
    return data;
  };
  return useQuery<PostInterface, AxiosError>({
    queryKey: [`post`, id],
    queryFn: asyncFunction,
    retry: false,
    staleTime: Infinity,
  });
};
