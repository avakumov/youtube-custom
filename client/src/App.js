import { AuthProvider } from "./context/auth-context"
import { BrowserRouter as Router } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "react-query"
import { ThemeProvider } from "styled-components"
import { Switch, Route } from "react-router-dom"
import SnackbarProvider from "react-simple-snackbar"
import Navbar from "./components/Navbar"
import { darkTheme } from "./styles/theme"
import GlobalStyle from "./styles/GlobalStyle"
import Home from "./pages/Home"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SnackbarProvider>
          <Router>
            <ThemeProvider theme={darkTheme}>
              <GlobalStyle />
              <Navbar />
              <Switch>
                <Route to="/" component={Home} />
              </Switch>
            </ThemeProvider>
          </Router>
        </SnackbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
