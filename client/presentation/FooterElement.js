import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const FooterElement = () => {
    return (
            <Container fluid={true}>
                <Row>
                    <Col md="3" xs="6">Narin</Col>
                    <Col md="3" xs="6">Github</Col>
                    <Col md="3" xs="6">?? License</Col>
                    <Col md="3" xs="6">1.0.0v</Col>
                </Row>
            </Container>
            );
};

export default FooterElement;