import { UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { Navigate } from "react-router";

export type PaginationState = [
  number | undefined,
  React.Dispatch<React.SetStateAction<number | undefined>>
];

interface DataFetcherProps<QueryResult> {
  query: (pagination?: number) => UseQueryResult<QueryResult, AxiosError>;
  loadingView: JSX.Element;
  errorView: JSX.Element;
  successView: (data: QueryResult, pagination: PaginationState) => JSX.Element;
}

interface DataFetcherConfiguration {
  usePagination?: boolean;
  redirectOnNotFound?: boolean;
  logoutOnUnAuthorized?: boolean;
}

interface APIErrorHandlerProps {
  status: number;
  children: JSX.Element;
}

const APIErrorHandler = (
  props: APIErrorHandlerProps & DataFetcherConfiguration
) => {
  if (props.redirectOnNotFound && props.status === 404) {
    return <Navigate to="/not-found" replace />;
  }
  if (props.logoutOnUnAuthorized && props.status === 403) {
    return <Navigate to="/login" replace />;
  }
  return props.children;
};

export const DataFetcher = <QueryResult,>({
  query,
  loadingView,
  errorView,
  successView,
  ...configuration
}: DataFetcherProps<QueryResult> & DataFetcherConfiguration) => {
  const [pagination, setPagination] = useState(
    configuration.usePagination ? 1 : undefined
  );
  const { data, error, isLoading } = query(pagination);

  if (error) {
    return (
      <APIErrorHandler
        {...configuration}
        status={error.response?.status || 200}
      >
        {errorView}
      </APIErrorHandler>
    );
  }

  if (isLoading || !data) {
    return loadingView;
  }

  return successView(data, [pagination, setPagination]);
};
