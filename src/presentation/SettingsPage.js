import React from 'react';
import { Container, Row, Col, Alert, Button } from 'reactstrap';
import Icon from './IconElement';
import BaseAlert from './Alert';
import localStorageController from '../controller/LocalStorageController';

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAutoSave: localStorageController.getAutoSave(),
            displayAlert: false,
            alertText: '',
            alertColor: "danger"
        };
    }

    handleRemoveButtonAction() {
        localStorageController.removeText();
        this.setState({
            displayAlert: true,
            alertText: [<Icon key="1" icon={"warning"}/>, <span key="2">Text removed</span>],
            alertColor: "danger"
        });
    }


    render() {
        const alert = this.state.displayAlert ? <BaseAlert text={this.state.alertText} color={this.state.alertColor} onAlertDismiss={() => this.setState({ displayAlert: false })} displayAlert={this.state.displayAlert}/> : null ;
        const support = (typeof(Storage) == "undefined") ? <Col xs="12" className="text-danger mb-3"><Icon icon="warning"/>Your browser doesn't support HTML5 features and this site can't work. Update your browser to use this site :)</Col> : null ;

        return (
            <Container fluid={false}>
                <Row className="pb-3">
                    {alert}
                    <Col xs="12"><h2><Icon icon={"bookmark"}/>Your actions</h2></Col>
                    {support}
                    <Col xs="12">This options works in your localstorage. This means, that the text will be save only in your brower and you can remove it using the "remove" button on this site or using your browser tools.</Col>
                    <Col xs="12">
                        <Button color="danger" className="mt-3" onClick={() => this.handleRemoveButtonAction()}><Icon icon={"warning"}/>Remove saved text</Button>
                    </Col>
                </Row>
            </Container>);
    }
};

export default SettingsPage;
