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
      {!token ? <a href='http://localhost:8888/login'>LOGIN</a> : 'Welcome'}
    </div>
  );
}

export default App;
