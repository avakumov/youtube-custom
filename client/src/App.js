import React from "react"
import { Switch, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import WatchVideo from "./pages/WatchVideo"
import Channel from "./pages/Channel"
import NotFound from "./pages/NotFound"
import History from "./pages/History"
import Sidebar from "./components/Sidebar"
import Container from "./styles/Container"
import LikedVideos from "./pages/LikedVideos"
import Library from "./pages/Library"
import YourVideos from "./pages/YourVideos"
import Trending from "./pages/Trending"
import Subscriptions from "./pages/Subscriptions"
import SearchResults from "./pages/SearchResults"
import { useLocationChange } from "./hooks/use-location-change"

function App() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false)
  const handleCloseSidebar = () => setSidebarOpen(false)
  const toggleSidebarOpen = () => setSidebarOpen(!isSidebarOpen)

  useLocationChange(handleCloseSidebar)

  return (
    <>
      <Navbar toggleSidebarOpen={toggleSidebarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/feed/trending" component={Trending} />
          <Route path="/feed/subscriptions" component={Subscriptions} />
          <Route path="/channel/:channelId" component={Channel} />
          <Route path="/watch/:videoId" component={WatchVideo} />
          <Route path="/results/:searchQuery" component={SearchResults} />
          <Route path="/feed/history" component={History} />
          <Route path="/feed/library" component={Library} />
          <Route path="/feed/liked_videos" component={LikedVideos} />
          <Route path="/feed/my_videos" component={YourVideos} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Container>
    </>
  )
}

export default App
