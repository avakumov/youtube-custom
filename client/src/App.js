import React from "react"
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
import History from "./pages/History"
import Sidebar from "./components/Sidebar"
import Container from "./styles/Container"
import LikedVideos from "./pages/LikedVideos"
import Library from "./pages/Library"
import { useLocationChange } from "./hooks/use-location-change"

export const queryClient = new QueryClient()

function App() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false)
  const handleCloseSidebar = () => setSidebarOpen(false)
  const toggleSidebarOpen = () => setSidebarOpen(!isSidebarOpen)

  //useLocationChange(handleCloseSidebar)

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SnackbarProvider>
          <Router>
            <ThemeProvider theme={darkTheme}>
              <GlobalStyle />
              <Navbar toggleSidebarOpen={toggleSidebarOpen} />
              <Sidebar isSidebarOpen={isSidebarOpen} />
              <Container>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/channel/:channelId" component={Channel} />
                  <Route path="/watch/:videoId" component={WatchVideo} />
                  <Route path="/feed/history" component={History} />
                  <Route path="/feed/library" component={Library} />
                  <Route path="/feed/liked_videos" component={LikedVideos} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </Container>
            </ThemeProvider>
          </Router>
        </SnackbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
