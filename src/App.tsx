import { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AOS from "aos";

import Projects from "./components/projects";
import ProjectView from "./components/projectView";
import Featured from "./components/featured";
import NavBar from "./components/navBar";
import ProjectForm from "./components/projectForm";
import Profile from "./components/userProfile";
import Login from "./components/login";
import Logout from "./components/logout";
import ErrorPage from "./components/error";

import ProtectedRoute from "./components/common/protectedRoute";

import auth from "./services/authService";
import typeService from "./services/typeService";
import projectService from "./services/projectService";

import "./App.css";

function App() {
  useEffect(() => {
    AOS.init({
      once: true,
      startEvent: "DOMContentLoaded",
    });

    typeService.addListener();
    projectService.registerListener();
  }, []);

  auth.setAuth(useAuth0());

  const user = auth.getCurrentUser();

  return (
    <div className="App">
      <main className="container">
        <NavBar user={user} />

        <Switch>
          <ProtectedRoute path="/projectForm/:id" component={ProjectForm} />
          <Route path="/projects/view/:id" component={ProjectView} />
          <Route path="/projects" component={Projects} />
          <Route path="/featured" component={Featured} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/error" component={ErrorPage} />

          <Redirect exact from="/" to="/projects" />
          <Redirect to="/error" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
