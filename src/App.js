import './App.css';
import MainPage from "./component/LandingPage/MainPage";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Toast from "./Reusables/Toast/Toast";
import DashboardCandidate from "./component/Candidate/Dashboard/Dashboard";
import DashboardRecuiter from './component/Recuiter/Dashboard/Dashboard';
import DetailDashboard from './component/Recuiter/Dashboard/DetailDashboard';
import AppRoute from "./PrivateRoute/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Toast/>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <AppRoute path="/dashboard-candidate" component={DashboardCandidate}/>
          <AppRoute path="/dashboard-recuiter" component={DashboardRecuiter}/>
          <AppRoute path="/detail-board" component={DetailDashboard}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
