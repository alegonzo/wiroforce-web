import { createContext, useContext, useMemo, useState } from 'react'

//Context
export const AppContext = createContext(null)

//Provider
export const AppContextProvider = ({ children }) => {
  const [message, setMessage] = useState({
    show: false,
    text: '',
  })
  const [showBackdrop, setShowBackdrop] = useState(false)

  const values = useMemo(() => {
    return {
      message,
      setMessage,
      showBackdrop,
      setShowBackdrop,
    }
  }, [message, showBackdrop])

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)

  if (!context) {
    console.error('Error deploying App Context!!!')
  }

  return context
}

export default useAppContext
