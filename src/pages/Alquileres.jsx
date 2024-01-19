import axios from "axios";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";

import Tabla from "../components/Tabla";

export const Alquileres = () => {
  
    const [data, setData] = useState([]);

    useEffect(() => {
      (async () => {
        const result = await axios("http://localhost:3000/rent");
        setData(result.data);
      })();
    }, []);

    const columns = useMemo(
        () => [
          {
            Header: "Alquileres", 
            columns: [
              {
                Header: "ID",
                accessor: "_id",
              },
              {
                Header: "Máquina",
                accessor: 
                row => `${row.machine.make} ${row.machine.model}`,
              },
              {
                Header: "cliente",
                accessor: 
                row => `${row.user.name} ${row.user.lastName}`,
              },
              {
                Header: "Fecha",
                accessor: "dateRentStart",
                Cell: format(new Date(), 'dd.MM.yyyy'),
              },
              {
                Header: "Estado",
                accessor: "status",
              },
            ],
          },
        ],
        []
      );

    return (
        <>
      <div>
        <Tabla columns={columns} data={data} />
      </div>
      </>
    )
  }
  