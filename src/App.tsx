import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { AllPost, NotFound, SinglePost } from "./screens";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AllPost />} />
      <Route path="/:id" element={<SinglePost />} />
      <Route path="/not-found" element={<NotFound />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
