import React from 'react';
import './Button.scss';

export const Button = ({ className, children, name, ...rest }) => (
  <button {...rest} className={`btn ${className ? className : ''}`}>
    {children}
    <span>{name}</span>
  </button>
);
