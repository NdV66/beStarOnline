import React from 'react';
import { Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import IconElement from './IconElement';

export default class HamburgerNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isOpen: false
        };
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
          <div>
            <Navbar color="faded" light expand="md" className="custom-toggler">
              <NavbarBrand href="/">[b]Star[/b]</NavbarBrand>
              <NavbarToggler onClick={() => this.toggle()} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                  <NavLink href="#"><IconElement icon="settings" />Settings</NavLink>
                  </NavItem>
                    <NavItem>
                    <NavLink href="#"><IconElement icon="cake" />Get sources</NavLink>
                  </NavItem>
                <NavItem>
                    <NavLink href="#"><IconElement icon="compass"/>About</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
    }
}