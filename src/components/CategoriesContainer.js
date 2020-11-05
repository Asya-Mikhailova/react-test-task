import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { approveAll, fetchCategories, forbidAll } from '../redux';

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

const filterMap = {
  All: () => true,
  Approved: (category) => category.isSelected,
  Forbidden: (category) => !category.isSelected,
};

export const CategoriesContainer = () => {
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const categories = useSelector(categoriesSelector);
  const forbiddenCategories = useSelector(forbidFilterSelector);
  const approvedCategories = useSelector(approveFilterSelector);

  const [filter, setFilter] = useState('All');
  const [approvedBtn, setApprovedBtnState] = useState(false);
  const [forbiddenBtn, setForbiddenBtnState] = useState(false);

  categories.sort(dynamicSort('name'));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchFiltersOff = () => {
    if (filter !== 'All') {
      setFilter('All');
    }
    if (approvedBtn !== false) {
      setApprovedBtnState(false);
    }
    if (forbiddenBtn !== false) {
      setForbiddenBtnState(false);
    }
  };

  const forbidAllSelected = () => {
    dispatch(forbidAll());
    switchFiltersOff();
  };

  const approveAllSelected = () => {
    dispatch(approveAll());
    switchFiltersOff();
  };

  const filterApproved = (filterState, btnState) => {
    setFilter(filterState);
    setForbiddenBtnState(false);
    setApprovedBtnState(btnState);
  };

  const filterForbidden = (filterState, btnState) => {
    setFilter(filterState);
    setApprovedBtnState(false);
    setForbiddenBtnState(btnState);
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className='categories'>
      <div className='categories__scroll-wrapper'>
        <div className='categories__container'>
          {_.filter(categories, filterMap[filter]).map((category) => (
            <CategoryItem key={category.name} category={category} />
          ))}
        </div>
      </div>

      <div className='categories__footer'>
        <div className='categories__button-container'>
          <Button
            disabled={forbiddenCategories.length === 22 ? true : false}
            onClick={() => forbidAllSelected()}
            className='categories__button'
          >
            <i className='fa fa-simplybuilt categories__button-container__icon_danger' />
            Forbid All
          </Button>
          <Button
            disabled={approvedCategories.length === 22 ? true : false}
            onClick={() => approveAllSelected()}
            className='categories__button'
          >
            <i className='fa fa-smile-o categories__button-container__icon_success' />
            Approve All
          </Button>
        </div>
        <div className='categories__filter-container'>
          <p>Filters</p>
          <Button
            className={`categories__button_border categories__button_border${
              approvedBtn ? '_active' : ''
            }`}
            name={`Approved ${approvedCategories.length}`}
            onClick={() => filterApproved('Approved', true)}
          />
          <Button
            className={`categories__button_border categories__button_border${
              forbiddenBtn ? '_active' : ''
            }`}
            name={`Forbidden ${forbiddenCategories.length}`}
            onClick={() => filterForbidden('Forbidden', true)}
          />
        </div>
      </div>
    </div>
  );
};
