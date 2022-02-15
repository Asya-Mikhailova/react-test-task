import React from 'react';

import './Button.scss';

export const Button = ({ disabled, className, children, name, ...rest }) => (
  <button
    disabled={disabled}
    {...rest}
    className={`btn ${className ? className : ''}`}
  >
    {children}
    <span>{name}</span>
  </button>
);
