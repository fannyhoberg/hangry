import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Image, NavDropdown } from "react-bootstrap";

const Navigation = () => {
  const { currentUser, userPhotoUrl, userName } = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/" className="logo">
          Hangry
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {currentUser ? (
              <>
                <NavDropdown
                  title={
                    userPhotoUrl ? (
                      <Image
                        src={userPhotoUrl}
                        height={30}
                        width={30}
                        roundedCircle
                      />
                    ) : (
                      userName
                    )
                  }
                >
                  <NavDropdown.Item as={NavLink} end to="/add-establishment">
                    Add establishment
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} end to="/update-profile">
                    Update profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} end to="/logout">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
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
