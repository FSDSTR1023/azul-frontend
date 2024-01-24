/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

export const SearchContext = createContext()
export const useAuth = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useAuth debe estar dentro del proveedor SearchContext')
  }
  return context
}
export const SearchProvider = ({ children }) => {
  const [searchQuery, setsearchQuery] = useState(null)

  return (
    <SearchContext.Provider value={{ setsearchQuery, searchQuery }}>
      {children}
    </SearchContext.Provider>
  )
}
