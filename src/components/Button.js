import React from 'react';

export const Button = ({ forbid }) => {
  let isApproved = false;
  let isForbidden = false;

  return (
    <>
      {forbid ? (
        <button onClick={() => (isForbidden = !isForbidden)} className='btn'>
          <i className='fa fa-simplybuilt'></i>Forbid All
        </button>
      ) : (
        <button onClick={() => (isApproved = !isApproved)} className='btn'>
          <i className='fa fa-smile-o'></i>Approve All
        </button>
      )}
    </>
  );
};
