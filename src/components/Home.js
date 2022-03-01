import { useEffect, useState } from 'react';

import { Login, Profile } from './pages';
import { accessToken, logout, getCurrentUserProfile } from '../spotify';
import { catchErrors } from '../utils';

import styled from 'styled-components/macro';
import { GlobalStyle } from './styles';

const StyledLoginButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  z-index: 10;
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

  return (
    <div>
      <GlobalStyle />
      {!token ? (
        <Login />
      ) : (
        <>
          <StyledLoginButton onClick={logout}>Log out</StyledLoginButton>
          {profile && <Profile />}
        </>
      )}
    </div>
  );
}

export default Home;
