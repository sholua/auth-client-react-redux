import {
  render,
  screen,
  waitFor,
} from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import ResetPassword from "./ResetPassword";

describe("Reset passsword component", () => {
  it("shoud render reset password form and validate email field", async () => {
    render(<ResetPassword />);

    const newPasswordField = screen.getByPlaceholderText(/new password/i);
    expect(newPasswordField).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeInTheDocument();

    userEvent.clear(newPasswordField);
    userEvent.type(newPasswordField, "test");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(newPasswordField).toHaveClass("form-control is-invalid");
    });
  });
});
