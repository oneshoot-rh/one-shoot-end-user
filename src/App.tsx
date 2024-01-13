import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
import UploadResumes from './components/UploadResumes'
import NavBar from './components/shared/NavBar'
import AppRouter from './components/core/AppRouter'

function App() {

  const queryClient = new QueryClient()


  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
  

}

export default App
