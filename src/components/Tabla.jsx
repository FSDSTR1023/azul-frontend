import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table'
import { SortDownIcon, SortIcon, SortUpIcon } from './Icons'
export default function Tabla ({ columns, data }) {
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
//     {
//       columns,
//       data
//     },
//     useSortBy
//   )

  const tableRef = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  })
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table
        className='w-full text-sm text-left rtl:text-right text-gray-500 '
      >
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          {tableRef.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className='px-6 py-3' key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {header.isPlaceholder
                    ? null
                    : (
                      <div className='flex gap-3 items-center cursor-pointer'>
                        {
                            flexRender(header.column.columnDef.header, header.getContext())
                        }
                        {
                            { asc: <SortUpIcon />, desc: <SortDownIcon /> }[header.column.getIsSorted() ?? null] || <SortIcon />

                        }
                      </div>
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableRef.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className='bg-white border-b'
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className='px-6 py-4'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
