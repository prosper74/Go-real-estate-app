import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Complete from '../complete';

describe('Home', () => {
  it('renders a heading', () => {
    // @ts-ignore
    render(<Complete />);

    const heading = screen.getByRole('heading', {
      name: /Documents Sent Successfully!!!/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders a paragraph', () => {
    // @ts-ignore
    render(<Complete />);

    const paragraph = screen.getByText(
      'Your documents are under review. Your account will be verified if all documents pass our verifications, else we will contact you via email'
    );

    expect(paragraph).toBeInTheDocument();
  });

  it('Should render close button', async () => {
    // @ts-ignore
    render(<Complete />);

    //check for submit button
    const button = screen.getByRole('button', { name: 'Got it' });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });
});
