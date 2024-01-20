import axios from 'axios'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'

import Tabla from '../components/Tabla'

export const Incidencias = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      const result = await axios('http://localhost:3000/incident')
      setData(result.data)
      console.log('data', result.data)
    })()
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: 'Incidencias',
        columns: [
          {
            Header: 'ID',
            accessor: '_id'
          },
          {
            Header: 'Asunto',
            accessor: 'incident'
          },
          {
            Header: 'Tipo',
            accessor: 'type'
          },
          {
            Header: 'Máquina afectada',
            accessor:
                row => `${row.machine.make} ${row.machine.model}`
          },
          {
            Header: 'Cliente',
            accessor:
                row => `${row.userClient.name} ${row.userClient.lastName}`
          },
          {
            id: 'dateReported',
            Header: 'Fecha',
            accessor: d => {
              return moment(d.dateReported)
                .local()
                .format('DD.MM.YYYY')
            }
            // Cell: format(new Date(), 'dd.MM.yyyy'),
          },
          {
            Header: 'Estado',
            accessor: 'status'
          }
        ]
      }
    ],
    []
  )

  return (
    <>
      <div>
        <Tabla columns={columns} data={data} />
      </div>
    </>
  )
}
