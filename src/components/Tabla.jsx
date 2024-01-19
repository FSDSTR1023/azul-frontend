import { useTable, useSortBy } from "react-table";

export default function Tabla({ columns, data }) {

  const {
    getTableProps, 
    getTableBodyProps, 
    headerGroups,
    rows, 
    prepareRow 
  } = useTable(
    {
    columns,
    data
    },
    useSortBy
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table {...getTableProps()} className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        {headerGroups.map(headerGroup => (
          <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th className="px-6 py-3" key={headerGroup.id} {...column.getHeaderProps(column.getSortByToggleProps())} >
                {column.render("Header")}
                <span>
                  {column.isSorted
                  ? column.isSorted
                    ? '🔽'
                    : '🔼'
                  : ''
                }
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr key={row.id} {...row.getRowProps()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              {row.cells.map(cell => {
                return <td key={row.id} {...cell.getCellProps()} className="px-6 py-4">{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  )
}
