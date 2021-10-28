import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CvEditorPage from './pages/cv-editor/cv-editor.component';
import Homepage from './pages/homepage/homepage.component';
import Navbar from './components/header/header.component';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Navbar />
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
