import { useEffect, useState } from 'react';
import './App.css';
import { accessToken, logout, getCurrentUserProfile } from './spotify';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      try {
        const { data } = await getCurrentUserProfile();
        setProfile(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='App'>
      {!token ? (
        <a href='http://localhost:8888/login'>LOGIN</a>
      ) : (
        <>
          <h1>Welcome</h1>
          <button onClick={logout}>Log out</button>
        </>
      )}
    </div>
  );
}

export default App;
