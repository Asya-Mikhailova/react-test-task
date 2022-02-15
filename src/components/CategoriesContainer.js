import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';

import { approveAllPC, fetchCategories, forbidAllPC} from '../redux';
import { CategoryItem } from './CategoryItem';
import { Button } from './Button';
import {
  loadingSelector,
  errorSelector,
} from '../redux/categories/selectors';
import {
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
  const dispatch = useDispatch();
  const {id} = useParams();
  const isLoading = useSelector(loadingSelector);
  const isError = useSelector(errorSelector);
  const approvedProfileCategories=useSelector(state =>approvedProfileCategoriesSelector(state, id));
  const forbiddenProfileCategories = useSelector(state=> forbiddenProfileCategoriesSelector(state, id))

  const categories = [..._.map(approvedProfileCategories,category=>({ ...category,  isSelected : true})),..._.map(forbiddenProfileCategories,category=>({...category,isSelected:false}))]

  const [filter, setFilter] = useState('All');
  const [forbiddenBtn, setForbiddenBtnState] = useState(false);
  const [approvedBtn, setApprovedBtnState] = useState(false);

  categories.sort(dynamicSort('name'));

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchFiltersOff = () => {
    setFilter('All');
    setForbiddenBtnState(false);
    setApprovedBtnState(false);
  };

  const forbidAllSelected = (id) => {
    dispatch(forbidAllPC(id))
  };
  const approveAllSelected = (id,categories) => {
    dispatch(approveAllPC(id, categories))
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

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{isError}</h2>;

  return (
    <div className='categories'>
      <div className='categories__scroll-wrapper'>
        <div className='categories__container'>
          {_.filter(categories, filterMap[filter]).map((category) => (
            <CategoryItem key={category.name} category={category}/>
          ))}
        </div>
      </div>
      <div className='categories__footer'>
        <div className='categories__button-container'>
          <Button
            disabled={!approvedProfileCategories.length}
            onClick={() => forbidAllSelected(id)}
            className='categories__button'
          >
            <i className='fa fa-simplybuilt categories__button-container__icon_danger' />
            Forbid All
          </Button>
          <Button
            disabled={!forbiddenProfileCategories.length}
            onClick={() => approveAllSelected(id, categories)}
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
