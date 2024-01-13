import { Routes } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../Home';
import ProcessRecommendation from '../ProcessRecommendation';
import NavBar from '../shared/NavBar';
import UploadResumes from '../UploadResumes';
import SuggestCandidates from '../SuggestCandidates';

const AppRouter = () => {
  return (
      <Router>
    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/process" element={<ProcessRecommendation />} />         
        <Route path="/process/upload" element={<UploadResumes />} />
        <Route path="/process/suggest" element={<SuggestCandidates />} />
              
      </Routes>
    </Router>
  );
};

export default AppRouter;
