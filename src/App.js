import "./App.css";
import { Switch, Route } from "react-router-dom";

// navBar
/*top*/ import NavBar from "./components/navigationTop/NavBar";
/*right*/ import SideNavBar from "./components/navigationSide/SideNav";
/*filter*/ import CategoryFilter from "./components/navigationSide/CategoryFilter";
/*footer*/ import Footer from "./components/Footer/Footer";

// Pages - Admin
import AdminHomePage from "./webPages/Admin/HomePageAdmin";
import AdminClosedListPage from "./webPages/Admin/ClosedListPageAdmin";
import AdminOpenListPage from "./webPages/Admin/OpenListPageAdmin";
import AdminProgressListPage from "./webPages/Admin/ProgressListPageAdmin";
import RejectedListPage from "./webPages/Admin/RejectedListAdmin";
import AddUser from "./webPages/Admin/AddUser";
import HelpPage from "./webPages/Admin/HelpPage";
import LoginPage from "./webPages/Admin/LoginPage";
import ProfilePage from "./webPages/Admin/ProfilePage";

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
          {/* Sidenavbar */}
          <div className="sideNav">
            {" "}
            <SideNavBar />{" "}
          </div>
          {/* body and footer */}
          <div className="comnfot">
            {/* load web page content */}
            <div className="mainContent">
              <Switch>
                <Route path="/" exact>
                  <AdminHomePage />
                </Route>
                <Route path="/openList">
                  <AdminOpenListPage />
                </Route>
                <Route path="/progressList">
                  <AdminProgressListPage />
                </Route>
                <Route path="/closedList">
                  <AdminClosedListPage />
                </Route>
                <Route path="/rejectedList">
                  <RejectedListPage />
                </Route>
                <Route path="/settings">
                  <AddUser />
                </Route>
                <Route path="/help">
                  <HelpPage />
                </Route>
                <Route path="/login">
                  <LoginPage />
                </Route>
                <Route path="/profile">
                  <ProfilePage />
                </Route>
              </Switch>
            </div>
            {/* footer */}
            <div className="footer">
              <Footer />
            </div>
          </div>
          {/* filter */}
          <div className="filter">
            <CategoryFilter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
