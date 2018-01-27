import React from 'react';
import { Container, Row, Col, Alert, Button } from 'reactstrap';
import Icon from './IconElement';
import BBcodeInterpeter from '../lib/BBcode-interpreter';
import HomeAlert from './Alert';
import localStorageController from '../controller/LocalStorageController';

const Preview = (props) =>
    <Col className="preview-content no-margin">
        <Alert color={"preview"} isOpen={props.displayAlert} toggle={props.onAlertDismiss}>
            <div dangerouslySetInnerHTML={{__html: props.text}}></div>
        </Alert>
    </Col>;

const HomeTextArea = (props) =>
    <Col id="texarea-wrapper"><textarea id="bbcode-text" placeholder={props.placeholder} onChange={props.onChange} ref={(textarea) => props.onRef(textarea)}>{props.value}</textarea></Col>;

const HomeMenu = (props) =>
    <Col>
        <Button color="primary" onClick={props.previewAction} className="mr-3"><Icon icon={"magnifier"}/>Preview</Button>
        <Button color="primary" onClick={props.copyAction} className="mr-3"><Icon icon={"copy"}/>Copy</Button>
        {props.additionals}
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

    _setDisplayAlert(icon, text, color="success") {
        this.setState({
            displayAlert: true,
            alertText: [<Icon key="1" icon={icon}/>, <span key="2">{text}</span>],
            alertColor: color
        });
    }

    handleCopyButtonAction(event) {
        this.textArea.select();
        document.execCommand('copy');
        event.target.focus();
        this._setDisplayAlert("copy", "Text copied");
    }

    handlePreviewButtonAction() {
        if(this.currentText === '') {
            this.currentText = 'This text field is empty :(';
        }
        this.parseBBcodeText = BBcodeInterpeter.decodeToHTML(this.currentText);
        this.setState({displayPreview: !this.state.displayPreview});
    }

    handleSaveButtonAction() {
        localStorageController.saveText(this.currentText);
        this._setDisplayAlert("folder", "Text saved");
    }

   render() {
        const alert = this.state.displayAlert ? <HomeAlert text={this.state.alertText} color={this.state.alertColor} onAlertDismiss={() => this.setState({ displayAlert: false })} displayAlert={this.state.displayAlert}/> : null ;
        const preview = this.state.displayPreview ? <Preview text={this.parseBBcodeText} onAlertDismiss={() => this.setState({ displayPreview: false })} displayAlert={this.state.displayPreview}/>: null;
        const textareaValue = localStorageController.getLoadText() ? localStorageController.getText() : '';
        localStorageController.setLoadText(false);
        const saveTextButton = localStorageController.getAutoSave() ? null : <Button color="primary" onClick={() => this.handleSaveButtonAction()}><Icon icon={"folder"}/>Save text</Button>;

        return (
            <Container fluid={true}>
                    <Row className="pb-3">
                        <HomeMenu
                            previewAction={() => this.handlePreviewButtonAction()}
                            copyAction={(event) => this.handleCopyButtonAction(event)}
                            additionals={saveTextButton}
                        />
                    </Row>
                    <Row>{alert}</Row>
                    <Row>{preview}</Row>
                    <Row>
                        <HomeTextArea
                            placeholder={"Write some BBCode here :)"}
                            onChange={(event) => this.currentText = event.target.value}
                            onRef={(textarea) => this.textArea = textarea}
                            value={textareaValue}
                        />
                    </Row>
            </Container>);
   }
};

export default HomePage;

