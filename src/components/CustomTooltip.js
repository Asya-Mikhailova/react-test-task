import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import './CategoryItem.scss';

export let CustomTooltip = ({ children, className, ...rest }) => {
  CustomTooltip = withStyles({
    tooltip: {
      width: '380px',
      fontSize: '14px',
      color: 'black',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      opacity: '0.7',
      border: '1px solid #eceeef',
      padding: '15px',
      margin: '-2px 0',
      textAlign: 'center',
    },
    arrow: {
      '&:before': {
        border: '1px solid #eceeef',
      },
      color: 'rgba(255, 255, 255, 0.8)',
    },
  })(Tooltip);

  return (
    <div {...rest} className={className ? className : ''}>
      {children}
    </div>
  );
};
