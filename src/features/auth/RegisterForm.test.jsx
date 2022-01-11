import {
  render,
  screen,
  waitFor,
} from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import RegisterForm from "../RegisterForm";

describe("register form", () => {
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

  it("should validate register form fields", async () => {
    render(<RegisterForm />);

    const firstNameField = screen.getByPlaceholderText(
      /enter your first name/i
    );
    userEvent.clear(firstNameField);
    userEvent.type(firstNameField, "a");

    const emailField = screen.getByPlaceholderText(/enter your email/i);
    userEvent.clear(emailField);
    userEvent.type(emailField, "a");

    const passwordField = screen.getByPlaceholderText(/enter your password/i);
    userEvent.clear(passwordField);
    userEvent.type(passwordField, "12");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(firstNameField).toHaveClass("form-control is-invalid");
      expect(emailField).toHaveClass("form-control is-invalid");
      expect(passwordField).toHaveClass("form-control is-invalid");
    });
  });
});
