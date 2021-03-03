import {
  render,
  screen,
  waitFor,
} from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import ForgotPassword from "../ForgotPassword";

describe("Forgot password form", () => {
  it("should render forgot password form", () => {
    render(<ForgotPassword />);

    const forgotText = screen.getByText(/if you forgot/i);
    expect(forgotText).toBeInTheDocument();

    const emailField = screen.getByPlaceholderText(/enter your email/i);
    expect(emailField).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toBeInTheDocument();
  });

  it("should send email to reset password", async () => {
    render(<ForgotPassword />);

    const emailField = screen.getByPlaceholderText(/enter your email/i);
    userEvent.clear(emailField);
    userEvent.type(emailField, "test@test.com");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    submitButton.click();

    const checkText = await screen.findByText(/check your email/i);
    expect(checkText).toBeInTheDocument();
  });

  it("should validate email field", async () => {
    render(<ForgotPassword />);

    const emailField = screen.getByPlaceholderText(/enter your email/i);
    userEvent.clear(emailField);
    userEvent.type(emailField, "test");

    const button = screen.getByRole("button", { name: /submit/i });
    userEvent.click(button);

    await waitFor(() => {
      expect(emailField).toHaveClass("form-control is-invalid");
    });
  });
});
