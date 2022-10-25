import './Table.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';

const Table = ({ data }) => {
  const navigate = useNavigate();

  const productDetails = (productId) => {
    console.log(productId);
    navigate(`/product/${productId}`);
  };

  // const [tableData, setTableData] = useState(data)

  const tableData = data;

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(tableData.data.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
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
                <tr key={tr.id} onClick={() => productDetails(tr.id)}>
                  {tableData.header.map((x) => {
                    if (tr.hasOwnProperty(x.toLowerCase())) {
                      return <th>{tr[x.toLowerCase()]}</th>;
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
        />
      </div>
    </div>
  );
};

export default Table;

{
  /* <th>{tr.name}</th>
<th>{tr.quantity}</th>
<th>{tr.price}</th>
<th>{tr.category}</th> */
}
