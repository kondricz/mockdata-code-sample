import { fireEvent, render } from "@testing-library/react";
import { AxiosError } from "axios";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();
import { AppRoutes } from "../App";
import { MemoryRouter, Routes } from "react-router";

const mockGetSinglePost = jest.fn();

const MOCK_RESPONSE_ALL_POST = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
];

jest.mock("../hooks/useGetAllPosts", () => ({
  ...jest.requireActual("../hooks/useGetAllPosts"),
  useGetAllPosts: () => ({
    data: MOCK_RESPONSE_ALL_POST,
    error: null,
    isLoading: false,
  }),
}));

jest.mock("../hooks/useGetSinglePost", () => ({
  ...jest.requireActual("../hooks/useGetSinglePost"),
  useGetSinglePost: () => mockGetSinglePost(),
}));

describe("Integration tests", () => {
  it("Should render a list of posts in homepage", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>{AppRoutes}</Routes>
      </MemoryRouter>
    );

    expect(
      getByText("ea molestias quasi exercitationem repellat qui ipsa sit aut")
    ).toBeTruthy();
  });
  it("Should show the post if the user clicks on it", () => {
    mockGetSinglePost.mockImplementationOnce(() => ({
      data: MOCK_RESPONSE_ALL_POST[2],
      error: null,
      isLoading: false,
    }));
    const { getByText, getByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>{AppRoutes}</Routes>
      </MemoryRouter>
    );

    fireEvent(
      getByText("ea molestias quasi exercitationem repellat qui ipsa sit aut"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(getByTestId(`single-post`)).toBeTruthy();
  });
  it("Should send the user to /notfound, if the ID of the post does not exists", () => {
    fireEvent(window, new Event("popstate"));
    mockGetSinglePost.mockImplementationOnce(() => ({
      data: undefined,
      error: { response: { status: 404 } } as AxiosError,
      isLoading: false,
    }));
    const { getByText, debug } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>{AppRoutes}</Routes>
      </MemoryRouter>
    );

    fireEvent(
      getByText("ea molestias quasi exercitationem repellat qui ipsa sit aut"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    debug();
    expect(getByText(`notfound page`)).toBeTruthy();
  });
  it("Should send the user to /login if the user unauthorized", () => {
    mockGetSinglePost.mockImplementation(() => ({
      data: undefined,
      error: { response: { status: 403 } } as AxiosError,
      isLoading: false,
    }));
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>{AppRoutes}</Routes>
      </MemoryRouter>
    );

    fireEvent(
      getByText("ea molestias quasi exercitationem repellat qui ipsa sit aut"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(getByText(`login page`)).toBeTruthy();
  });
});
