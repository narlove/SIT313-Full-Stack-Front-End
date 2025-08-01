import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const outerSpace = 3;

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand className={"ms-" + outerSpace} href="#">DEV@Deakin</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarDropdown" />
        <Navbar.Collapse id="navbarDropdown">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '120px' }}
          >
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#post">Post</Nav.Link>
            <Nav.Link href="#login">Login</Nav.Link>
          </Nav>
          <Form className={"d-flex me-" + outerSpace}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;