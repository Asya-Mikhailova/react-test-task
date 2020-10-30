import React from 'react';
import { useDispatch } from 'react-redux';
import { setIsSelected } from '../redux';

import { CustomTooltip } from './CustomTooltip';

import './CategoryItem.scss';

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

        <p>{category.name}</p>
        <i className='fa fa-info'></i>
      </button>
    </CustomTooltip>
  );
};
