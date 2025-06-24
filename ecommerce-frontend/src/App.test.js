import { render, screen } from '@testing-library/react';
import App from './App';

test('renders application header', () => {
  render(<App />);
  const header = screen.getByText(/Meu Ecommerce/i);
  expect(header).toBeInTheDocument();
});
