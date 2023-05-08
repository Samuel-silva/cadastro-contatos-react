import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";
import Store from "./Store";

function App() {
  return (
    <Store>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Store>
  );
}

export default App;
