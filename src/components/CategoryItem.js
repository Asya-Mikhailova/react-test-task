import React from 'react';
import { useDispatch } from 'react-redux';
import { setIsSelected } from '../redux';

import './CategoryItem.scss';

export const CategoryItem = ({ category, key }) => {
  const dispatch = useDispatch();

  const selectCategory = (name) => {
    dispatch(setIsSelected(name));
  };

  return (
    <button className='category' onClick={() => selectCategory(category.name)}>
      <div className='category__status-icon'>
        {category.isSelected ? (
          <i className='fa fa-smile-o category__status-icon_success' />
        ) : (
          <i className='fa fa-simplybuilt category__status-icon_danger ' />
        )}
      </div>

      <p key={key}>{category.name}</p>
      <i className='fa fa-info category__tooltip'>
        <span className='category__tooltip_tooltiptext'>
          {category.description}
        </span>
      </i>
    </button>
  );
};
