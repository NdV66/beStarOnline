import React from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem } from 'reactstrap';
import IconElement from '../presentation/IconElement';

const NavbarItem = (props) => {
    const className = props.id === props.activeId ? "nav-link active": "nav-link";

    const onClick = (event) => {
        event.preventDefault();
        props.onClick(props.id);
    };

    return <NavItem onClick={(event)=> onClick(event)}>
        <Link id={props.id} className={className} to={props.link}><IconElement icon={props.icon} />{props.text}</Link>
    </NavItem> ;
};

export default class HamburgerNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            active: ''
        };
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    onNavbarItemClick(activeId) {
        this.setState({ active: activeId });
    }

    render() {
        return (
            <Navbar color="faded" light expand="md" className="custom-toggler">
                <Link className="navbar-brand" to="/" onClick={() => this.onNavbarItemClick('')}>[b]Star[/b]</Link>
                <NavbarToggler onClick={() => this.toggle()} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavbarItem link={"/settings"} text={"Settings"} icon={"settings"} id={"settings"} activeId={this.state.active} onClick={(activeId) => this.onNavbarItemClick(activeId)}/>
                        <NavbarItem link={"/about"} text={"About"} icon={"compass"} id={"about"} activeId={this.state.active} onClick={(activeId) => this.onNavbarItemClick(activeId)}/>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

