import React from 'react';
import { Col, Button, Collapse, Alert } from 'reactstrap';
import Icon from './IconElement';
import ICONS_TYPE from '../iconsType.json';
import { UTIL } from '../utils';
import BBcodeInterpeter from '../../lib/BBcode-interpreter';
import LangController from '../../lang/langController';

const LANG = LangController.getDefaultLang();
const REGEXPS_TO_DETECT_BB_CODE = BBcodeInterpeter.getRegexpsToDetectType();

export const Preview = (props) =>
    <Col className='preview-content no-margin'>
        <Alert color={'preview'} isOpen={props.displayAlert} toggle={props.onAlertDismiss}>
            <div dangerouslySetInnerHTML={{__html: props.text}}></div>
        </Alert>
    </Col>;

export const HomeTextArea = (props) =>
    <Col id='texarea-wrapper'>
        <textarea
            id='bbcode-text'
            placeholder={props.placeholder}
            onChange={props.onChange}
            ref={(textarea) => props.onRef(textarea)}
            value={props.value}
        />
    </Col>;

export const HomeMenuButton = (props) =>
    <Button color='primary' onClick={props.action} className={`mr-2 mt-2 home-button${UTIL.addClassIfNotEmpty(props)}`}>
        <Icon icon={props.icon}/>
        <span className={'home-button-text'}>{props.text}</span>
    </Button>;

export const HomeMenu = (props) =>
    <div>
        <div className='important-buttons'>
            <HomeMenuButton action={props.previewAction} icon={'bullseye'} text={LANG.PREVIEW} />
            <HomeMenuButton action={props.copyAction} icon={'copy'} text={LANG.COPY} />
            <HomeMenuButton action={props.toggleButtons} icon={ICONS_TYPE.MORE} text={LANG.MORE} className={'d-md-none home-menu-more-btn'} />
        </div>
        <Collapse isOpen={props.isOpen} className='mr-3 main-edit-menu'>
            {props.additionals}
        </Collapse>
    </div>;

export const ImportFile = (props) =>
    <label className='custom-file-upload mt-2 mr-2 btn btn-primary mb-0 home-button'>
        <Icon icon={props.icon}/><input type='file' accept='text/plain' onChange={(event) => props.onChange(event)}/>
        <span className={'home-button-text'}>{props.text}</span>
    </label>;


export class GuiToolbox extends React.Component {
    constructor(props) {
        super(props);
    }

    _easyReplaceSelection(startSymbol, endSymbol, regexpToDetect) {
        const {start, end} = this.props.getSelectedText();
        let currentText = this.props.currentText;
        const selected = currentText.substring(start, end);
        currentText = this._isSelectedMatch(selected, regexpToDetect) ?
            this._replaceAllText(currentText, startSymbol, endSymbol) : this._replaceSelected(currentText, startSymbol, selected, endSymbol);
        this.props.setCurrentText(currentText);
    }

    _replaceSelected(currentText, startSymbol, selected, endSymbol) {
        return currentText.replace(selected, `${startSymbol}${selected}${endSymbol}`);
    }

    _replaceAllText(currentText, startSymbol, endSymbol) {
        return currentText.replace(startSymbol, '').replace(endSymbol, '');
    }

    _isSelectedMatch(selected, regexpToDetect) {
        return selected.match(regexpToDetect);
    }

    _replaceStars() {
        this._easyReplaceSelection('*', '*', REGEXPS_TO_DETECT_BB_CODE.stars);
    }

    _replaceItalic() {
        this._easyReplaceSelection('[i]', '[/i]', REGEXPS_TO_DETECT_BB_CODE.italic);
    }

    _replaceBold() {
        this._easyReplaceSelection('[b]', '[/b]', REGEXPS_TO_DETECT_BB_CODE.bold);
    }

    _replaceUnderline() {
        this._easyReplaceSelection('[u]', '[/u]', REGEXPS_TO_DETECT_BB_CODE.underline);
    }

    _replaceStrikethrough() {
        this._easyReplaceSelection('[s]', '[/s]', REGEXPS_TO_DETECT_BB_CODE.strikethrough);
    }

    render() {
        return (
            <Collapse isOpen={this.props.isOpen} className={`gui-edit-buttons${UTIL.addClassIfNotEmpty(this.props)}`}>
                <HomeMenuButton
                    action={() => this._replaceItalic()}
                    icon={ICONS_TYPE.ITALIC}
                    text={LANG.ITALIC}
                />
                <HomeMenuButton
                    action={() => this._replaceBold()}
                    icon={ICONS_TYPE.BOLD}
                    text={LANG.BOLD}
                />
                <HomeMenuButton
                    action={() => this._replaceStars()}
                    icon={ICONS_TYPE.STAR}
                    text={LANG.STARS}
                />
                <HomeMenuButton
                    action={() => this._replaceUnderline()}
                    icon={ICONS_TYPE.UNDERLINE}
                    text={LANG.UNDERLINE}

                />
                <HomeMenuButton
                    action={() => this._replaceStrikethrough()}
                    icon={ICONS_TYPE.STRIKETHROUGH}
                    text={LANG.STRIKETHROUGH}
                />
            </Collapse>);
    }
}
