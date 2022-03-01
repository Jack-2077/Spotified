import { useState, useEffect } from 'react';
import {
  getCurrentUserProfile,
  getCurrentUserPlaylists,
  getTopArtists,
  getTopTracks,
} from '../../spotify';

import { SectionWrapper, ArtistsGrid } from '../';
import { catchErrors } from '../../utils';
import { StyledHeader } from '../styles';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [artists, setArtists] = useState(null);
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);

      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylists(userPlaylists.data);

      const userArtists = await getTopArtists();
      setArtists(userArtists.data);

      const userTracks = await getTopTracks();
      setArtists(userTracks.data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <>
      {profile && (
        <StyledHeader type='user'>
          <div className='header__inner'>
            {profile.images.length && profile.images[0].url && (
              <img
                className='header__img'
                src={profile.images[0].url}
                alt='Avatar'
              />
            )}
            <div>
              <div className='header__overline'>Profile</div>
              <h1 className='header__name'>{profile.display_name}</h1>
              <p className='header__meta'>
                {playlists && (
                  <span>
                    {playlists.total} Playlist
                    {playlists.total !== 1 ? 's' : ''}
                  </span>
                )}
                <span>
                  {profile.followers.total} Follower
                  {profile.followers.total !== 1 ? 's' : ''}
                </span>
              </p>
            </div>
          </div>
        </StyledHeader>
      )}
      {artists && (
        <main>
          <SectionWrapper
            title='Top artists this month'
            seeAllLink='/top-artists'
          >
            <ArtistsGrid artists={artists.items.slice(0, 10)} />
          </SectionWrapper>
        </main>
      )}
    </>
  );
};

export default Profile;
