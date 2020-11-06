import React from "react";

const Pagination = ({ slotsPerPage, totalSlots, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalSlots / slotsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="pagination" style={{cursor:"pointer"}}>
      {pageNumbers.map((number) => (
        <li key={number} className="page-item">
          <a onClick={() => paginate(number)} className="page-link">
            {number}
          </a>
        </li>
      ))}
    </nav>
  );
};

export default Pagination;
