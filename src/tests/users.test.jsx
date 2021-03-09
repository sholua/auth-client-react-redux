import App from "../App";
import {
  render,
  screen,
  waitFor,
  within,
} from "../test-utils/testing-library-utils";
import { LocalStorageMock } from "@react-mock/localstorage";

describe("Protected route - users", () => {
  it("should redirect to login page", async () => {
    render(<App />, { route: "/users" });

    const loginText = await screen.findByRole("heading", { name: /login/i });
    expect(loginText).toBeInTheDocument();
  });
  it("should display list of users to loged in user", async () => {
    render(
      <LocalStorageMock items={{ accessToken: "test", refreshToken: "test" }}>
        <App />
      </LocalStorageMock>,
      { route: "/users" }
    );

    await waitFor(() => {
      const usersList = screen.getByTestId("users");
      const usersItems = within(usersList).getAllByRole("listitem");
      expect(usersItems).toHaveLength(2);
      expect(usersItems[0]).toHaveTextContent("Test1");
      expect(usersItems[1]).toHaveTextContent("Test2");
    });
  });
});
