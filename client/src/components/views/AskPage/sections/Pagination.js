import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ asksPerPage, totalAsks, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAsks / asksPerPage); i++) {
    pageNumbers.push(i);
  }

  const prevPage = (event) => {
    event.preventDefault();
    if (currentPage !== 1) {
      paginate(currentPage - 1);
    }
  };

  const nextPage = (event) => {
    event.preventDefault();
    if (currentPage !== paginate.length + 1) {
      paginate(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <Link to="/ask" onClick={prevPage}>
        <div
          className="material-icons"
          style={currentPage === 1 ? { opacity: '0.3' } : { opacity: '1' }}
        >
          navigate_before
        </div>
      </Link>
      <div className="page-number-wrap">
        {pageNumbers.map((number) => (
          <div key={number} className="page-number">
            <Link
              to="/ask"
              onClick={(event) => {
                event.preventDefault();
                paginate(number);
              }}
              className="page-link"
              style={
                currentPage === number
                  ? { color: '#f9714b' }
                  : { color: '#a1a1a1' }
              }
            >
              {number}
            </Link>
          </div>
        ))}
      </div>
      <Link to="/ask" onClick={nextPage}>
        <div
          className="material-icons"
          style={
            currentPage === paginate.length + 1
              ? { opacity: '0.3' }
              : { opacity: '1' }
          }
        >
          navigate_next
        </div>
      </Link>
    </div>
  );
};

export default Pagination;
