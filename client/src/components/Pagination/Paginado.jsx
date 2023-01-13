import React from "react";
import "./Pagination.css";

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="paginatio">
      <ul className="pagination">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <a className="page-link" href="#!" onClick={() => paginado(number)}>
                {number}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
