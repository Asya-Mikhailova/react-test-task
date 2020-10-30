import React from 'react';
import { useDispatch } from 'react-redux';
import { setIsSelected } from '../redux';

import './CategoryItem.scss';

import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

//import { CustomTooltip } from './CustomTooltip';

const CustomTooltip = withStyles({
  tooltip: {
    width: '380px',
    fontSize: '14px',
    color: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid #eceeef',
    padding: '15px',
    margin: '5px 0',
    textAlign: 'center',
  },
  arrow: {
    '&:before': {
      border: '1px solid #eceeef',
      width: '15px',
    },
    color: 'rgba(255, 255, 255, 0.8)',
  },
})(Tooltip);

export const CategoryItem = ({ category }) => {
  const dispatch = useDispatch();

  const selectCategory = (name) => {
    dispatch(setIsSelected(name));
  };

  return (
    <CustomTooltip
      className='tooltip'
      title={category.description}
      arrow={true}
      placement='top'
    >
      <button
        key={category.name}
        className='category'
        onClick={() => selectCategory(category.name)}
      >
        <div className='category__status-icon'>
          {category.isSelected ? (
            <i className='fa fa-smile-o category__status-icon_success' />
          ) : (
            <i className='fa fa-simplybuilt category__status-icon_danger ' />
          )}
        </div>

        <p>
          {category.name}
          <span>
            <i className='fa fa-info' />
          </span>
        </p>
      </button>
    </CustomTooltip>
  );
};
