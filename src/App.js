import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CvEditorPage from './pages/cv-editor/cv-editor.component';
import Homepage from './pages/homepage/homepage.component';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <div className="flex items-center justify-center bg-gray-600 text-gray-100">
          <Link to="/" className="mx-4">
            Home
          </Link>
          <Link to="/cv">CV</Link>
        </div>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/cv">
            <CvEditorPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
