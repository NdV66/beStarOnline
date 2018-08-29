import React from 'react';
import {Link} from 'react-router-dom';
import {Collapse, Navbar, NavbarToggler, Nav, NavItem} from 'reactstrap';
import IconElement from '../presentation/elements/IconElement';
import LangController from '../lang/langController';

const LANG = LangController.getDefaultLang();

const NavbarItem = (props) => {
    const className = props.id === props.activeId ? 'nav-link active': 'nav-link';
    const onClick = (event) => {
        event.preventDefault();
        props.onClick(props.id);
    };

    return <NavItem onClick={(event)=> onClick(event)}>
        <Link id={props.id} className={className} to={props.link}>
            <IconElement icon={props.icon} />
            {props.text}
        </Link>
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

    _toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    _onNavbarItemClick(activeId) {
        this.setState({ active: activeId });
    }

    render() {
        const baseProps = {
            activeId: this.state.active,
            onClick: (activeId) => this._onNavbarItemClick(activeId),
        };

        return (
            <Navbar color='faded' light expand='md' className='custom-toggler'>
                <Link className='navbar-brand' to='/' onClick={() => this._onNavbarItemClick('')}>[b]Star[/b]</Link>
                <NavbarToggler onClick={() => this._toggle()} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className='ml-auto' navbar>
                        <NavbarItem
                            link={'/settings'}
                            text={LANG.SETTINGS}
                            icon={'cog'}
                            id={'settings'}
                            {...baseProps}
                        />
                        <NavbarItem
                            link={'/about'}
                            text={LANG.ABOUT}
                            icon={'question-circle'}
                            id={'about'}
                            {...baseProps}
                        />
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}
