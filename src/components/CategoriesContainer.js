import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { approveAll, fetchCategories, forbidAll } from '../redux';

import { CategoryItem } from './CategoryItem';
import { Button } from './Button';
import {
  loadingSelector,
  errorSelector,
  categoriesSelector,
  forbidFilterSelector,
  approveFilterSelector,
} from '../redux/selectors/selectors';

import './CategoriesContainer.scss';

export const CategoriesContainer = () => {
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const categories = useSelector(categoriesSelector);
  const forbiddenCategories = useSelector(forbidFilterSelector);
  const approvedCategories = useSelector(approveFilterSelector);

  const [filter, setFilter] = useState('All');
  let isForbidden = false;
  let isApproved = false;

  const dynamicSort = (property) => {
    let sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      if (sortOrder === -1) {
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

  const forbidAllSelected = (name) => {
    dispatch(forbidAll(name));
  };

  const approveAllSelected = (name) => {
    dispatch(approveAll(name));
  };

  const toggleForbidden = () => {
    isApproved = false;
    isForbidden = !isForbidden;
  };

  const toggleApproved = () => {
    isForbidden = false;
    isApproved = !isApproved;
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className='categories'>
      <div className='categories__scroll-wrapper'>
        <div className='categories__container'>
          {isForbidden
            ? forbiddenCategories.map((category) => (
                <CategoryItem key={category.name} category={category} />
              ))
            : isApproved
            ? approvedCategories.map((category) => (
                <CategoryItem key={category.name} category={category} />
              ))
            : categories.map((category) => (
                <CategoryItem key={category.name} category={category} />
              ))}
        </div>
      </div>

      <div className='categories__footer'>
        <div className='categories__button-container'>
          <Button
            onClick={() =>
              forbidAllSelected(categories.map((category) => category.name))
            }
            className='categories__button'
          >
            <i className='fa fa-simplybuilt categories__button-container__icon_danger' />
            Forbid All
          </Button>
          <Button
            onClick={() =>
              approveAllSelected(categories.map((category) => category.name))
            }
            className='categories__button'
          >
            <i className='fa fa-smile-o categories__button-container__icon_success' />
            Approve All
          </Button>
        </div>
        <div className='categories__filter-container'>
          <p>Filters</p>
          <Button
            className='categories__button_border'
            name={`Approved ${approvedCategories.length}`}
            onClick={() => toggleApproved()}
          />
          <Button
            className='categories__button_border'
            name={`Forbidden ${forbiddenCategories.length}`}
            onClick={() => toggleForbidden()}
          />
        </div>
      </div>
    </div>
  );
};
