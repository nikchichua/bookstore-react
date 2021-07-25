import React from 'react';
import {Button, Card, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserLock} from "@fortawesome/free-solid-svg-icons/faUserLock";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {faLock} from "@fortawesome/free-solid-svg-icons/faLock";
import {faUnlockAlt} from "@fortawesome/free-solid-svg-icons/faUnlockAlt";
import {Link} from 'react-router-dom';
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {faIdCardAlt} from "@fortawesome/free-solid-svg-icons/faIdCardAlt";
import {faUserCog} from "@fortawesome/free-solid-svg-icons/faUserCog";
import {faUserAlt} from "@fortawesome/free-solid-svg-icons/faUserAlt";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons/faUserPlus";
import {faFileSignature} from "@fortawesome/free-solid-svg-icons/faFileSignature";
import {faLockOpen} from "@fortawesome/free-solid-svg-icons";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons/faPlusSquare";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";

const Register = () => {
    return (
        <div style={{position: 'relative', top: '6%'}}>
            <Row className='justify-content-md-center'>
                <Col xs={5} style={{minWidth: 483, width: '50%'}}>
                    <Card className='border border-dark bg-dark text-white'>
                        <Card.Header style={{
                            fontSize: 20,
                            textAlign: 'center',
                            padding: 20,
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            letterSpacing: 10
                        }}>
                            <FontAwesomeIcon style={{fontSize: 25}} icon={faUserPlus}/> Register
                        </Card.Header>
                        <Card.Body className='custom-input-body'>
                                <Form.Row>
                                    <Form.Group  as={Col}>
                                        <InputGroup className='custom-input'>
                                            <div className='prepend'>
                                                <FontAwesomeIcon icon={faUser}/>
                                            </div>
                                            <FormControl autoComplete='off'
                                                         type='text'
                                                         name='first-name'
                                                         placeholder='Enter your first name'
                                                         className='bg-dark text-white'
                                                         required />
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group  as={Col}>
                                        <InputGroup className='custom-input'>
                                            <div className='prepend'>
                                                <FontAwesomeIcon icon={faFileSignature}/>
                                            </div>
                                            <FormControl autoComplete='off'
                                                         type='text'
                                                         name='last-name'
                                                         placeholder='Enter your last name'
                                                         className='bg-dark text-white'
                                                         required />
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                            <Form.Row>
                                <Form.Group  as={Col}>
                                    <InputGroup className='custom-input'>
                                        <div className='prepend'>
                                            <FontAwesomeIcon icon={faEnvelope}/>
                                        </div>
                                        <FormControl autoComplete='off'
                                                     type='email'
                                                     name='email'
                                                     placeholder='Enter your email address'
                                                     className='bg-dark text-white'
                                                     required />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <div className='two-row'>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <InputGroup className='custom-input'>
                                            <div className='prepend'>
                                                <FontAwesomeIcon icon={faLockOpen}/>
                                            </div>
                                            <FormControl autoComplete='off'
                                                         type='password'
                                                         name='password'
                                                         placeholder='Enter password'
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
                                                         type='password'
                                                         name='confirm'
                                                         placeholder='Confirm password'
                                                         className='bg-dark text-white'
                                                         required />
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                            </div>
                            <Link className='link' to='/'>Already have an account?</Link>
                        </Card.Body>
                        <Card.Footer style={{textAlign: 'center', padding: 30}}>
                            <Button style={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                letterSpacing: 3,
                                padding: '10px, 35'
                            }} type='button'>
                                <FontAwesomeIcon icon={faPlusCircle}/> Register
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Register;