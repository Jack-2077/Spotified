import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import { Playlist, Home } from './components';
import { TopArtists, TopTracks, Playlists } from './pages';
import ScrollToTop from './components/ScrollToTop';
import { GlobalStyle } from './components/styles';

function App() {
  return (
    <Router>
      <GlobalStyle />
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
