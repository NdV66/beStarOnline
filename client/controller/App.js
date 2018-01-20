import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import HamburgerNavbar from './HamburgerNavbar';
import AboutPage from '../presentation/AboutPage';
import HomePage from '../presentation/HomePage';
import FooterElement from '../presentation/FooterElement';


const App = () => {
    return (
        <Router>
            <Container fluid={true} className="no-padding no-margin">
                <header>
                    <HamburgerNavbar />
                </header>

                <main className="pt-3">
                    <Route exact path="/" component={HomePage} />
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