import { Routes, Route } from 'react-router-dom';

import { Playlist, Playlists, TopArtists, TopTracks, Home } from './components';
import './App.css';

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='top-artists' element={<TopArtists />} />
      <Route path='top-tracks' element={<TopTracks />} />
      <Route path='playlists' element={<Playlists />}>
        <Route path=':id' element={<Playlist />} />
      </Route>
    </Routes>
  );
}

export default App;
