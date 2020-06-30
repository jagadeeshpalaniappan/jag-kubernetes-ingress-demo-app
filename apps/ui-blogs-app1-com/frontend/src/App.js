import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddPost from "./AddPost";
import useFetch from "./useFetch";

function Home() {
  const { response, error } = useFetch("/api/v1/posts", {});
  return (
    <div className="container-fluid my-2">
      <h2>Blog Posts</h2>

      <div className="d-flex justify-content-end">
        <Link to="/posts/add" className="btn btn-primary" role="button">
          Add Post
        </Link>
      </div>
      {error && <div>Error Fetching Posts</div>}

      {response &&
        response.map((post) => (
          <div className="list-group mt-3">
            <a
              href="#"
              className="list-group-item list-group-item-action flex-column align-items-start"
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{post.title}</h5>
                <small>Id: {post._id}</small>
              </div>
              <p className="mb-1">{post.body}</p>
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

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            App1 Blogs
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
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/posts/add">
            <AddPost />
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
