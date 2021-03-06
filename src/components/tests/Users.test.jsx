import { render, screen } from "../../test-utils/testing-library-utils";
import Users from "../Users";

describe("Users list component", () => {
  it("should render users list", async () => {
    render(<Users />);

    const listItems = await screen.findAllByRole("listitem");
    expect(listItems).toHaveLength(2);

    const userNames = listItems.map((item) => item.textContent);
    expect(userNames).toEqual([
      "Test1 - test1@test.com",
      "Test2 - test2@test.com",
    ]);
  });
});
