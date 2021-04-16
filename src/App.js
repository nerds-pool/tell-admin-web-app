import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/Route/PrivateRoute";

// navBar
import NavBar from "./components/navigationTop/NavBar";
import SideNavBar from "./components/navigationSide/SideNav";
import CategoryFilter from "./components/navigationSide/CategoryFilter";
import Footer from "./components/Footer/Footer";

// Pages - Admin
import AdminHomePage from "./webPages/Admin/HomePageAdmin";
import AdminClosedListPage from "./webPages/Admin/ClosedListPageAdmin";
import AdminAcceptedListPage from "./webPages/Admin/AcceptedListPageAdmin";
import AdminProgressListPage from "./webPages/Admin/ProgressListPageAdmin";
import RejectedListPage from "./webPages/Admin/RejectedListAdmin";
import AddUser from "./webPages/Admin/AddUser";
import HelpPage from "./webPages/Admin/HelpPage";
import LoginPage from "./webPages/Admin/LoginPage";
import ProfilePage from "./webPages/Admin/ProfilePage";
import { GlobalContext } from "./context";

const App = () => {
  const { userState } = useContext(GlobalContext);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    console.log("Checking auth in App.js");
    if (userState.auth === true) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [userState]);

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
                <PrivateRoute auth={auth} path="/" exact>
                  <AdminHomePage />
                </PrivateRoute>
                <PrivateRoute auth={auth} path="/acceptedList">
                  <AdminAcceptedListPage />
                </PrivateRoute>
                <PrivateRoute auth={auth} path="/ongoingList">
                  <AdminProgressListPage />
                </PrivateRoute>
                <PrivateRoute auth={auth} path="/closedList">
                  <AdminClosedListPage />
                </PrivateRoute>
                <PrivateRoute auth={auth} path="/rejectedList">
                  <RejectedListPage />
                </PrivateRoute>
                <PrivateRoute auth={auth} path="/create">
                  <AddUser />
                </PrivateRoute>
                <PrivateRoute auth={auth} path="/help">
                  <HelpPage />
                </PrivateRoute>
                <Route path="/login">
                  <LoginPage />
                </Route>
                <PrivateRoute auth={auth} path="/profile">
                  <ProfilePage />
                </PrivateRoute>
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
};

export default App;
