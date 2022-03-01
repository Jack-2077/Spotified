import { useEffect, useState } from 'react';

import { Login, Profile } from './pages';
import { accessToken, logout, getCurrentUserProfile } from '../spotify';
import { catchErrors } from '../utils';

import { GlobalStyle } from './styles';

function Home() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);

      const fetchData = async () => {
        const { data } = await getCurrentUserProfile();
        setProfile(data);
        console.log(data);
      };

      catchErrors(fetchData());
    }
  }, []);

  return (
    <div>
      <GlobalStyle />
      {!token ? (
        <Login />
      ) : (
        <>
          <button onClick={logout}>Log out</button>
          {profile && <Profile />}
        </>
      )}
    </div>
  );
}

export default Home;
