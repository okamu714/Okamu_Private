import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import NoPages from './pages/NoPages';
import Report from './pages/Report';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NoPages />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
