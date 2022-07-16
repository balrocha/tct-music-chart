import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MusicListPage from './page/MusicListPage';
import MusicDetailPage from './page/MusicDetailPage';

function App() {
  console.log('App');
 
  return (
    <div align='center'>
      <Router>
        <Routes>
          <Route exact path='/' element={<MusicListPage />} />
          <Route path='/detail/*' element={<MusicDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
