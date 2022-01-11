import { render, screen } from "../../test-utils/testing-library-utils";
import ProfileDetails from "./ProfileDetails";

test("should render ProfileDetails component", () => {
  const user = {
    _id: "1",
    firstName: "Test user",
    email: "test@test.com",
    role: "pupil",
  };
  render(<ProfileDetails user={user} />);

  const headerText = screen.getByRole("heading", {
    name: /profile details for: Test user/i,
  });
  expect(headerText).toBeInTheDocument();
});
