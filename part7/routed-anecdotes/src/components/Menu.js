import React from 'react'
import { Link } from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'

const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      // <div>
      //   <div>
      //     <Link to="/" style={padding}>anecdotes</Link>
      //     <Link to="/create" style={padding}>create new</Link>
      //     <Link to="/about" style={padding}>about</Link>
      //   </div>
      // </div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#" as="span">
        <Link style={padding} to="/">anecdotes</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        <Link style={padding} to="/create">Create new</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        <Link style={padding} to="/about">about</Link>
      </Nav.Link>
      {/* <Nav.Link href="#" as="span">
        {user
          ? <em>{user} logged in</em>
          : <Link to="/login">login</Link>
        }
    </Nav.Link> */}
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
  }

export default Menu