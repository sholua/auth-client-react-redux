import { render, screen } from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import App from "../../App";

describe("logout", () => {
  it("should logout current user", async () => {
    render(<App />);

    // Login
    const loginLink = screen.getByRole("link", { name: /login/i });
    userEvent.click(loginLink);

    const emailField = screen.getByPlaceholderText(/enter your email/i);
    userEvent.clear(emailField);
    userEvent.type(emailField, "test@test.com");

    const passwordField = screen.getByPlaceholderText(/enter your password/i);
    userEvent.clear(passwordField);
    userEvent.type(passwordField, "123456qW!");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitButton);

    const userName = await screen.findByRole("link", { name: /test/i });
    expect(userName).toBeInTheDocument();

    // Logout
    const logoutLink = await screen.findByRole("link", { name: /logout/i });
    userEvent.click(logoutLink);

    const homeText = await screen.findByText(/home component/i);
    expect(homeText).toBeInTheDocument();

    const registerLink = await screen.findByRole("link", { name: /register/i });
    expect(registerLink).toBeInTheDocument();

    const userNameAgain = screen.queryByRole("link", { name: /test/i });
    expect(userNameAgain).not.toBeInTheDocument();
  });
});
