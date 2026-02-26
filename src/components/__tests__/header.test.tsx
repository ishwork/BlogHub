import { render } from '@testing-library/react';

import Header from '@/src/components/Header';

describe('Header', () => {
  it('renders the logo and theme toggle button', () => {
    const { getByTestId } = render(<Header />);
    const logo = getByTestId('bloghub-logo');
    const themeToggleButton = getByTestId('theme-toggle-button');
    expect(logo).toBeInTheDocument();
    expect(themeToggleButton).toBeInTheDocument();
  });

  it('logo link to home page', () => {
    const { getByTestId } = render(<Header />);
    const logo = getByTestId('bloghub-logo');
    const logoLink = logo.closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });
});
