import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Image, NavDropdown } from "react-bootstrap";

const Navigation = () => {
  const { currentUser, userPhotoUrl, userName, userEmail } = useAuth();

  return (
    <Navbar bg="light" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/" className="logo">
          Map
        </Navbar.Brand>

        {!currentUser && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={NavLink} end to="/suggestions">
                  Add Suggestions
                </Nav.Link>
                <Nav.Link as={NavLink} end to="/login">
                  Login
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        )}

        {currentUser && (
          <div className="ms-auto d-flex align-items-center">
            <NavDropdown
              title={
                userPhotoUrl ? (
                  <Image src={userPhotoUrl} height={30} width={30} roundedCircle />
                ) : (
                  userName || userEmail
                )
              }
              align="end"
              className="user-dropdown"
            >
              <NavDropdown.Item as={NavLink} end to="/add-establishment">
                Add establishment
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} end to="/update-profile">
                Update profile
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} end to="/admin-dashboard">
                Admin dashboard
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} end to="/logout">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default Navigation;
