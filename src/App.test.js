import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('renders learn react link', () => {
  it("should be in the doc", ()=>{
    const { getByText } = render(<App />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  })
});
