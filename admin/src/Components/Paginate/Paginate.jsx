import React, {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";
import {AiOutlineDoubleRight} from "react-icons/ai";
import {IoChevronForwardOutline} from "react-icons/io5";
import {IoChevronBack} from "react-icons/io5";

import {AiOutlineDoubleLeft} from "react-icons/ai";

const Pagination = ({pageCount, onPageChange, currentPage, goToLastPage}) => {
  const [isFirstPage, setIsFirstPage] = useState(currentPage === 0);

  useEffect(() => {
    setIsFirstPage(currentPage === 0);
  }, [currentPage]);
  return (
    <div className={styles.paginationContainer}>
      <button
        className={`${styles.paginationBttns} ${
          isFirstPage ? styles.disabled : ""
        }`}
        onClick={() => onPageChange({selected: currentPage - 1})}
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
        nextLabel={<IoChevronForwardOutline />}
        forcePage={currentPage}
        previousLabel={<IoChevronBack />}
        // previousLabel={
        //   <IoChevronBack className={isFirstPage ? styles.disabled : ""} />
        // }
      />
      <button
        className={styles.paginationBttns}
        onClick={() => onPageChange({selected: pageCount - 1})}
      >
        <AiOutlineDoubleRight className={styles.icon} />
      </button>
    </div>
  );
};

export default Pagination;
