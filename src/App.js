import { useEffect } from 'react';
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom'
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import { ChakraProvider } from '@chakra-ui/react'
import FAQ from './pages/FAQ/FAQ';

function App() {
  const {tg} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg])

  return (
    <ChakraProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route index element={<MainPage/>} />
          <Route path='/faq' element={<FAQ/>} />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
