import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'

import Tabla from '../components/Tabla'

export const Maquinas = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        ;(async () => {
            const result = await axios('http://localhost:3000/machine')
            setData(result.data)
        })()
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: 'Máquinas',
                columns: [
                    {
                        Header: 'ID',
                        accessor: '_id'
                    },
                    {
                        Header: 'Marca y modelo',
                        accessor: 'make',
                        aggregate: 'count',
                        Aggregated: ({ value }) => `${value} Máquina`,
                        Cell: ({ row }) =>
                            row.original ? row.original.make + ' ' + row.original.model : row.groupByVal
                    },
                    {
                        Header: 'Año',
                        accessor: 'year'
                    },
                    {
                        Header: 'Categoría',
                        accessor: 'category'
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
