import React from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem } from 'reactstrap';
import IconElement from '../presentation/IconElement';

export default class HamburgerNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <Navbar color="faded" light expand="md" className="custom-toggler">
                <Link className="navbar-brand" to="/">[b]Star[/b]</Link>
                <NavbarToggler onClick={() => this.toggle()} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link className="nav-link" to="#"><IconElement icon="settings"/>Settings</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="#"><IconElement icon="cake"/>Get sources</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/about"><IconElement icon="compass"/>About</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

