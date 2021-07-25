import { Navbar, Container, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook} from "@fortawesome/free-solid-svg-icons/faBook";
import {faBookReader} from "@fortawesome/free-solid-svg-icons/faBookReader";
import {faSwatchbook} from "@fortawesome/free-solid-svg-icons/faSwatchbook";
import {faUserFriends} from "@fortawesome/free-solid-svg-icons";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons/faUserPlus";

const NavBar = () => {
    return (
        <Navbar bg='dark' variant="dark" expand='lg'>
            <Container>
                <Link className='navbar-brand' to='/' style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <FontAwesomeIcon icon={faBook}/>Book Store
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse style={{
                    justifyContent: 'space-between',
                }} id="basic-navbar-nav">
                    <Nav className='mr-auto'>
                        <Link className='nav-link' to='/add'>
                            Add Book
                        </Link>
                        <Link className='nav-link' to='/booklist'>
                            Book List
                        </Link>
                        <Link className='nav-link' to='/userlist'>
                            User List
                        </Link>
                    </Nav>
                    <Nav className='navbar-right'>
                        <Link style={{alignItems: 'center', gap: 10}} className='nav-link' to='/register'>
                            <FontAwesomeIcon icon={faEdit}/> Register
                        </Link>
                        <Link style={{alignItems: 'center', gap: 10}} className='nav-link' to='/login'>
                            <FontAwesomeIcon icon={faUserPlus}/> Login
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;