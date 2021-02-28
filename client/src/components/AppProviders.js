import React from "react"
import { AuthProvider } from "../context/auth-context"
import { BrowserRouter as Router } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "react-query"
import { ThemeProvider } from "styled-components"
import SnackbarProvider from "react-simple-snackbar"
import { darkTheme } from "../styles/theme"
import GlobalStyle from "../styles/GlobalStyle"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "./ErrorFallback"

export const queryClient = new QueryClient()

function AppProviders({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <SnackbarProvider>
              <ThemeProvider theme={darkTheme}>
                <GlobalStyle />
                {children}
              </ThemeProvider>
            </SnackbarProvider>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default AppProviders
