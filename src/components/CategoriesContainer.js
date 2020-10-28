import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../redux';

import { CategoryItem } from './CategoryItem';
import { Button } from './Button';
import { FilterButton } from './FilterButton';
import './CategoriesContainer.scss';

export const CategoriesContainer = () => {
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);
  const categories = useSelector((state) => state.categories.categories);

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

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className='wrapper'>
      <div className='verticalScroll'>
        <div className='categoriesContainer'>
          {categories.map((category, index) => (
            <CategoryItem key={category.name} category={category} />
          ))}
        </div>
      </div>

      <div className='footer'>
        <div className='buttonContainer'>
          <Button>
            <i className='fa fa-simplybuilt' /> Forbid All
          </Button>
          <Button>
            <i className='fa fa-smile-o' /> Approve All
          </Button>
        </div>
        <div className='filterContainer'>
          <p>Filters</p>
          <Button className='btn-border' filter={true}>
            Approved
          </Button>
          <Button className='btn-border' filter={false}>
            Forbidden
          </Button>
        </div>
      </div>
    </div>
  );
};
