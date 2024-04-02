import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

const Pagination = ({pageCount, onPageChange, currentPage}) => {
  return (
    <div className={styles.paginationContainer}>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={onPageChange}
        containerClassName={styles.pagination}
        activeClassName={styles.activePage}
        previousLabel={"Prev"}
        nextLabel={"Next"}
        forcePage={currentPage}
      />
    </div>
  );
};

export default Pagination;
