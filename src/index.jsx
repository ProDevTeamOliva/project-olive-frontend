import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { applyMiddleware, compose, createStore } from "redux";
import { createMiddleware } from "redux-api-middleware";
import thunk from "redux-thunk";
import reducers from "./reducers/index";
import { Provider } from "react-redux";
import { UserSocketProvider } from "./UserSocketContext";

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk, createMiddleware()),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <UserSocketProvider>
          <App />
        </UserSocketProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root") || document.createElement("div")
);
