import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
import UploadResumes from './components/UploadResumes'
import NavBar from './components/shared/NavBar'
import AppRouter from './components/core/AppRouter'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    background: {
      default: '#fff',
    },
  },
});


function App() {

  const queryClient = new QueryClient()


  return (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </QueryClientProvider>
  );
  

}

export default App
