import App from "../App";
import {
  prettyDOM,
  render,
  screen,
  waitFor,
} from "../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

describe("Protected route - users", () => {
  it("should redirect to login page", async () => {
    render(<App />, { route: "/users" });

    const loginText = await screen.findByRole("heading", { name: /login/i });
    expect(loginText).toBeInTheDocument();
  });

  it("should display list of users to logedin user", async () => {
    render(<App />, { route: "/users" });

    // login user
    const emailField = screen.getByPlaceholderText(/enter your email/i);
    const passwordField = screen.getByPlaceholderText(/enter your password/i);
    const SubmitButton = screen.getByRole("button", { name: /submit/i });

    userEvent.clear(emailField);
    userEvent.type(emailField, "test@test.com");

    userEvent.clear(passwordField);
    userEvent.type(passwordField, "123456qW!");

    userEvent.click(SubmitButton);

    const homeText = await screen.findByText(/home component/i);
    expect(homeText).toBeInTheDocument();

    // const usersLink = screen.getByRole("link", { name: /users/i });
    // const usersLink = screen.getByRole("link", { name: /logout/i });
    // userEvent.click(usersLink);
    // console.log(prettyDOM());

    // await waitFor(() => {
    //   const usersList = screen.getByRole("list", { name: /users/i });
    //   expect(usersList).toBeInTheDocument();
    // });
  });
});
