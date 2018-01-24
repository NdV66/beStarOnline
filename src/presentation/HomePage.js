import React from 'react';
import { Container, Row, Col, Alert, Button } from 'reactstrap';
import Icon from './IconElement';

const Preview = () =>
    <Col className="preview-content no-margin"></Col>;

const HomeAlert = (props) =>
    <Col><Alert color={props.color} isOpen={props.displayAlert} toggle={props.onAlertDismiss}>{props.text}</Alert></Col>;

const HomeTextArea = (props) =>
    <Col id="texarea-wrapper"><textarea id="bbcode-text" className="full-height" placeholder={props.placeholder} value={props.value} onChange={props.onChange} ref={(textarea) => props.onRef(textarea)}></textarea></Col>;

const HomeMenu = (props) =>
    <Col><Button color="primary" onClick={props.previewAction}><Icon icon={"magnifier"}/>Preview</Button><Button color="primary" onClick={props.copyAction}><Icon icon={"copy"}/>Copy</Button></Col>;

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.textArea = null;
        this.currentText = '';
        this.state = {
            displayAlert: false,
            alertText: "Page in progress! Comming soon :)",
            alertColor: "danger",
            displayPreview: false
        };
    }

    handleCopyButtonAction(event) {
        this.textArea.select();
        document.execCommand('copy');
        event.target.focus();
        this.setState({
            displayAlert: true,
            alertText: [<Icon key="1" icon={"copy"}/>, <span key="2">"Text copied"</span>],
            alertColor: "success"
        });
    }

    handlePreviewButtonAction() {
        this.setState({displayPreview: !this.state.displayPreview});
    }

   render() {
       const alert = (this.state.displayAlert) ? <HomeAlert text={this.state.alertText} color={this.state.alertColor} onAlertDismiss={() => this.setState({ displayAlert: false })} displayAlert={this.state.displayAlert}/> : null ;

        return (
            <Container fluid={true}>
                <Row>
                    <Col>
                        <Row className="pb-3">
                            <HomeMenu
                                previewAction={() => this.handlePreviewButtonAction()}
                                copyAction={(event) => this.handleCopyButtonAction(event)}
                            />
                        </Row>
                        <Row>{alert}</Row>
                        <Row>
                            <HomeTextArea
                                placeholder={"Write some BBCode here :)"}
                                value={"Pobrane z localstorage"}
                                onChange={(event) => this.currentText = event.target.value}
                                onRef={(textarea) => this.textArea = textarea}
                            />
                        </Row>
                    </Col>
                </Row>
            </Container>);
   }
};

export default HomePage;

