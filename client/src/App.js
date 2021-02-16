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
import WatchVideo from "./pages/WatchVideo"
import Channel from "./pages/Channel"
import NotFound from "./pages/NotFound"

export const queryClient = new QueryClient()

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
                <Route exact path="/" component={Home} />
                <Route path="/channel/:channelId" component={Channel} />
                <Route path="/watch/:videoId" component={WatchVideo} />
                <Route path="*" component={NotFound} />
              </Switch>
            </ThemeProvider>
          </Router>
        </SnackbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
