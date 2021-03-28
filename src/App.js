import logo from './logo.svg';
import './App.css';
import { Switch, Route } from "react-router-dom"

// navBar
 /*top*/  import NavBar from "./components/navigationTop/NavBar"
/*right*/ import RignNavBar from "./components/navigationSide/RightNav"

// Pages - Admin
import AdminHomePage from "./webPages/Admin/HomePageAdmin"
import AdminClosedListPage from "./webPages/Admin/ClosedListPageAdmin"
import AdminOpenListPage from "./webPages/Admin/OpenListPageAdmin"
import AdminProgressListPage from "./webPages/Admin/ProgressListPageAdmin"

function App() {
  return (
    <div className="App">
      <div className="container">
        {/* nav Bar */}
        <div className="header">
          <NavBar />
        </div>
        {/* body and it's content */}
        <div className="body">
          <div className="sideNav"> <RignNavBar /> </div>
          <div className="mainContent">
            <Switch>
              <Route path='/' exact>
                <AdminHomePage />
              </Route>
              <Route path='/openList'>
                <AdminOpenListPage />
              </Route>
              <Route path='/progressList'>
                <AdminProgressListPage />
              </Route>
              <Route path='/closedList'>
                <AdminClosedListPage />
              </Route>


            </Switch>

          </div>
          <div className="filter"> bye</div>
        </div>
        {/* footer */}
        <div className="footer"></div>
      </div>
    </div>
  );
}

export default App;
