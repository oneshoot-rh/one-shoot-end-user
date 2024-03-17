import { Routes } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../Home';
import ProcessRecommendation from '../ProcessRecommendation';
import NavBar from '../shared/NavBar';
import UploadResumes from '../UploadResumes';
import SuggestCandidates from '../SuggestCandidates';
import GettingStartedGuide from '../GettingStartedGuide';
import PrivateRoutes from './ProtectedRoute';
import Login from '../shared/Login';

const AppRouter = () => {
  return (
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/getting-started" element={<GettingStartedGuide />} />
          <Route path="/process" element={<PrivateRoutes />} >
            <Route path="" element={<ProcessRecommendation />} />
          </Route>         
          <Route path="/process/upload" element={<UploadResumes />} />
          <Route path="/process/suggest" element={<SuggestCandidates />} />
        </Routes>
      </Router>
  );
};

export default AppRouter;
