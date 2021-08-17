import React from 'react'
import { Provider } from 'next-auth/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../styles/theme'
import { AppContextProvider } from '../components/AppContext'
import Notification from '../components/common/Notification'
import FullScreenLoader from '../components/common/FullScreenLoader'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
})

export default function MyApp(props) {
  const { Component, pageProps } = props

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <Provider
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
        basePath: `/wiroforce/api/auth`,
      }}
      session={pageProps.session}
    >
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
            <Notification />
            <FullScreenLoader />
          </ThemeProvider>
        </AppContextProvider>
      </QueryClientProvider>
    </Provider>
  )
}
