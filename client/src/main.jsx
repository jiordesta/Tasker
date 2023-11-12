import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//antd
import "antd/dist/reset.css";

//bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

//css
import "./index.css";

//redux & toast
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store";

//pages & components
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Authentication from "./subpages/Authentication";
import CreateProject from "./components/drawers/CreateProject";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{ duration: 7500 }}
      />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/authenticate" Component={Authentication} />
        </Routes>
        <CreateProject />
      </Router>
    </Provider>
  </React.StrictMode>
);
