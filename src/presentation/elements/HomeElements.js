import React from 'react';
import { Col, Button, Collapse, Card, CardBody, Navbar, NavbarToggler, Nav, Alert } from 'reactstrap';
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
    <div>
        <Navbar key="7" color="faded" light expand="sm" className="custom-toggler d-inline-block main-edit-menu mt-3 mr-3 btn btn-primary mb-0">
            <NavbarToggler onClick={props.toggleButtons} />
            <Collapse isOpen={props.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    {props.additionals}
                </Nav>
            </Collapse>
        </Navbar>
        <div className="d-inline-block">
            <HomeMenuButton action={props.previewAction} icon={"bullseye"} text={"Preview"} />
            <HomeMenuButton action={props.copyAction} icon={"copy"} text={"Copy"} />
        </div>
    </div>;

export const ImportFile = (props) =>
    <label className="custom-file-upload mt-3 mr-3 btn btn-primary mb-0">
        <Icon icon={props.icon}/><input type="file" accept="text/plain" onChange={(event) => props.onChange(event)}/>{props.text}
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

