import React from 'react';
import { Container, Row, Col, Alert, Button } from 'reactstrap';
import Icon from './IconElement';
import BBcodeInterpeter from '../lib/BBcode-interpreter';

const Preview = (props) =>
    <Col className="preview-content no-margin">
        <Alert color={"preview"} isOpen={props.displayAlert} toggle={props.onAlertDismiss}>
            <div dangerouslySetInnerHTML={{__html: props.text}}></div>
        </Alert>
    </Col>;

const HomeAlert = (props) =>
    <Col><Alert color={props.color} isOpen={props.displayAlert} toggle={props.onAlertDismiss}>{props.text}</Alert></Col>;

const HomeTextArea = (props) =>
    <Col id="texarea-wrapper"><textarea id="bbcode-text" placeholder={props.placeholder} onChange={props.onChange} ref={(textarea) => props.onRef(textarea)}></textarea></Col>;

const HomeMenu = (props) =>
    <Col>
        <Button color="primary" onClick={props.previewAction} className="mr-3"><Icon icon={"magnifier"}/>Preview</Button>
        <Button color="primary" onClick={props.copyAction}><Icon icon={"copy"}/>Copy</Button>
    </Col>;

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.textArea = null;
        this.currentText = '';
        this.parseBBcodeText = '';
        this.state = {
            displayAlert: false,
            alertText: "Page in progress! Next updates comming soon :)",
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
        if(this.currentText === '') {
            this.currentText = '&nbsp;';
        }
        this.parseBBcodeText = BBcodeInterpeter.decodeToHTML(this.currentText);
        console.log(this.currentText);
        this.setState({displayPreview: !this.state.displayPreview});
    }

   render() {
        const alert = (this.state.displayAlert) ? <HomeAlert text={this.state.alertText} color={this.state.alertColor} onAlertDismiss={() => this.setState({ displayAlert: false })} displayAlert={this.state.displayAlert}/> : null ;
        const preview = (this.state.displayPreview) ? <Preview text={this.parseBBcodeText} onAlertDismiss={() => this.setState({ displayPreview: false })} displayAlert={this.state.displayPreview}/>: null;

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
                        <Row>{preview}</Row>
                        <Row>
                            <HomeTextArea
                                placeholder={"Write some BBCode here :)"}
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

