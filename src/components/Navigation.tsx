import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navigation = () => {
  const { currentUser } = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/" className="logo">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {currentUser ? (
              <>
                <Nav.Link as={NavLink} end to="/add-establishment">
                  Add establishment
                </Nav.Link>
                <Nav.Link as={NavLink} end to="/update-profile">
                  Update profile
                </Nav.Link>
                <Nav.Link as={NavLink} end to="/logout">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                {" "}
                <Nav.Link as={NavLink} end to="/login">
                  Login{" "}
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
