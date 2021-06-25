import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ML title correctly', () => {
  render(<App />);
  const linkElement = screen.getByText(/machine learning modeling/i);
  expect(linkElement).toBeInTheDocument();
});

test('there is a upload button', () => {
  render(<App />);
  const buttonElement = screen.getByRole("button")
  expect(buttonElement).toBeInTheDocument();
});