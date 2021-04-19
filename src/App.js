import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/Route/PrivateRoute";
import NavBar from "./components/navigationTop/NavBar";
import SideNavBar from "./components/navigationSide/SideNav";
import Filter from "./components/navigationSide/Filter";
import Footer from "./components/Footer/Footer";
import AdminHomePage from "./webPages/Admin/HomePageAdmin";
import AdminClosedListPage from "./webPages/Admin/ClosedListPageAdmin";
import AdminAcceptedListPage from "./webPages/Admin/AcceptedListPageAdmin";
import AdminProgressListPage from "./webPages/Admin/ProgressListPageAdmin";
import RejectedListPage from "./webPages/Admin/RejectedListAdmin";
import AddUser from "./webPages/Admin/AddUser";
import HelpPage from "./webPages/Admin/HelpPage";
import LoginPage from "./webPages/Admin/LoginPage";
import ProfilePage from "./webPages/Admin/ProfilePage";
import {
  updateCategory,
  updateAuthority,
  updateDate,
  resetFilter,
} from "./context/actions";
import { GlobalContext } from "./context";
import ReportBar from "./components/ReportBar/ReportBar";
import api from "./api";

const App = () => {
  const { userState, filterState, dispatchFilter } = useContext(GlobalContext);
  const [auth, setAuth] = useState(false);
  const [report, setReport] = useState({});

  useEffect(() => {
    if (userState.auth === true) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [userState, filterState]);

  useEffect(() => {
    if (auth)
      (async () => {
        try {
          const response = await api.get.report();
          if (!response.data.success) throw new Error(response.data.msg);
          console.log("Report", response.data.msg);
          setReport(response.data.result);
        } catch (error) {
          console.log("Error while fetching report", error.message);
        }
      })();
  }, [auth]);

  const handleFilter = async (e) => {
    try {
      const id = e.target.id;
      const value = e.target.value;

      if (id === "category") {
        await dispatchFilter(updateCategory(value));
      }
      if (id === "date") {
        await dispatchFilter(updateDate(value));
      }
      if (id === "authority") {
        await dispatchFilter(updateAuthority(value));
      }
    } catch (error) {
      console.log("Error at filter", error.message);
    }
  };

  const handleFilterReset = async () => {
    try {
      await dispatchFilter(resetFilter());
    } catch (error) {
      console.log("Error at filter", error.message);
    }
  };

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
            <SideNavBar />
          </div>
          {/* body and footer */}
          <div className="comnfot">
            <div className="reportBar">
              {auth && (
                <ReportBar
                  pending={report.pendingCases}
                  solved={report.solvedCases}
                  total={report.totalCases}
                />
              )}
            </div>
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
            <Filter onFilter={handleFilter} onReset={handleFilterReset} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
