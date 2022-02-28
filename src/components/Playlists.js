import React from 'react';
import { Outlet } from 'react-router-dom';

function Playlists() {
  return (
    <>
      <div>Playlists</div>
      <Outlet />
    </>
  );
}

export default Playlists;
