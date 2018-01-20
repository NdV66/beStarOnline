import React from 'react';
import {
    Container,
    Row,
    Col,
    Alert } from 'reactstrap';

const HomePage = () => {
    return (
            <Container fluid={true}>
                <Row>
                    <Col>
                        <Alert color="danger">
                            Page in progress! Comming soon :)
                        </Alert>
                    </Col>
                </Row>
            </Container>
            );
};

export default HomePage;

