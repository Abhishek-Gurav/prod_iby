import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../Images/Logo.jpeg";
import logout from "../Images/logout.png";
function OffcanvasExample() {
  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="nav_main bg-body-tertiary mb-3"
        >
          <Container fluid>
            <Navbar.Brand className="d-flex" href="#">
              <a href="/" style={{ textDecoration: "none"}}>
                <img
                  src={logo}
                  width="35"
                  height="35"
                  className="d-inline-block align-top logo"
                  alt="Filter Pic"
                />{" "}
                <span className="nav_head">Filter Cam</span>
              </a>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Body className="Nav_c">
                <Nav
                  style={{ maxHeight: "100px" }}
                  className="justify-content-lg-end flex-grow-1 pe-3"
                >
                  <Nav.Link className="nav_link" href="/ghostmask">
                    Ghostmask
                  </Nav.Link>
                  <Nav.Link className="nav_link" href="/hand">
                    Hand-Tattoo
                  </Nav.Link>
                  <Nav.Link className="nav_link" href="/lipstick">
                    Lipstick
                  </Nav.Link>
                  // <Nav.Link className="nav_link" href="/nlp">
                  //   Text Analyzer
                  // </Nav.Link>
                  <Nav.Link className="nav_link" href="/logout">
                    <img
                      src={logout}
                      width="25"
                      height="25"
                      className="d-inline-block "
                      alt="logout"
                      style={{ marginTop: "-3px" }}
                    />
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;

