import { render, screen } from "../../test-utils/testing-library-utils";
import Profile from "./Profile";

test("should render Profile component", () => {
  render(<Profile />);

  const loading = screen.getByText(/loading.../i);
  expect(loading).toBeInTheDocument();
});
