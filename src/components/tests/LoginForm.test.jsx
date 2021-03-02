import {
  render,
  screen,
  waitFor,
} from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";

describe("login form", () => {
  it("should render login form", () => {
    render(<LoginForm />);

    const usernameField = screen.getByPlaceholderText(/enter your email/i);
    expect(usernameField).toBeInTheDocument();

    const passwordField = screen.getByPlaceholderText(/enter your password/i);
    expect(passwordField).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("sholud login user", async () => {
    render(<LoginForm />);

    const usernameField = screen.getByPlaceholderText(/enter your email/i);
    userEvent.clear(usernameField);
    userEvent.type(usernameField, "test@test.com");

    const passwordField = screen.getByPlaceholderText(/enter your password/i);
    userEvent.clear(passwordField);
    userEvent.type(passwordField, "123456qW!");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitButton);

    await waitFor(() => expect(window.location.href).toContain("/home"));
  });
});
