import { useEffect } from 'react';
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom'
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import { ChakraProvider } from '@chakra-ui/react'
import FAQ from './pages/FAQ/FAQ';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import useFetchData from './hooks/useFetch';
import Contact from './pages/Contact/Contact';

function App() {
  const {tg, user, fetchURL} = useTelegram();
  const TESTID = 666666;
  const { data } = useFetchData(`${fetchURL}/api/getuser/${(user ? user.id : TESTID)}`);

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
          <Route path='/contact' element={<Contact/>} />
          {data.role === "admin" ? <Route path='/admin' element={<AdminPanel/>}/> : null}
          <Route element={<div>Страница не найдена</div>}/>
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
