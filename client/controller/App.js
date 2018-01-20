import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import HamburgerNavbar from './HamburgerNavbar';

const Home = () => {
    return (
            <div className="container">
              <h1>It's good to be home</h1>
            </div>
            );
};

const About = () => {
    return (
            <div className="container">
              <h1>About :)</h1>
            </div>
            );
};

const App = () => {
    return (
        <Router>
            <div className="container-flud no-padding">
                <HamburgerNavbar />

                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
            </div>
        </Router>
       );
};

export default App;