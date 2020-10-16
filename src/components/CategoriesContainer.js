import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, setIsSelected } from '../redux';
import './CategoriesContainer.css';

export const CategoriesContainer = () => {
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);
  const categories = useSelector((state) => state.categories.categories);
  let isForbidden = false;
  let isApproved = false;
  // let total = 22;
  // const [approvedCount, setApprovedCount] = useState(0);
  // let forbiddenCount = total - approvedCount;

  const dynamicSort = (property) => {
    let sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      if (sortOrder == -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    };
  };

  categories.sort(dynamicSort('name'));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectCategory = (name) => {
    dispatch(setIsSelected(name));
    // setApprovedCount(approvedCount + 1);
  };

  return loading ? (
    <h2>Loading...</h2>
  ) : error ? (
    <h2>{error}</h2>
  ) : (
    <div className='wrapper'>
      <div className='categoriesContainer'>
        {categories.map((category, index) => (
          <div
            className='category'
            onClick={() => selectCategory(category.name)}
          >
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
        ))}
      </div>

      <div className='footer'>
        <div className='buttonContainer'>
          <button onClick={() => (isForbidden = !isForbidden)} className='btn'>
            <i className='fa fa-simplybuilt'></i>Forbid All
          </button>
          <button onClick={() => (isApproved = !isApproved)} className='btn'>
            <i className='fa fa-smile-o'></i>Approve All
          </button>
        </div>
        <div className='filterContainer'>
          <p>Filters</p>
          <button className='btn btn-border'> Approved </button>
          <button className='btn btn-border'> Forbidden</button>
        </div>
      </div>
    </div>
  );
};
