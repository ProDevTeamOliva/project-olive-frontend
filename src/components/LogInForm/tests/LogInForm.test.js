import { fireEvent, render, screen } from "@testing-library/react";
import { store } from "../../..";
import { Provider } from "react-redux";
import theme from "../../../theme";
import { ChakraProvider } from "@chakra-ui/react";
import { UserSocketProvider } from "../../../UserSocketContext";
import LogInForm from "../LogInForm";

function renderWithProviders(ui) {
  return render(
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <UserSocketProvider>{ui}</UserSocketProvider>
      </ChakraProvider>
    </Provider>
  );
}

test("initial values form", async () => {
  renderWithProviders(<LogInForm />);
  const loginInput = await screen.findByLabelText("login");
  const passwordInput = await screen.findByLabelText("password");

  expect(loginInput.value).toMatch("");
  expect(passwordInput.value).toMatch("");
});

test("change values form", async () => {
  renderWithProviders(<LogInForm />);
  const loginInput = await screen.findByLabelText("login");
  const passwordInput = await screen.findByLabelText("password");
  fireEvent.change(loginInput, { target: { value: "AKowalski" } });

  expect(loginInput.value).toMatch("AKowalski");
  expect(passwordInput.value).toMatch("");
});
