import {Col, Container, Navbar} from "react-bootstrap";

const Footer = () => {
    let fullYear = new Date().getFullYear();
    return (
        <Navbar fixed='bottom' bg='dark' variant='dark'>
            <Container>
                <Col lg={12} className='text-center text-muted'>
                    <div>{fullYear - 1} - {fullYear}, All Rights Reserved by Nikoloz Chichua</div>
                </Col>
            </Container>
        </Navbar>
    );
}

export default Footer;