import { AuthProvider } from "./context/auth-context"
import { BrowserRouter as Router } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "react-query"
import { ThemeProvider } from "styled-components"
import { Switch, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import { darkTheme } from "./styles/theme"
import GlobalStyle from "./styles/GlobalStyle"
import Container from "styles/Container"
import Home from "./pages/Home"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <ThemeProvider theme={darkTheme}>
            <GlobalStyle />
            <Navbar />
            <Container>
              <Switch>
                <Route exact path="/" component={Home} />
              </Switch>
            </Container>
          </ThemeProvider>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
