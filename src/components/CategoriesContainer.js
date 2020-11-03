import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { approveAll, fetchCategories, forbidAll } from '../redux';

import { CategoryItem } from './CategoryItem';
import { Button } from './Button';

import './CategoriesContainer.scss';

const FILTER_MAP = {
  All: () => true,
  Approved: (category) => category.isSelected,
  Forbidden: (category) => !category.isSelected,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export const CategoriesContainer = () => {
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);
  const categories = useSelector((state) => state.categories.categories);
  const [filter, setFilter] = useState('All');

  const filterList = FILTER_NAMES.map((name) => (
    <Button
      key={name}
      name={name}
      className='categories__button_border'
      aria-pressed={name === filter}
      onClick={() => setFilter(name)}
    />
  ));

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

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className='categories'>
      <div className='categories__scroll-wrapper'>
        <div className='categories__container'>
          {categories.filter(FILTER_MAP[filter]).map((category) => (
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
            name='Approved'
            aria-pressed={'Approved' === filter}
            onClick={() => setFilter('Approved')}
          />
          <Button
            className='categories__button_border'
            name='Forbidden'
            aria-pressed={'Forbidden' === filter}
            onClick={() => setFilter('Forbidden')}
          />
        </div>
      </div>
    </div>
  );
};
