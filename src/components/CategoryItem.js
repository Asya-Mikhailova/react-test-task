import React from 'react';
import { useDispatch } from 'react-redux';
import { setIsSelected } from '../redux';

import './CategoryItem.scss';

export const CategoryItem = ({ category }) => {
  const dispatch = useDispatch();

  const selectCategory = (name) => {
    dispatch(setIsSelected(name));
  };

  return (
    <button
      key={category.name}
      className='category category__tooltip category__tooltip_top'
      onClick={() => selectCategory(category.name)}
      data-text={category.description}
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
  );
};
