import React from "react";
import "./pagination.scss";

const Pagination = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="pagination">
      {currentPage < 2 ? null : (
        <button onClick={() => setCurrentPage(currentPage - 1)}>
          previous
        </button>
      )}
      <button className="pagination__button--text">page {currentPage}</button>
      <button onClick={() => setCurrentPage(currentPage + 1)}>next</button>
    </div>
  );
};

export default Pagination;
