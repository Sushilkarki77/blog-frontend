
import './App.css'
import AppWrapper from './components/layout/AppWrapper'
import { DataProvider } from './store/DataContext'


function App() {
  return (
    <>
      <DataProvider>
        <AppWrapper />
      </DataProvider>
    </>
  )
}

export default App
