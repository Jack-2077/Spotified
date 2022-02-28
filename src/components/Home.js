import { useEffect, useState } from 'react';

import { accessToken, logout, getCurrentUserProfile } from '../spotify';
import { catchErrors } from '../utils';

import styled from 'styled-components/macro';
import { GlobalStyle } from './styles/GlobalStyles';

const StyledLoginButton = styled.a`
  background-color: var(--green);
  color: var(--white);
  padding: 10px 20px;
  margin: 20px auto;
  border-radius: 30px;
  display: inline-block;
`;

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

  const Profile = () => (
    <>
      <h1>{profile.display_name}</h1>
      <h2>Followers : {profile.followers.total}</h2>
      {profile.images.length && <img src={profile.images[0].url} />}
    </>
  );

  return (
    <div>
      <GlobalStyle />
      {!token ? (
        <StyledLoginButton href='http://localhost:8888/login'>
          Log in to Spotify
        </StyledLoginButton>
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
