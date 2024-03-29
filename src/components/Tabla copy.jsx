import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender
} from '@tanstack/react-table'
import { SortDownIcon, SortIcon, SortUpIcon } from './Icons'
import { Dropdown } from './Dropdown'
import { useState } from 'react'
export const Tabla = ({ columns, data }) => {
  const [columnFilters, setColumnFilters] = useState([])
  const [sorting, setSorting] = useState([])
  const [columnToFilter, setColumnToFilter] = useState('user')
  const [columnVisibility, setColumnVisibility] = useState({})
  const tableRef = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  })
  return (
    <>
      <div className='flex mb-4'>
        <div className='flex'>
          <Dropdown columnToFilterName={columnToFilter} setColumnFilters={setColumnFilters} buttonText='Selecciona columna a Buscar'>
            {tableRef
              .getAllColumns()
              .filter(
                (column) => column.getCanFilter()
              )
              .map((column) => {
                return (
                  <li
                    key={column.id}
                    className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'
                    onClick={() => setColumnToFilter(column.id)}
                  >
                    {column.id}
                  </li>
                )
              })}
          </Dropdown>
          <input onChange={e => tableRef.getColumn(columnToFilter || 'id').setFilterValue(e.target.value)} className='px-4 py-2 rounded-md' type='text' value={tableRef.getColumn(columnToFilter || 'id').getFilterValue() ?? ''} placeholder='Buscar...' />
        </div>
        <Dropdown buttonText='Columnas'>
          {tableRef
            .getAllColumns()
            .filter(
              (column) => column.getCanFilter()
            )
            .map((column) => {
              return (
                <li
                  key={column.id}
                  className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'
                >
                  <label><input type='checkbox' value={column.id} checked={column.getIsVisible()} onChange={e => column.toggleVisibility(e.target.value)} />{column.id}</label>
                </li>
              )
            })}
        </Dropdown>
      </div>
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
                        <div className={header.column.getCanSort() ? 'flex gap-3 items-center cursor-pointer' : 'flex gap-3 items-center'}>
                          {
                            header.column.columnDef.header
                        }
                          {header.column.getCanSort() && (
                            { asc: <SortUpIcon />, desc: <SortDownIcon /> }[header.column.getIsSorted()] || <SortIcon />
                          )}
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
    </>
  )
}
