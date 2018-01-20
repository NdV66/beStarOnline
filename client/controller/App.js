import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import HamburgerNavbar from './HamburgerNavbar';
import AboutPage from '../presentation/AboutPage';
import FooterElement from '../presentation/FooterElement';

const Home = () => {
    return (
            <div className="container">
              <h1>It's good to be home</h1>
            </div>
            );
};

const App = () => {
    return (
        <Router>
            <Container fluid={true} className="no-padding no-margin">
                <header>
                    <HamburgerNavbar />
                </header>

                <main className="pt-3">
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={AboutPage} />
                </main>

                <footer className="footer">
                    <FooterElement />
                </footer>
            </Container>
        </Router>
       );
};

export default App;