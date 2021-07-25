import React from 'react';
import {Button, Card, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons/faSignInAlt";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {faLock} from "@fortawesome/free-solid-svg-icons/faLock";

const Login = () => {
    return (
        <Row className='justify-content-md-center'>
            <Col xs={5}>
                <Card className='border border-dark bg-dark text-white'>
                    <Card.Header>
                        <FontAwesomeIcon icon={faSignInAlt}/> Login
                    </Card.Header>
                    <Card.Body>
                        <Form.Row>
                            <Form.Group  as={Col}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text style={{borderRadius: 0}}>
                                            <FontAwesomeIcon style={{
                                                fontSize: 25
                                            }} icon={faEnvelope}/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl autoComplete='off'
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
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text style={{borderRadius: 0}}>
                                            <FontAwesomeIcon style={{
                                                fontSize: 25
                                            }} icon={faLock}/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl autoComplete='off'
                                                 type='text'
                                                 name='email'
                                                 placeholder='Enter Your Password'
                                                 className='bg-dark text-white'
                                                 required />
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer>
                        <Button size='sm' type='button'>
                            <FontAwesomeIcon icon={faSignInAlt}/> Login
                        </Button>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    );
};

export default Login;