import React from 'react';
import { Col, Alert } from 'reactstrap';

const Flash = (props) =>
    <Col>
        <Alert  color={props.color}
            isOpen={props.displayAlert}
            toggle={props.onAlertDismiss}>
            {props.text}
        </Alert>
    </Col>;

export default Flash;
