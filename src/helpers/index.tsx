import { UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Navigate } from "react-router";

interface DataFetcherProps<QueryResult> {
  query: () => UseQueryResult<QueryResult, AxiosError>;
  loadingView: JSX.Element;
  errorView: JSX.Element;
  successView: (data: QueryResult) => JSX.Element;
  redirectOnNotFound?: boolean;
  logoutOnUnAuthorized?: boolean;
}

interface APIErrorHandlerProps {
  redirectOnNotFound?: boolean;
  logoutOnUnAuthorized?: boolean;
  status: number;
  children: JSX.Element;
}

const APIErrorHandler = (props: APIErrorHandlerProps) => {
  if (props.redirectOnNotFound && props.status === 404) {
    return <Navigate to="/not-found" replace />;
  }
  if (props.logoutOnUnAuthorized && props.status === 403) {
    return <Navigate to="/login" replace />;
  }
  return props.children;
};

export const DataFetcher = <QueryResult,>(
  props: DataFetcherProps<QueryResult>
) => {
  const { data, error, isLoading } = props.query();

  if (error) {
    return (
      <APIErrorHandler {...props} status={error.response?.status || 200}>
        {props.errorView}
      </APIErrorHandler>
    );
  }

  if (isLoading || !data) {
    return props.loadingView;
  }

  return props.successView(data);
};
