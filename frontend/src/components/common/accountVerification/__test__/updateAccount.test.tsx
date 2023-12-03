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

  // Allows the user to upload an image and displays it
  it("should allow the user to upload an image and display it", () => {
    // Mock dependencies
    const setIsOpen = jest.fn();
    const steps: never[] = [];
    const setSelectedStep = jest.fn();

    // Render the component
    render(
      <UpdateAccount
        setIsOpen={setIsOpen}
        steps={steps}
        setSelectedStep={setSelectedStep}
        setIsVerification={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    // Simulate image upload
    const file = new File(["image"], "test.png", { type: "image/png" });
    const input = screen.getByLabelText("Upload your image");
    fireEvent.change(input, { target: { files: [file] } });

    // Assert that the uploaded image is displayed
    expect(screen.getByAltText("Uploaded Image")).toBeInTheDocument();
  });

  // Allows the user to input a phone number
  it("should allow the user to input a phone number", () => {
    // Mock dependencies
    const setIsOpen = jest.fn();
    const steps: never[] = [];
    const setSelectedStep = jest.fn();

    // Render the component
    render(
      <UpdateAccount
        setIsOpen={setIsOpen}
        steps={steps}
        setSelectedStep={setSelectedStep}
        setIsVerification={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    // Simulate phone number input
    const input = screen.getByPlaceholderText("Enter your valid phone number");
    fireEvent.change(input, { target: { value: "1234567890" } });

    // Assert that the phone number is correctly inputted
    expect(input.value).toBe("1234567890");
  });

  // User does not upload an image
  it("should display an error message when the user does not upload an image", () => {
    // Mock dependencies
    const setIsOpen = jest.fn();
    const steps: never[] = [];
    const setSelectedStep = jest.fn();

    // Render the component
    render(
      <UpdateAccount
        setIsOpen={setIsOpen}
        steps={steps}
        setSelectedStep={setSelectedStep} setIsVerification={function (): void {
          throw new Error("Function not implemented.");
        } }      />
    );

    // Submit the form without uploading an image
    const submitButton = screen.getByText("Submit & Continue");
    fireEvent.click(submitButton);

    // Assert that the error message is displayed
    expect(screen.getByText("Please upload an image")).toBeInTheDocument();
  });
});
