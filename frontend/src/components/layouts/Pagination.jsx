import React from "react";
import ReactPagination from "react-js-pagination";

const Pagination = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  onChange,
  pageRangeDisplayed,
}) => {
  return (
    itemsCountPerPage < totalItemsCount && (
      <ReactPagination
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={pageRangeDisplayed}
        onChange={onChange}
      />
    )
  );
};

export default Pagination;
