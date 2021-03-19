import { render, screen } from "../../test-utils/testing-library-utils";
import App from "../../App";
import { LocalStorageMock } from "@react-mock/localstorage";

describe("Protected route - Profile", () => {
  it("should render Profile component", () => {
    render(
      <LocalStorageMock items={{ accessToken: "test", refreshToken: "test" }}>
        <App />
      </LocalStorageMock>,
      { route: "/profile" }
    );

    const loadingText = screen.getByText(/loading/i);
    expect(loadingText).toBeInTheDocument();
  });

  it("should render user info loaded form the server", async () => {
    render(
      <LocalStorageMock items={{ accessToken: "test", refreshToken: "test" }}>
        <App />
      </LocalStorageMock>,
      { route: "/profile" }
    );

    const headerText = await screen.findByRole("heading", {
      name: /profile details for: Test/i,
    });
    expect(headerText).toBeInTheDocument();
  });
});
