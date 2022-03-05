import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import { Playlist, Playlists, TopTracks, Home } from './components';
import { TopArtists } from './pages';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route index element={<Home />} />
        <Route path='top-artists' element={<TopArtists />} />
        <Route path='top-tracks' element={<TopTracks />} />
        <Route path='playlists' element={<Playlists />}>
          <Route path=':id' element={<Playlist />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
