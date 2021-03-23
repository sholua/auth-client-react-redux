import {
  prettyDOM,
  render,
  screen,
  waitFor,
} from "../../test-utils/testing-library-utils";
import App from "../../App";
import { LocalStorageMock } from "@react-mock/localstorage";
import userEvent from "@testing-library/user-event";

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

  it("should upload avatar", async () => {
    render(
      <LocalStorageMock items={{ accessToken: "test", refreshToken: "test" }}>
        <App />
      </LocalStorageMock>,
      { route: "/profile" }
    );

    const file = new File(["photo"], "photo.jpg", { type: "image/jgp" });
    const input = screen.getByLabelText(/upload photo/i);
    userEvent.upload(input, file);

    expect(input.files[0]).toStrictEqual(file);
    expect(input.files).toHaveLength(1);

    const submitButton = screen.getByRole("button", { name: "Submit" });
    userEvent.click(submitButton);

    const successText = await screen.findByText(/avatar was uploaded/i);
    expect(successText).toBeInTheDocument();

    const avatar = screen.getByAltText(/test/i);
    expect(avatar.src).toContain("avatar-test");
  });
});
