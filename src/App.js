import { useEffect } from 'react';
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom'
import './App.css';
import MainPage from './components/MainPage/MainPage';

function App() {
  const {tg} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg])


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<MainPage/>} />
      </Routes>
    </div>
  );
}

export default App;
