// import Routes from "./routes";
import Store from "./Store";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import FormPage from "./pages/FormPage";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="new-register" element={<FormPage />} />
      <Route path="edit">
        <Route
          path=":id"
          element={<FormPage />}
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
)
function App() {
  return (
    <Store>
      <RouterProvider router={router} />
    </Store>
  );
}

export default App;
