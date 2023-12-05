import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import UpdateAccount from "../updateAccount";

jest.mock("react-redux", () => {
  return {
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn().mockImplementation(() => ({})),
    useDispatch: () => jest.fn(),
  };
});

describe("user Update Account Information", () => {
  // Renders the component with the correct title and instructions
  it("should render the component with the correct title and instructions", () => {
    // Assert that the title and instructions are rendered correctly
    expect(screen.getByText("Update Account Information")).toBeInTheDocument();
    expect(
      screen.getByText("Please provide your image and valid phone number.")
    ).toBeInTheDocument();
  });
});
