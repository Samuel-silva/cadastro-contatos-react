import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import FormPage from "./pages/FormPage";

// import Routes from "./routes";
import Store from "./Store";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route index element={<Home />} />
      <Route path="new-register" element={<FormPage />} />
      <Route path="edit/:id" element={<FormPage />} />
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
