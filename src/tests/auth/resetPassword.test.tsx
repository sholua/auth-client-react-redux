import {
  render,
  screen,
  waitFor,
} from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

import App from "../../App";

describe("Reset password", () => {
  it("should reset password", async () => {
    const history = createMemoryHistory();
    history.push("/reset_password/userid/token");
    render(<App />, { route: "/reset_password/userid/token" });

    const newPasswordField = screen.getByPlaceholderText(/new password/i);
    userEvent.clear(newPasswordField);
    userEvent.type(newPasswordField, "123456qW!");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      const loginText = screen.getByRole("heading", { name: /login/i });
      expect(loginText).toBeInTheDocument();
    });
  });
});
