import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddPhoto from "./AddPhotos";
import useFetch from "./useFetch";

function Home() {
  const { response, error } = useFetch("/api/v1/photos", {});
  return (
    <div className="container-fluid my-2">
      <h2>Photos</h2>

      <div className="d-flex justify-content-end">
        <Link to="/photos/add" className="btn btn-primary" role="button">
          Add Photo
        </Link>
      </div>
      {error && <div>Error Fetching Photos</div>}

      {response &&
        response.map((photo) => (
          <div className="list-group mt-3">
            <a
              href="#"
              className="list-group-item list-group-item-action flex-column align-items-start"
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{photo.title}</h5>
                <small>Id: {photo._id}</small>
              </div>
              <p className="mb-1">{photo.body}</p>
              <small>Donec id elit non mi porta.</small>
            </a>
          </div>
        ))}
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        App1 &gt; Photos
      </Link>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link to="/" className="nav-item nav-link">
            Home
          </Link>
          <Link to="/about" className="nav-item nav-link">
            About
          </Link>
          <Link to="/dashboard" className="nav-item nav-link">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/photos/add">
            <AddPhoto />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
