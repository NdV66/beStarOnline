import React from 'react';
import { Col, Alert, Button } from 'reactstrap';
import Icon from './IconElement';

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
    <Button color="primary" onClick={props.action} className="mr-3 mt-3"><Icon icon={props.icon}/>{props.text}</Button>;

export const HomeMenu = (props) =>
    <Col>
        <HomeMenuButton action={props.previewAction} icon={"magnifier"} text={"Preview"} />
        <HomeMenuButton action={props.copyAction} icon={"copy"} text={"Copy"} />
        {props.additionals}
    </Col>;
