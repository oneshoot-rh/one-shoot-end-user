import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
import UploadResumes from './components/UploadResumes'

function App() {

  const queryClient = new QueryClient()


  return (
    <QueryClientProvider client={queryClient}>
    <h1>One Shoot Project</h1>
    <UploadResumes />
    </QueryClientProvider>
  )

}

export default App
