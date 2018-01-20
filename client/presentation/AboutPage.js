import React from 'react';
import {
    Container,
    Row,
    Col } from 'reactstrap';

const ModuleAbout = (props) => {
    const AboutPageLink = (props) => {
        return (<a className="d-block mt-2" href="{props.href}" target="_blank">{props.text}</a>);
    };

    const HeaderAboutPage = (props) => {
        return(<Col xs="12"><h2>{props.text}</h2></Col>);
    };

    const DescriptionAboutPage = (props) => {
        return(<Col xs="12">{props.text}<AboutPageLink text={props.linkText} href={props.href} /></Col>);
    };

    return(
            <div>
                <HeaderAboutPage text={props.header} />
                <DescriptionAboutPage
                    linkText={props.linkText}
                    href={props.href}
                    text={props.text} />
            </div>
            );
};

const AboutPage = () => {
    return (
            <Container>
                <Row>
                    <ModuleAbout
                        header="What is beStar?"
                        linkText="Clik here for full beStar sources."
                        href="#"
                        text={
                        < span > It is a simple tool to create a text using BBcode.
                        You can see your changes and finished work.<br />
                        beStar is a module implemented using JavaScript.<br /> < /span>} />

                    <ModuleAbout
                        header="Ok, so what is BBcode?"
                        linkText="Clik here for more information about BBcode."
                        href="https://en.wikipedia.org/wiki/BBCode"
                        text={
                        < span >It's a very useful markup language.
                        It can be using for creating post or messages. <br />
                        The BBcode was created in 1998 and implemented in Perl. < /span>} />

                    <ModuleAbout
                        header="What about beStar license?"
                        linkText="Clik here for more information about MIT License."
                        href="#"
                        text={
                        < span >beStar is under MIT License, so you can use it for free, even in commercial projects.< /span>} />
                </Row>
            </Container>
            );
};

export default AboutPage;