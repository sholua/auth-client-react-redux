import { render, screen } from "@testing-library/react";
import About from "./About";

test("should render About component", () => {
  render(<About />);

  const aboutText = screen.getByText(/about component/i);
  expect(aboutText).toBeInTheDocument();
});
