import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import '../Css/Navbar_desktop.css';
import logo from '../logo.png';

const Navbar_desktop = (props) => {
  const { onSearch, fetchBooks } = props;

  const han_Cat_Chan = (category) => {
    fetchBooks(category);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" id='nav'>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='menu' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/" className='navigator'>Home</Nav.Link>
            <Nav.Link onClick={() => han_Cat_Chan('latest')} className='navigator'>Latest</Nav.Link>
            <Nav.Link onClick={() => han_Cat_Chan('highRated')} className='navigator'>High Rated</Nav.Link>
            <Nav.Link href="/about" className='navigator'>About</Nav.Link>
            <Nav.Link href="/contact" className='navigator'>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="search-bar">
          <input
            type="text"
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search for books..."
            className="search-input"
          />
          <button onClick={() => onSearch(document.querySelector('.search-input').value)} className="search-button">
            Search
          </button>
        </div>
        <a href='/about'><img src={logo} id='logo' alt="Logo" /></a>
      </Navbar>
    </div>
  );
}

export default Navbar_desktop;
