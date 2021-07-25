import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {faLock} from "@fortawesome/free-solid-svg-icons/faLock";
import {faUserLock} from "@fortawesome/free-solid-svg-icons/faUserLock";
import {Link} from 'react-router-dom';
import {faLockOpen} from "@fortawesome/free-solid-svg-icons/faLockOpen";
import {login} from "../../services";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";

const Login = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.auth.isLoggedIn);
    const history = useHistory();

    const [submitClicked, setSubmitClicked] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        setSubmitClicked(true);
        dispatch(login(email, password))
    }

    const handleChange = () => {
        setSubmitClicked(false);
    }

    return (
        <div style={{position: 'relative', top: '10%'}}>
            <Row className='justify-content-md-center'>
                <Col xs={5} style={{minWidth: 483, width: '43%'}}>
                    <Form onSubmit={handleSubmit}>
                        <Card className='border border-dark bg-dark text-white'>
                            <Card.Header style={{
                                fontSize: 20,
                                textAlign: 'center',
                                padding: 20,
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                letterSpacing: 10
                            }}>
                                <FontAwesomeIcon style={{fontSize: 25}} icon={faUserLock}/> Login
                            </Card.Header>
                            <Card.Body className='custom-input-body'>
                                {
                                    !loggedIn && submitClicked &&
                                    <Alert style={{textAlign: 'center'}} variant="danger">
                                        Incorrect email or password!
                                    </Alert>
                                }
                                <Form.Row>
                                    <Form.Group  as={Col}>
                                        <InputGroup className='custom-input'>
                                            <div className='prepend'>
                                                <FontAwesomeIcon icon={faEnvelope}/>
                                            </div>
                                            <FormControl autoComplete='off'
                                                         onChange={handleChange}
                                                         type='text'
                                                         name='email'
                                                         placeholder='Enter Your Email Address'
                                                         className='bg-dark text-white'
                                                         required />
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <InputGroup className='custom-input'>
                                            <div className='prepend'>
                                                <FontAwesomeIcon icon={faLock}/>
                                            </div>
                                            <FormControl autoComplete='off'
                                                         onChange={handleChange}
                                                         type='password'
                                                         name='password'
                                                         placeholder='Enter Your Password'
                                                         className='bg-dark text-white'
                                                         required />
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <div className='login-help'>
                                    <Link className='link' to='/register'>Not registered?</Link>
                                    <Link className='link' to='/'>Forgot password?</Link>
                                </div>
                            </Card.Body>
                            <Card.Footer style={{textAlign: 'center', padding: 30}}>
                                <Button style={{
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    letterSpacing: 3,
                                    padding: '10px, 35'
                                }} type='submit'>
                                    <FontAwesomeIcon icon={faLockOpen}/> Login
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default Login;