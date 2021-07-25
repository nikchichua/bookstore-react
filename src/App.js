import NavBar from "./components/includes/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from "react-bootstrap";
import Welcome from "./components/pages/Welcome";
import Footer from "./components/includes/Footer";
import AddBook from "./components/pages/AddBook";
import BookList from "./components/pages/BookList";
import {Route, Switch} from "react-router-dom";
import UserList from "./components/pages/UserList";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";

const App = () => {
    return (
        <>
            <NavBar/>
            <Container className='fix-margins' style={{marginTop: 40}}>
                <Row>
                    <Col lg={12}>
                        <Switch>
                            <Route exact path="/">
                                <Welcome/>
                            </Route>
                            <Route exact path="/add">
                                <AddBook title='Add Book'/>
                            </Route>
                            <Route exact path="/booklist">
                                <BookList/>
                            </Route>
                            <Route exact path="/userlist">
                                <UserList/>
                            </Route>
                            <Route exact path="/register">
                                <Register/>
                            </Route>
                            <Route exact path="/login">
                                <Login/>
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>
    );
}

export default App;

