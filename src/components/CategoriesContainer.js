import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  approveAll,
  fetchCategories,
  forbidAll,
  filterCategories,
} from '../redux';

import _ from 'lodash';

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

  const filterSelected = (categories) => {
    dispatch(filterCategories(categories));
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className='categories'>
      <div className='categories__scroll-wrapper'>
        <div className='categories__container'>
          {_.map(categories, (category) => (
            <CategoryItem key={category.name} category={category} />
          ))}
        </div>
      </div>

      <div className='categories__footer'>
        <div className='categories__button-container'>
          <Button
            onClick={() => forbidAllSelected(_.map(categories, 'name'))}
            className='categories__button'
          >
            <i className='fa fa-simplybuilt categories__button-container__icon_danger' />
            Forbid All
          </Button>
          <Button
            onClick={() => approveAllSelected(_.map(categories, 'name'))}
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
            onClick={() => filterSelected(approvedCategories)}
          />
          <Button
            className='categories__button_border'
            name={`Forbidden ${forbiddenCategories.length}`}
            onClick={() => filterSelected(forbiddenCategories)}
          />
        </div>
      </div>
    </div>
  );
};
