import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Playlist, Playlists, TopArtists, TopTracks, Home } from './components';
import './App.css';

import { accessToken, logout, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
      console.log(data);
    };

    catchErrors(fetchData());
  }, []);

  const Profile = () => (
    <>
      <h1>{profile.display_name}</h1>
      <h2>Followers : {profile.followers.total}</h2>
      {profile.images.length && <img src={profile.images[0].url} />}
    </>
  );

  return (
    <div className='App'>
      {!token ? (
        <a href='http://localhost:8888/login'>LOGIN</a>
      ) : (
        <>
          <h1>Welcome</h1>
          {profile && <Profile />}
          <Home />
          <button onClick={logout}>Log out</button>
        </>
      )}
    </div>
  );
}

export default App;
