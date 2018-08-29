import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import LangController from '../lang/langController';

const LANG = LangController.getDefaultLang();

const AboutPageLink = (props) =>
    <a className='d-block mt-2' href={props.href} target='_blank'>
        {props.text}
    </a>;

const HeaderAboutPage = (props) =>
    <Col xs='12'>
        <h2>
            {props.text}
        </h2>
    </Col>;


const DescriptionAboutPage = (props) => {
    const link = props.linkText? <AboutPageLink text={props.linkText} href={props.href} /> : null;
    const text = props.noTextHtml ? <div>{props.text}</div> : <span dangerouslySetInnerHTML={{__html: props.text}}></span>;
    return <Col xs='12'>
        {text}
        {link}
    </Col>;
};

const ModuleAbout = (props) =>
    <Row>
        <HeaderAboutPage text={props.header} />
        <DescriptionAboutPage
            linkText={props.linkText}
            href={props.href}
            text={props.text}
            noTextHtml={props.noTextHtml}
        />
    </Row>;

const SyntaxTextHelpElement = (props) =>
    <Row className='syntax-desc'>
        <Col xs='6'>
            <span className={props.className}>
                {props.text}
            </span>
        </Col>
        <Col xs='6'>
            {props.tagOpen}
            {props.text}
            {props.tagClose}
        </Col>
    </Row>;

const AboutPage = () =>
    <Container>
        <ModuleAbout
            header={LANG.WHAT_IS_BE_STAR_TITLE}
            linkText={LANG.WHAT_IS_BE_STAR_LINK_TEXT}
            href={LANG.WHAT_IS_BE_STAR_SOURCE_LINK}
            text={LANG.WHAT_IS_BE_STAR}
        />
        <ModuleAbout
            header={LANG.WHAT_IS_BB_TITLE}
            linkText={LANG.WHAT_IS_BB_LINK_TEXT}
            href={LANG.WHAT_IS_BB_LINK}
            text={LANG.WHAT_IS_BB}
        />
        <ModuleAbout
            header={LANG.SYNTAX_TITLE}
            noTextHtml={true}
            text={[
                <SyntaxTextHelpElement text={'Syntax for strong text'} className={'bb-strong'} tagOpen={'[b]'} tagClose={'[/b]'} />,
                <SyntaxTextHelpElement text={'Syntax for italic text'} className={'bb-italic'} tagOpen={'[i]'} tagClose={'[/i]'} />,
                <SyntaxTextHelpElement text={'Syntax for underlined text'} className={'bb-underlined'} tagOpen={'[u]'} tagClose={'[/u]'} />,
                <SyntaxTextHelpElement text={'Syntax for strikethrough text'} className={'bb-strikethrough'} tagOpen={'[s]'} tagClose={'[/s]'} />,
            ]}
        />
        <ModuleAbout
            header={LANG.LICENSE_TITLE}
            linkText={LANG.LICENSE_LINK_TEXT}
            href={LANG.LICENSE_LINK}
            text={LANG.LICENSE}
        />
    </Container>;


export default AboutPage;
