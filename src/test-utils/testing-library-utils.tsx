import React, { FC, ReactElement } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import configureStore from "../store/configureStore";

const store = configureStore();

const AllTheProviders: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

const customRender = (ui: ReactElement, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: AllTheProviders });
};

export * from "@testing-library/react";

export { customRender as render };
