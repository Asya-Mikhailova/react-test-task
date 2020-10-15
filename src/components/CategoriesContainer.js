import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../redux';
import './CategoriesContainer.css';

export const CategoriesContainer = () => {
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);
  const categories = useSelector((state) => state.categories.categories);
  console.log(categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <h2>Loading...</h2>
  ) : error ? (
    <h2>{error}</h2>
  ) : (
    <div className='wrapper'>
      <div className='categoriesContainer'>
        {categories.map((category, index) => (
          <div className='category'>
            <button className='status-btn'>
              <i className='fa fa-smile-o'></i>
            </button>
            <p key={index}>{category.name}</p>
            <i className='fa fa-info tooltip'>
              <span className='tooltiptext'>{category.description}</span>
            </i>
          </div>
        ))}
      </div>
      <div className='footer'>
        <div className='buttonContainer'>
          <button className='btn'>
            <i className='fa fa-simplybuilt'></i>Forbid All
          </button>
          <button className='btn'>
            <i className='fa fa-smile-o'></i>Approve All
          </button>
        </div>
        <div className='filterContainer'>
          <p>Filters</p>
          <button className='btn btn-border'> Approved 17</button>
          <button className='btn btn-border'> Forbidden 7</button>
        </div>
      </div>
    </div>
  );
};
