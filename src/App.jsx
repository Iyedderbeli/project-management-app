import React from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import ProjectManagerView from './views/ProjectManagerView';
import DomainManagerView from './views/DomainManagerView';
import DeveloperView from './views/DeveloperView';

function App() {
  return (
    <Router>
        <nav>
          <Link to="/project-manager">Project Manager</Link>
          <Link to="/domain-manager">Domain Manager</Link>
          <Link to="/developer">Developer</Link>
        </nav>
      <Routes>
        <Route path="/project-manager" element={<ProjectManagerView />} />
        <Route path="/domain-manager" element={<DomainManagerView />} />
        <Route path="/developer" element={<DeveloperView />} />
      </Routes>
    </Router>
        
  );
}

export default App;
