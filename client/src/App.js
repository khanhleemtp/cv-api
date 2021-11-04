import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CvEditorPage from './pages/cv-editor/cv-editor.component';
import Homepage from './pages/homepage/homepage.component';
import Navbar from './components/header/header.component';
import CvPreview from './components/cv-preview/cv-preview.component';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Navbar />
        <div className="mt-16 h-full flex-grow flex flex-col">
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/cv">
              <CvEditorPage />
            </Route>
            <Route path="/preview">
              <CvPreview />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
