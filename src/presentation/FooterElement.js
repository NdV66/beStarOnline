import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const FooterElement = () => {
    return (
            <Container fluid={true}>
                <Row>
                <Col md="3" xs="6"><strong>Narin (NdV66)</strong></Col>
                    <Col md="3" xs="6"><a target="_blank" href="https://github.com/NdV66/beStarOnline">Github</a></Col>
                    <Col md="3" xs="6" className="d-none d-md-block">under <a target="_blank" href="https://opensource.org/licenses/MIT">MIT License</a></Col>
                    <Col md="3" xs="6" className="d-none d-md-block">v1.0.1</Col>
                </Row>
            </Container>
            );
};

export default FooterElement;
