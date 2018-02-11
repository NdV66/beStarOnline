import React from 'react';
import { Container, Row, Col, Alert, Button } from 'reactstrap';
import Icon from './IconElement';
import BBcodeInterpeter from '../lib/BBcode-interpreter';
import HomeAlert from './Alert';
import localStorageController from '../controller/LocalStorageController';
import { Preview, HomeTextArea, HomeMenuButton, HomeMenu } from './HomeElements';
import LangController from '../lang/langController';
const LANG = LangController.getDefaultLang();

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.textArea = null;
        this.parseBBcodeText = '';
        this.state = {
            displayAlert: false,
            alertText: LANG.PAGE_IN_PROGRESS,
            alertColor: "danger",
            displayPreview: false,
            currentText: localStorageController.getAutoSave() ? localStorageController.getText() : ''
        };
    }

    _setDisplayAlert(icon, text, color="success") {
        this.setState({
            displayAlert: true,
            alertText: [<Icon key="1" icon={icon}/>, <span key="2">{text}</span>],
            alertColor: color
        });
    }

    _handleCopyButtonAction(event) {
        this.textArea.select();
        document.execCommand("copy");
        event.target.focus();
        this._setDisplayAlert("copy", LANG.TEXT_COPIED);
    }

    _handlePreviewButtonAction() {
        const textToParse = this.state.currentText !== '' ? this.state.currentText : LANG.TEXTAREA_PLACEHOLDER;
        this.parseBBcodeText = BBcodeInterpeter.decodeToHTML(textToParse);
        this.setState({displayPreview: true});
    }

    _handleSaveButtonAction() {
        localStorageController.saveText(this.state.currentText);
        this._setDisplayAlert("folder", LANG.TEXT_SAVED);
    }

    _handleLoadButtonAction() {
        this._setDisplayAlert("pen", LANG.TEXT_LOADED);
        this.setState({currentText: localStorageController.getText()});
    }

    _renderAdditionalMenuButtons() {
        let additionalButtons = null;
        if(!localStorageController.getAutoSave()) {
            additionalButtons = [<HomeMenuButton key="1" action={() => this._handleSaveButtonAction()} icon={"folder"} text={LANG.SAVE} />,
                                 <HomeMenuButton key="2" action={() => this._handleLoadButtonAction()} icon={"pen"} text={LANG.LOAD} />];
        }
        return additionalButtons;
    }

   render() {
        const alert = this.state.displayAlert ? <HomeAlert text={this.state.alertText} color={this.state.alertColor} onAlertDismiss={() => this.setState({ displayAlert: false })} displayAlert={this.state.displayAlert}/> : null ;
        const preview = this.state.displayPreview ? <Preview text={this.parseBBcodeText} onAlertDismiss={() => this.setState({ displayPreview: false })} displayAlert={this.state.displayPreview}/>: null;

        return (
            <Container fluid={true}>
                    <Row className="pb-3">
                        <HomeMenu
                            previewAction={() => this._handlePreviewButtonAction()}
                            copyAction={(event) => this._handleCopyButtonAction(event)}
                            additionals={this._renderAdditionalMenuButtons()}
                        />
                    </Row>
                    <Row>{alert}</Row>
                    <Row>{preview}</Row>
                    <Row>
                        <HomeTextArea
                            placeholder={LANG.TEXTAREA_PLACEHOLDER}
                            onChange={(event) => this.setState({currentText: event.target.value})}
                            onRef={(textarea) => this.textArea = textarea}
                            value={this.state.currentText}
                        />
                    </Row>
            </Container>);
   }
};

export default HomePage;

