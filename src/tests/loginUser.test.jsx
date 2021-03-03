import { render, screen } from "../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("login user", () => {
  it("sholud login user", async () => {
    render(<App />);

    const loginLink = screen.getByRole("link", { name: /login/i });
    userEvent.click(loginLink);

    const usernameField = screen.getByPlaceholderText(/enter your email/i);
    userEvent.clear(usernameField);
    userEvent.type(usernameField, "test@test.com");

    const passwordField = screen.getByPlaceholderText(/enter your password/i);
    userEvent.clear(passwordField);
    userEvent.type(passwordField, "123456qW!");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitButton);

    const homeText = await screen.findByText(/home component/i);
    expect(homeText).toBeInTheDocument();
  });
});
