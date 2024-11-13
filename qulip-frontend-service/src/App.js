import './App.css';
import { Toaster } from 'react-hot-toast';
import { Index as Routes } from './Routes';
function App() {
  return (
    <>
      <Toaster autoClose={2000} />
      <Routes />
    </>
  );
}

export default App;
