import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { approveAll, fetchCategories, forbidAll } from '../redux';
import {useParams} from 'react-router-dom';

import _ from 'lodash';

import { CategoryItem } from './CategoryItem';
import { Button } from './Button';
import {
  loadingSelector,
  errorSelector,
  categoriesSelector,
  forbidFilterSelector,
  approveFilterSelector,
} from '../redux/categories/selectors';

import {
  profilesSelector,
  activeProfileSelector,
  approvedProfileCategoriesSelector,
  forbiddenProfileCategoriesSelector
} from "../redux/profiles/profilesSelectors";

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
  const {id} = useParams();

  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  let categories = useSelector(categoriesSelector);
  const forbiddenCategories = useSelector(forbidFilterSelector);
  const approvedCategories = useSelector(approveFilterSelector);


  const profiles = useSelector(profilesSelector);
  const activeProfile = useSelector(state=>activeProfileSelector(state, id));
  const approvedProfileCategories=useSelector(state =>approvedProfileCategoriesSelector(state, id));
  const forbiddenProfileCategories = useSelector(state=> forbiddenProfileCategoriesSelector(state, id))

  approvedProfileCategories.map(category=> category.isSelected = true);
  categories = [...approvedProfileCategories,...forbiddenProfileCategories]


  const [filter, setFilter] = useState('All');
  const [forbiddenBtn, setForbiddenBtnState] = useState(false);
  const [approvedBtn, setApprovedBtnState] = useState(false);


  categories.sort(dynamicSort('name'));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchFiltersOff = () => {
    setFilter('All');
    setForbiddenBtnState(false);
    setApprovedBtnState(false);
  };

  const forbidAllSelected = () => {
    dispatch(forbidAll());
  };

  const approveAllSelected = () => {
    dispatch(approveAll());
  };

  const filterApproved = (filterState) => {
    if (!approvedBtn) {
      setApprovedBtnState(true);
      setFilter(filterState);
      setForbiddenBtnState(false);
    } else {
      switchFiltersOff();
    }
  };

  const filterForbidden = (filterState) => {
    if (!forbiddenBtn) {
      setForbiddenBtnState(true);
      setFilter(filterState);
      setApprovedBtnState(false);
    } else {
      switchFiltersOff();
    }
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
            disabled={!approvedCategories.length}
            onClick={() => forbidAllSelected()}
            className='categories__button'
          >
            <i className='fa fa-simplybuilt categories__button-container__icon_danger' />
            Forbid All
          </Button>
          <Button
            disabled={!forbiddenCategories.length}
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
              filter === 'Approved' ? '_active' : ''
            }`}
            name={`Approved ${approvedProfileCategories.length}`}
            onClick={() => filterApproved('Approved')}
          />
          <Button
            className={`categories__button_border categories__button_border${
              forbiddenBtn ? '_active' : ''
            }`}
            name={`Forbidden ${forbiddenProfileCategories.length}`}
            onClick={() => filterForbidden('Forbidden')}
          />
        </div>
      </div>
    </div>
  );
};
