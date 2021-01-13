import { AuthProvider } from "./context/auth-context"
import { BrowserRouter as Router } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "react-query"
import { ThemeProvider } from "styled-components"
import Navbar from "./components/Navbar"
import { darkTheme } from "./styles/theme"
import GlobalStyle from "./styles/GlobalStyle"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <ThemeProvider theme={darkTheme}>
            <GlobalStyle />
            <Navbar />
          </ThemeProvider>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
