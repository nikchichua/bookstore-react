import { Navbar, Container, Nav, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook} from "@fortawesome/free-solid-svg-icons/faBook";
import {faLock} from "@fortawesome/free-solid-svg-icons";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons/faUserPlus";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../services";
import {useHistory} from "react-router";

const NavBar = () => {
    const loggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logout());
        history.push('/');
    }

    return (
        <Navbar bg='dark' variant="dark" expand='lg'>
            <Container>
                <Link className='navbar-brand' to='/home' style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <FontAwesomeIcon icon={faBook}/>Book Store
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse style={{
                    justifyContent: 'space-between',
                }} id="basic-navbar-nav">
                    <Nav className='mr-auto'>
                        {
                            loggedIn &&
                            <>
                                <Link className='nav-link' to='/add'>Add Book</Link>
                                <Link className='nav-link' to='/booklist'>Book List</Link>
                                <Link className='nav-link' to='/userlist'>User List</Link>
                            </>
                        }
                    </Nav>
                    <Nav>
                        {
                            !loggedIn ?
                                <>
                                    <Link className='nav-link' to='/register'>
                                        <FontAwesomeIcon icon={faEdit}/> Register
                                    </Link>
                                    <Link className='nav-link' to='/'>
                                        <FontAwesomeIcon icon={faUserPlus}/> Login
                                    </Link>
                                </> :
                                <Button variant='secondary' onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faLock}/> Logout
                                </Button>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;