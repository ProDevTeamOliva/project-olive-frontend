import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { applyMiddleware, createStore } from "redux";
import { createMiddleware } from "redux-api-middleware";
import thunk from "redux-thunk";
import reducers from "./reducers/index";
import { Provider } from "react-redux";

export const store = createStore(
  reducers,
  applyMiddleware(thunk, createMiddleware())
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
