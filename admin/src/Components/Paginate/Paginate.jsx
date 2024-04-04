import React, {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";
import {AiOutlineDoubleRight} from "react-icons/ai";
import {IoChevronForwardOutline} from "react-icons/io5";
import {IoChevronBack} from "react-icons/io5";

import {AiOutlineDoubleLeft} from "react-icons/ai";

const Pagination = ({pageCount, onPageChange, currentPage, goToLastPage}) => {
  const [isFirstPage, setIsFirstPage] = useState(currentPage === 0);
  const [isLastPage, setIsLastPage] = useState(currentPage === pageCount - 1);

  useEffect(() => {
    setIsFirstPage(currentPage === 0);
    setIsLastPage(currentPage === pageCount - 1);
  }, [currentPage, pageCount]);
  return (
    <div className={styles.paginationContainer}>
      <button
        className={`${styles.paginationBttns} ${
          isFirstPage ? styles.disabled : ""
        }`}
        onClick={() => {
          if (!isFirstPage) {
            onPageChange({selected: 0}); // Move to the first page
          }
        }}
        disabled={isFirstPage}
      >
        <AiOutlineDoubleLeft className={styles.icon} />
      </button>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={onPageChange}
        containerClassName={styles.pagination}
        activeClassName={styles.activePage}
        nextLabel={
          <IoChevronForwardOutline
            className={isLastPage ? styles.disabled : styles.icon}
          />
        }
        forcePage={currentPage}
        // previousLabel={<IoChevronBack />}
        previousLabel={
          <IoChevronBack
            className={isFirstPage ? styles.disabled : styles.icon}
          />
        }
      />
      <button
        className={`${styles.paginationBttns} ${
          isLastPage ? styles.disabled : ""
        }`}
        onClick={() => {
          if (!isLastPage) {
            onPageChange({selected: pageCount - 1}); // Move to the last page
          }
        }}
        disabled={isLastPage}
      >
        <AiOutlineDoubleRight className={styles.icon} />
      </button>
    </div>
  );
};

export default Pagination;
