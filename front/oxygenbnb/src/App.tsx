import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Site from "./pages/Site/Site";
import Admin from "./pages/Admin/Admin";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_NODE_ENV_DEV
  ? import.meta.env.VITE_URL_NEST_DEV
  : import.meta.env.VITE_URL_NEST_PROD;
// axios.defaults.withCredentials = true;

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<Site />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
