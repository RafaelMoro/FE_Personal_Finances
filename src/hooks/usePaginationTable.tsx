import { useState } from 'react';

interface UsePaginationTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arrayOfOptions: any[];
}

/*
* The use of this hook is complemented with the component TablePagination imported from @mui/material
* In the logic, you have to use useMemo to slice the visible rows. The purpose is to type the visibleRows
* And avoid using type any. You have to map the visible rows to show the data on the table.

  const visibleRows = useMemo(
    () => myArray.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ),
    [myArray, page, rowsPerPage],
  );

* Below the row of the table, you have to put to avoid inconsistent space of the table:
{emptyRows > 0 && (<EmptyTableRow emptyRows={emptyRows} colSpan={4} />)}

* The component has to be put below the table in the UI. Example:
  <TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    component="div"
    rowsPerPage={rowsPerPage}
    count={arrayOfTheTable.length}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />
*/
const usePaginationTable = ({ arrayOfOptions }: UsePaginationTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arrayOfOptions.length) : 0;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    emptyRows,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};

export { usePaginationTable };
