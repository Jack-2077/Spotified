import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { PlaylistsGrid, SectionWrapper } from '../components';

import { getCurrentUserPlaylists } from '../spotify';

import { catchErrors } from '../utils';

function Playlists() {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userPlaylists = await getCurrentUserPlaylists(50);
      setPlaylists(userPlaylists.data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <>
      {playlists && (
        <SectionWrapper title='Playlists' seeAllLink='/playlists'>
          {console.log(playlists.items)}
          <PlaylistsGrid playlists={playlists.items.slice(0, 50)} />
        </SectionWrapper>
      )}
      <Outlet />
    </>
  );
}

export default Playlists;
