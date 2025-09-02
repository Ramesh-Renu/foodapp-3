import React from "react";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import { createRoot } from "react-dom/client";
import Client from "./ApolloClient";
import store from "./redux/store/store";
import { Provider } from "react-redux";
import ToastDialog from "./components/ToastDialog";

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={Client}>
    <Provider store={store}>
      <App />
      <ToastDialog></ToastDialog>
    </Provider>
  </ApolloProvider>
);
