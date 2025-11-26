import { Outlet } from 'react-router';
import { useEffect } from 'react';
import './App.css';
import Navibar from './Components/Navibar/Navibar';
import { setOriginalWindowSize } from 'Utils/windowSize';
import OverlayMessageBoard from 'Components/Modal/OverlayMessageBoard';
import { UserProvider } from 'Context/Auth';

function App() {
  useEffect(() => {
    setOriginalWindowSize();
  }, []);

  return (
    <div className="App">
      <UserProvider>
        <Navibar />
        <div className="app-content">
          <Outlet />
        </div>
        <OverlayMessageBoard />
      </UserProvider>
    </div>
  );
}

export default App;
