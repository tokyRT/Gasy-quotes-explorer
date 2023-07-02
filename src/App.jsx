import { useState } from 'react'
import './styles/App.scss'
import { ChakraProvider } from '@chakra-ui/react'
import Title from './components/Title'
import SearchBar from './components/SearchBar'
import QuotesList from './components/QuotesList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <div className="gradient"></div>
      <div className="content">
        <Title />
        <SearchBar />
        <QuotesList/>
      </div>
    </main>
  )
}

export default App
