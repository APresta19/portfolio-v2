import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectGrid from './components/ProjectGrid';
import HomePage from './HomePage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/projects" element={<ProjectGrid />}></Route>
      </Routes>
    </Router>
  </StrictMode>,
)
