import { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'

import { getAllRents } from '../api/alquileres'
import { Header } from '../components/Header'
import { AlquileresTable } from '../components/Views/Alquileres/AlquileresTable'

export const Alquileres = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getRents = async () => {
      const result = await getAllRents()
      setData(result.data)
    }
    getRents()
  }, [])

  return (
    <Layout>
      <Header pageName='Alquileres' />
      <AlquileresTable data={data} />
    </Layout>

  )
}
