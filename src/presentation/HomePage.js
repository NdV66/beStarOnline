import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import Icon from './elements/IconElement';
import BBcodeInterpeter from '../lib/BBcode-interpreter';
import HomeAlert from './elements/Alert';
import localStorageController from '../controller/LocalStorageController';
import { Preview, HomeTextArea, HomeMenuButton, HomeMenu, GuiToolbox, ImportFile } from './elements/HomeElements';
import LangController from '../lang/langController';
import ICONS_TYPE from './iconsType.json';

const LANG = LangController.getDefaultLang();
const fileDownload = require('react-file-download');

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.textArea = null;
        this.parseBBcodeText = '';
        this.state = {
            displayAlert: false,
            alertText: LANG.PAGE_IN_PROGRESS,
            alertColor: 'danger',
            displayPreview: false,
            currentText: localStorageController.getAutoSave() ? localStorageController.getText() : '',
            collapseMainEditButtons: false,
            collapseToolbox: false
        };
    }

    _setDisplayAlert(icon, text, color = 'success') {
        this.setState({
            displayAlert: true,
            alertText: [<Icon key='1' icon={icon}/>, <span key='2'>{text}</span>],
            alertColor: color
        });
    }

    _handleCopyButtonAction(event) {
        this.textArea.select();
        document.execCommand('copy');
        event.target.focus();
        this._setDisplayAlert(ICONS_TYPE.COPY, LANG.TEXT_COPIED);
    }

    _handlePreviewButtonAction() {
        const textToParse = this.state.currentText !== '' ? this.state.currentText : LANG.TEXTAREA_PLACEHOLDER;
        this.parseBBcodeText = BBcodeInterpeter.decodeToHTML(textToParse);
        this.setState({displayPreview: true});
    }

    _handleSaveButtonAction() {
        localStorageController.saveText(this.state.currentText);
        this._setDisplayAlert(ICONS_TYPE.SAVE, LANG.TEXT_SAVED);
    }

    _handleLoadButtonAction() {
        this._setDisplayAlert(ICONS_TYPE.LOAD, LANG.TEXT_LOADED);
        this.setState({currentText: localStorageController.getText()});
    }

    _handleExportButtonAction() {
        const textToExport = this.state.currentText;
        if(textToExport !== '') {
            fileDownload(textToExport, 'beStarSession.txt');
        } else {
            this._setDisplayAlert(ICONS_TYPE.WARNING, LANG.EXPORT_WARNING, 'danger');
        }
    }

    _handleImportButtonAction(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        reader.onload = (event) => {
            this.setState({currentText: event.target.result});
            this._setDisplayAlert(ICONS_TYPE.DOWNLOAD, LANG.TEXT_IMPORTED);
        };
        reader.onerror = () => this._setDisplayAlert(ICONS_TYPE.WARNING, LANG.TEXT_IMPORTED_WARNING, 'danger');
    }

    _toggle() {
        this.setState({ collapseToolbox: !this.state.collapseToolbox });
    }

    _renderAdditionalMenuButtons() {
        let additionalButtons = null;
        if(!localStorageController.getAutoSave()) {
            additionalButtons = [
                <HomeMenuButton key='1' action={() => this._handleSaveButtonAction()} icon={ICONS_TYPE.SAVE} text={LANG.SAVE} />,
                <HomeMenuButton key='2' action={() => this._handleLoadButtonAction()} icon={ICONS_TYPE.LOAD} text={LANG.LOAD} />,
                <HomeMenuButton key='3' action={() => this._handleExportButtonAction()} icon={ICONS_TYPE.UPLOAD} text={LANG.EXPORT} />,
                <ImportFile key='4' onChange={(event) => this._handleImportButtonAction(event)} icon={ICONS_TYPE.DOWNLOAD} text={LANG.IMPORT} />,
                <HomeMenuButton key='5' action={() => this._toggle()} icon={ICONS_TYPE.TOOLBOX} text={LANG.TOGGLE_TOOLBOX} />
            ];
        }
        return additionalButtons;
    }

    _setCurrentText(currentText) {
        this.setState({currentText: currentText});
    }

    _getSelectedText() {
        const start = this.textArea.selectionStart;
        const end = this.textArea.selectionEnd;
        return {start, end};
    }

    _closeAllEditMenu() {
        this.setState({
            collapseMainEditButtons: !this.state.collapseMainEditButtons,
            collapseToolbox: false
        });
    }

    _getHomeAlert() {
        return <HomeAlert
            text={this.state.alertText}
            color={this.state.alertColor}
            onAlertDismiss={() => this.setState({ displayAlert: false })}
            displayAlert={this.state.displayAlert}
        />;
    }

    _getPreviewAlert() {
        return <Preview
            text={this.parseBBcodeText}
            onAlertDismiss={() => this.setState({ displayPreview: false })}
            displayAlert={this.state.displayPreview}
        />;
    }

    render() {
        const alert = this.state.displayAlert ? this._getHomeAlert() : null ;
        const preview = this.state.displayPreview ? this._getPreviewAlert() : null;

        return(
            <Container fluid={true}>
                <Row className='mb-2'>
                    <Col>
                        <HomeMenu
                            previewAction={() => this._handlePreviewButtonAction()}
                            copyAction={(event) => this._handleCopyButtonAction(event)}
                            additionals={this._renderAdditionalMenuButtons()}
                            isOpen={this.state.collapseMainEditButtons}
                            toggleButtons={() => this._closeAllEditMenu()}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <GuiToolbox
                            isOpen={this.state.collapseToolbox}
                            className='mb-3'
                            currentText={this.state.currentText}
                            getSelectedText={() => this._getSelectedText()}
                            setCurrentText={(text) => this._setCurrentText(text)}
                        />
                    </Col>
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

