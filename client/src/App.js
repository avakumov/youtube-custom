import GoogleAuth from "./components/GoogleAuth"
import { AuthProvider } from "./context/auth-context"

import { QueryClientProvider, QueryClient } from "react-query"
import Navbar from "./components/Navbar"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GoogleAuth />
        <Navbar />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
