import React from 'react';
import { Col, Button, Collapse, Card, CardBody, Navbar, NavbarToggler, Nav, Alert } from 'reactstrap';
import Icon from './IconElement';
import LangController from '../../lang/langController';
import ICONS_TYPE from '../iconsType.json';
const LANG = LangController.getDefaultLang();

export const Preview = (props) =>
    <Col className="preview-content no-margin">
        <Alert color={"preview"} isOpen={props.displayAlert} toggle={props.onAlertDismiss}>
            <div dangerouslySetInnerHTML={{__html: props.text}}></div>
        </Alert>
    </Col>;

export const HomeTextArea = (props) =>
    <Col id="texarea-wrapper">
        <textarea id="bbcode-text" placeholder={props.placeholder} onChange={props.onChange} ref={(textarea) => props.onRef(textarea)} value={props.value} />
    </Col>;

export const HomeMenuButton = (props) =>
    <Button color="primary" onClick={props.action} className={`mr-2 mt-2 home-button${props.className ? ' ' + props.className : ''}`}>
        <Icon icon={props.icon}/>
        <span className={"home-button-text"}>{props.text}</span>
    </Button>;

export const HomeMenu = (props) =>
    <div>
       <div className="important-buttons">
            <HomeMenuButton action={props.previewAction} icon={"bullseye"} text={"Preview"} />
            <HomeMenuButton action={props.copyAction} icon={"copy"} text={"Copy"} />
            <HomeMenuButton action={props.toggleButtons} icon={ICONS_TYPE.MORE} text={LANG.MORE} className={"d-md-none home-menu-more-btn"} />
       </div>
        <Collapse isOpen={props.isOpen} className="mr-3 main-edit-menu">
            {props.additionals}
        </Collapse>
    </div>;

export const ImportFile = (props) =>
    <label className="custom-file-upload mt-2 mr-2 btn btn-primary mb-0 home-button">
        <Icon icon={props.icon}/><input type="file" accept="text/plain" onChange={(event) => props.onChange(event)}/>
        <span className={"home-button-text"}>{props.text}</span>
    </label>;


export const GuiToolbox = (props) =>
    <Col>
        <Collapse isOpen={props.isOpen} className={props.className}>
            <Card>
              <CardBody>
                  Here will be GUI tools
              </CardBody>
            </Card>
        </Collapse>
    </Col>;

