import React from 'react';
import './Button.scss';

export const Button = ({ className, children, ...rest }) => (
  <button {...rest} className={`btn ${className ? className : ''}`}>
    {children}
  </button>
);
