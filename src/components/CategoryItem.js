import React from 'react';
import { useDispatch } from 'react-redux';
import { setIsSelected } from '../redux';

export const CategoryItem = ({ category, index }) => {
  const dispatch = useDispatch();

  const selectCategory = (name) => {
    dispatch(setIsSelected(name));
  };

  return (
    <div className='category' onClick={() => selectCategory(category.name)}>
      <button className='status-btn'>
        {category.isSelected ? (
          <i className='fa fa-smile-o'></i>
        ) : (
          <i className='fa fa-simplybuilt'></i>
        )}
      </button>

      <p key={index}>{category.name}</p>
      <i className='fa fa-info tooltip'>
        <span className='tooltiptext'>{category.description}</span>
      </i>
    </div>
  );
};
