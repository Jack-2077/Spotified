import { useEffect, useState } from 'react';

import { accessToken, logout, getCurrentUserProfile } from '../spotify';
import { catchErrors } from '../utils';

function Home() {
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
          <button onClick={logout}>Log out</button>
        </>
      )}
    </div>
  );
}

export default Home;
