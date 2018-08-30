import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const FooterElement = () => {
    return (
        <Container fluid={true}>
            <Row>
                <Col md='4' xs='12'>
                    <strong>
                        Narin (NdV66)
                    </strong>
                </Col>
                <Col md='4' xs='12'>
                    <a target='_blank' href='https://github.com/NdV66'>
                        Github
                    </a>
                </Col>
                <Col md='4' xs='12' className='d-none d-md-block'>
                    v1.0.4
                </Col>
            </Row>
        </Container>
    );
};

export default FooterElement;
