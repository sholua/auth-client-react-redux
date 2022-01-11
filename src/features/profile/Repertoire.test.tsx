import { render, screen } from "../../test-utils/testing-library-utils";
import Repertoire from "./Repertoire";

test("should render Repertoire component", () => {
  const user = {
    _id: "1",
    firstName: "Test user",
    email: "test@test.com",
    role: "pupil",
  };
  render(<Repertoire user={user} />);

  const headerText = screen.getByRole("heading", {
    name: /Test user's repertoire/i,
  });
  expect(headerText).toBeInTheDocument();
});
