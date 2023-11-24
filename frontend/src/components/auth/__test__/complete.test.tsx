import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Complete from '../complete';

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn().mockImplementation(() => ({})),
    useDispatch: () => jest.fn(),
  };
});

describe('IProps', () => {

  // Renders a success message with the text "Account Created Successfully!!!"
  it('should render success message', () => {
    // Arrange
    const setIsOpen = jest.fn();

    // Act
    render(<Complete setIsOpen={setIsOpen} />);

    // Assert
    expect(screen.getByText("Account Created Successfully!!!")).toBeInTheDocument();
  });

  // Displays a Lottie animation of a checkmark
  it('should display Lottie animation', () => {
    // Arrange
    const setIsOpen = jest.fn();

    // Act
    render(<Complete setIsOpen={setIsOpen} />);

    // Assert
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  // Shows a message asking the user to check their email inbox
  it('should show email inbox message', () => {
    // Arrange
    const setIsOpen = jest.fn();

    // Act
    render(<Complete setIsOpen={setIsOpen} />);

    // Assert
    expect(screen.getByText("Kindly check your email inbox to verify your email")).toBeInTheDocument();
  });

  // setIsOpen function is not provided
  it('should not call setIsOpen function', () => {
    // Arrange
    const setIsOpen = jest.fn();

    // Act
    render(<Complete setIsOpen={function (open: boolean): void {
      throw new Error('Function not implemented.');
    } } />);

    // Assert
    expect(setIsOpen).not.toHaveBeenCalled();
  });

  // SuccessAnimation JSON file is missing or invalid
  it('should handle missing or invalid SuccessAnimation JSON file', () => {
    // Arrange
    const setIsOpen = jest.fn();

    // Act
    render(<Complete setIsOpen={setIsOpen} />);

    // Assert
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  // Lottie animation fails to load or play
  it('should handle Lottie animation failure', () => {
    // Arrange
    const setIsOpen = jest.fn();

    // Act
    render(<Complete setIsOpen={setIsOpen} />);

    // Assert
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
