import React from 'react';
import { Container, Row, Col, Alert, Button } from 'reactstrap';
import Icon from './IconElement';
import BaseAlert from './Alert';
import localStorageController from '../controller/LocalStorageController';
import LangController from '../lang/langController';
const LANG = LangController.getDefaultLang();

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
            alertText: [<Icon key="1" icon={"warning"}/>, <span key="2">LANG.TEXT_REMOVED</span>],
            alertColor: "danger"
        });
    }


    render() {
        const alert = this.state.displayAlert ? <BaseAlert text={this.state.alertText} color={this.state.alertColor} onAlertDismiss={() => this.setState({ displayAlert: false })} displayAlert={this.state.displayAlert}/> : null ;
        const support = (typeof(Storage) == "undefined") ? <Col xs="12" className="text-danger mb-3"><Icon icon="warning"/>{LANG.BROWSER_SUPPORT}</Col> : null ;

        return (
            <Container fluid={false}>
                <Row className="pb-3">
                    {alert}
                    <Col xs="12"><h2><Icon icon={"bookmark"}/>{LANG.YOUR_ACTIONS}</h2></Col>
                    {support}
                    <Col xs="12">{LANG.EXPLAIN_LOCALSTORAGE}</Col>
                    <Col xs="12">
                        <Button color="danger" className="mt-3" onClick={() => this.handleRemoveButtonAction()}><Icon icon={"warning"}/>{LANG.REMOVE}</Button>
                    </Col>
                </Row>
            </Container>);
    }
};

export default SettingsPage;
