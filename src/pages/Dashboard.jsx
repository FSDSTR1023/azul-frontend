import { Header } from '../components/Header'
import { Layout } from '../components/Layout'

export const Dashboard = () => {
  return (
    <Layout pageName='Dashboard' buttonText='Agregar'>
      <Header pageName='Dashboard' />
      <h1>Content</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam sit corporis veniam perspiciatis
        sapiente autem qui, placeat nesciunt iure, minus architecto animi? Provident impedit maxime nihil in
        repellat corrupti reiciendis.
      </p>
    </Layout>
  )
}
