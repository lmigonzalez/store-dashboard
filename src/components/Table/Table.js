import './Table.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';

const Table = ({ data, searching, component }) => {
  const navigate = useNavigate();

  const tableData = data;

  // const [tableData, setTableData] = useState(data)

  const [pageNumber, setPageNumber] = useState(0);
  let dataLength = tableData.data.length;
  const usersPerPage = 10;
  let pagesVisited = pageNumber * usersPerPage;

  const [pageCount, setPageCount] = useState(
    Math.ceil(tableData.data.length / usersPerPage)
  );

  useEffect(() => {
    ifSearching();
  }, [searching, dataLength]);

  const componentUsingTable = (id) => {
    if (component === 'products') {
      navigate(`/product/${id}`);

      console.log('products');
    } else if (component === 'customers') {
      navigate(`/customer/${id}`);
      console.log('customers');
    } else if (component === 'orders') {
      // navigate(`/order/${id}`);
      console.log('orders');
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
      <table>
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
                <tr key={tr.id} onClick={() => componentUsingTable(tr.id)}>
                  {tableData.header.map((x, index) => {
                    if (tr.hasOwnProperty(x.toLowerCase())) {
                      return <th key={index}>{tr[x.toLowerCase()]}</th>;
                    }
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="table-pagination">
        <ReactPaginate
          previousLabel={<AiOutlineDoubleLeft />}
          nextLabel={<AiOutlineDoubleRight />}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'paginationBttns'}
          previousLinkClassName={'previousBttn'}
          nextLinkClassName={'nextBttn'}
          disabledClassName={'paginationDisabled'}
          activeClassName={'paginationActive'}
          forcePage={searching && 0}
        />
      </div>
    </div>
  );
};

export default Table;
