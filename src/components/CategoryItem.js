import React from 'react';
import { useDispatch } from 'react-redux';
import {changeCategoryStatus, changeProfileCategoryStatus} from '../redux';


import './CategoryItem.scss';
import {useParams} from "react-router-dom";

export const CategoryItem = ({ category}) => {
  const dispatch = useDispatch();
  const {id} = useParams();

  const selectCategory = () => {
    dispatch(changeCategoryStatus(category.name));
    dispatch(changeProfileCategoryStatus(category.name, id));
  };



  return (
    <button
      key={category.name}
      className='category category__tooltip category__tooltip_top'
      onClick={selectCategory}
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
