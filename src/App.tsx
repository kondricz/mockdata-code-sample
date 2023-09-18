import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { AllPost, NotFound, SinglePost, Login } from "./screens";

export const AppRoutes = (
  <>
    <Route path="/" element={<AllPost />} />
    <Route path="/:id" element={<SinglePost />} />
    <Route path="/not-found" element={<NotFound />} />
    <Route path="/login" element={<Login />} />
  </>
);

const router = createBrowserRouter(createRoutesFromElements(AppRoutes));

function App() {
  return <RouterProvider router={router} />;
}

export default App;
