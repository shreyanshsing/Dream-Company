import './App.css';
import MainPage from "./component/LandingPage/MainPage";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Toast from "./Reusables/Toast/Toast";
import DashboardCandidate from "./component/Candidate/Dashboard/Dashboard";
import DashboardRecuiter from './component/Recuiter/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Toast/>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route path="/dashboard-candidate" component={DashboardCandidate}/>
          <Route path="/dashboard-recuiter" component={DashboardRecuiter}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
