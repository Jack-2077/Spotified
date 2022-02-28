import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './index.css';
import App from './App';
import { Playlist, Playlists, TopArtists, TopTracks, Home } from './components';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path='top-artists' element={<TopArtists />} />
      <Route path='top-tracks' element={<TopTracks />} />
      <Route path='playlists' element={<Playlists />}>
        <Route path=':id' element={<Playlist />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
