import { render, screen } from "../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import RegisterForm from "../components/RegisterForm";
import App from "../App";

describe("register new user", () => {
  it("should render register form", () => {
    render(<RegisterForm />);

    const firstNameField = screen.getByPlaceholderText(
      /enter your first name/i
    );
    expect(firstNameField).toBeInTheDocument();

    const emailField = screen.getByPlaceholderText(/enter your email/i);
    expect(emailField).toBeInTheDocument();

    const passwordField = screen.getByPlaceholderText(/enter your password/i);
    expect(passwordField).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("should register new user and redirect to home page", async () => {
    render(<App />);

    const registerLink = screen.getByRole("link", { name: /register/i });
    userEvent.click(registerLink);

    const firstNameField = screen.getByPlaceholderText(
      /enter your first name/i
    );
    userEvent.clear(firstNameField);
    userEvent.type(firstNameField, "Test");

    const emailField = screen.getByPlaceholderText(/enter your email/i);
    userEvent.clear(emailField);
    userEvent.type(emailField, "test@test.com");

    const passwordField = screen.getByPlaceholderText(/enter your password/i);
    userEvent.clear(passwordField);
    userEvent.type(passwordField, "123456qW!");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitButton);

    const homeText = await screen.findByText(/home component/i);
    expect(homeText).toBeInTheDocument();
  });
});
