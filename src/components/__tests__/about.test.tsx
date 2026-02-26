import { render } from '@testing-library/react';

import { aboutData } from '@/src/data/about';

import About from '@/src/components/About';

describe('About component', () => {
  it('renders the header and description', () => {
    const { getByTestId, getByText } = render(<About />);
    expect(getByTestId('about-header')).toBeInTheDocument();
    expect(getByText('About BlogHub')).toBeInTheDocument();
    expect(
      getByText('Learn more about our mission, vision, and the values that drive us.'),
    ).toBeInTheDocument();
  });

  it('renders all aboutData sections', () => {
    const { getByTestId, getByText } = render(<About />);
    aboutData.forEach((section) => {
      expect(getByTestId(`about-section-${section.id}`)).toBeInTheDocument();
      expect(getByText(section.title)).toBeInTheDocument();
      expect(getByText(section.description)).toBeInTheDocument();
    });
  });
});
