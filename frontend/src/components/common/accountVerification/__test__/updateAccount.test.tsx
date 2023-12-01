import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import UpdateAccount from '../updateAccount';

const formInputValues = [
  {
    label: 'Email',
    correctTestValue: 'john@gmail.com',
  },
  {
    label: 'Password',
    correctTestValue: 'ASrty6655#$%f',
  },
];

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn().mockImplementation(() => ({})),
    useDispatch: () => jest.fn(),
  };
});

describe('user Update Account form', () => {
  it('renders a heading', () => {
    // @ts-ignore
    render(<UpdateAccount />);

    const heading = screen.getByRole('heading', {
      name: /Update Account Information/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders a paragraph', () => {
    // @ts-ignore
    render(<UpdateAccount />);

    const paragraph = screen.getByText(
      'Please provide your image and valid phone number. Note: You can only upload one image (PNG/JPEG), and image size should not exceed 1MB'
    );

    expect(paragraph).toBeInTheDocument();
  });

  it('renders a paragraph', () => {
    // @ts-ignore
    render(<UpdateAccount />);

    const paragraph = screen.getByText(
      'Image (Must show your face and your ears clearly)'
    );

    expect(paragraph).toBeInTheDocument();
  });

  it('renders a paragraph', () => {
    // @ts-ignore
    render(<UpdateAccount />);

    const paragraph = screen.getByText(
      'Upload your image. Click to add or drag n drop image'
    );

    expect(paragraph).toBeInTheDocument();
  });

  it('Should render all form inputs', () => {
    // @ts-ignore
    render(<UpdateAccount />);
    formInputValues.forEach((value) => {
      expect(screen.getByLabelText(value.label)).toBeInTheDocument();
    });
  });

  it('Should render submit button', async () => {
    // @ts-ignore
    render(<UpdateAccount />);

    //check for submit button
    const button = screen.getByRole('button', { name: 'UpdateAccount' });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('Should submit when inputs are filled and submit button clicked', async () => {
    // @ts-ignore
    render(<UpdateAccount />);

    //check for submit button
    const submitButton = screen.getByRole('button', { name: 'UpdateAccount' });

    formInputValues.forEach((mockValue) => {
      const input = screen.getByLabelText(mockValue.label);
      fireEvent.change(input, {
        target: { value: mockValue.correctTestValue },
      });
    });

    fireEvent.click(submitButton);

    expect(
      await screen.findByRole('button', { name: 'Loading' })
    ).toBeInTheDocument();
  });
});