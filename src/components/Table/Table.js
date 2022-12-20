import tableStyles from './Table.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';

const Table = ({ data, searching, component }) => {
  
  const navigate = useNavigate();

  const tableData = data;

  const [pageNumber, setPageNumber] = useState(0);
  let dataLength = tableData.data.length;
  const usersPerPage = 20;
  let pagesVisited = pageNumber * usersPerPage;

  const [pageCount, setPageCount] = useState(
    Math.ceil(tableData.data.length / usersPerPage)
  );

  useEffect(() => {
    ifSearching();
  }, [searching, dataLength]);

  const componentUsingTable = (_id, tr) => {
    localStorage.setItem('subjectName', JSON.stringify(tr));
    if (component === 'products') {
      navigate(`/product/${_id}`);
    } else if (component === 'customers') {
      navigate(`/customer/${_id}`);
    } else if (component === 'orders') {
      navigate(`/order/${_id}`);
    }
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const ifSearching = () => {
    if (searching) {
      setPageNumber(0);
      setPageCount(Math.ceil(tableData.data.length / usersPerPage));
    }
    if (pageCount < 0) {
      setPageCount(0);
    }
  };

  return (
    <div>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            {tableData.header.map((th, index) => {
              return <th key={index}>{th}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {tableData.data
            .slice(pagesVisited, pagesVisited + usersPerPage)
            .map((tr) => {
              return (
                <tr
                  key={tr._id}
                  onClick={() => componentUsingTable(tr._id, tr)}
                >
                  {tableData.header.map((x, index) => {
                    if (tr.hasOwnProperty(x.toLowerCase())) {
                      return <td key={index}>{x === 'Price' && '$'}{tr[x.toLowerCase()]}</td>;
                    }
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className={tableStyles.table_pagination}>
        <ReactPaginate
          previousLabel={<AiOutlineDoubleLeft />}
          nextLabel={<AiOutlineDoubleRight />}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={tableStyles.paginationBttns}
          previousLinkClassName={tableStyles.previousBttn}
          nextLinkClassName={tableStyles.nextBttn}
          disabledClassName={tableStyles.paginationDisabled}
          activeClassName={tableStyles.paginationActive}
          forcePage={searching && 0}
        />
      </div>
    </div>
  );
};

export default Table;
