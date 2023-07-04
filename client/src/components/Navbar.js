import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./navbar.css";
import logo from '../Images/Logo.jpeg';
import logout from '../Images/logout.png';

function NavScrollExample() {

  return (
    <Navbar className='nav_main' expand="lg">
      <Container fluid>
      <Navbar.Brand className='d-flex' href="/">
            <img
              src={logo}
              width="35"
              height="35"
              className="d-inline-block align-top logo"
              alt="Filter Pic"
            />{' '}
            <span className='nav_head'>Filter Cam</span>
          </Navbar.Brand>
        <Navbar.Toggle
         aria-controls="navbarScroll"
          />
        <Navbar.Collapse className='Nav_c' id="navbarScroll">
          <Nav
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className="nav_link" href="/ghostmask">Ghostmask</Nav.Link>
            <Nav.Link className="nav_link" href="/hand">Hand-Tattoo</Nav.Link>
            <Nav.Link className="nav_link" href="/lipstick">Lipstick</Nav.Link>
            <Nav.Link className="nav_link" href="/nlp">Text Analyzer</Nav.Link>
            <Nav.Link className="nav_link"  href="/logout">
            <img
              src={logout}
              width="25"
              height="25"
              className="d-inline-block "
              alt="logout"
              style={{marginTop: '-3px'}}
            />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;