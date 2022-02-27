import { useEffect, useState } from 'react';
import './App.css';
import { accessToken } from './spotify';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <div className='App'>
      <a href='http://localhost:8888/login'>LOGIN</a>
    </div>
  );
}

export default App;
