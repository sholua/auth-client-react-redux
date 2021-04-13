import { render, screen } from "../../test-utils/testing-library-utils";
import Program from "./Program";

test("should render Program component", () => {
  const user = {
    _id: "1",
    firstName: "Test user",
    email: "test@test.com",
    role: "pupil",
  };
  render(<Program user={user} />);

  const programHeader = screen.getByRole("heading", {
    name: /Test user's propgram for current semester/i,
  });
  expect(programHeader).toBeInTheDocument();
});
