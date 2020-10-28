import React from 'react';

export const Button = ({ className, children, ...rest }) => (
  <button {...rest} className={`btn ${className ? className : ''}`}>
    {children}
  </button>
);
