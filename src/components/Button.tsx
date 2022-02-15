import * as React from 'react';
import {FC} from "react";

import './Button.scss';


interface ButtonProps {
  disabled?:boolean,
  className:string,
  name?:"string"
}

export const Button: FC<ButtonProps> = ({ disabled, className, children, name, ...rest }) => (
  <button
    disabled={disabled}
    {...rest}
    className={`btn ${className ? className : ''}`}
  >
    {children}
    <span>{name}</span>
  </button>
);
