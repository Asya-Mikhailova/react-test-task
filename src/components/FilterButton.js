import React from 'react';

export const FilterButton = ({ filter, title }) => {
  return (
    <>
      {filter ? (
        <button className='btn btn-border'> {title} </button>
      ) : (
        <button className='btn btn-border'> {title}</button>
      )}
    </>
  );
};
