import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const AboutPageLink = (props) => {
    return (<a className="d-block mt-2" href={props.href} target="_blank">{props.text}</a>);
};

const HeaderAboutPage = (props) => {
    return(<Col xs="12"><h2>{props.text}</h2></Col>);
};

const DescriptionAboutPage = (props) => {
    return(<Col xs="12">{props.text}<AboutPageLink text={props.linkText} href={props.href} /></Col>);
};

const ModuleAbout = (props) => {
    return(
        <Row>
            <HeaderAboutPage text={props.header} />
            <DescriptionAboutPage
                linkText={props.linkText}
                href={props.href}
                text={props.text} />
        </Row>
        );
};

const AboutPage = () => {
    return (
            <Container>
                <ModuleAbout
                    header="What is beStar?"
                    linkText="Clik here for full beStar sources."
                    href="https://github.com/NdV66/beStarOnline"
                    text={[ <span key="1">It is a simple tool to create a text using BBcode.</span>, <br key="5" />,
                            <span key="1.1">You can see your changes and finished work using "Preview" button on the top of Home Page.</span>, <br key="2"/>,
                            <span key="3">beStar is based on a module implemented using JavaScript.</span>, <br key="6" />,
                            <span key="4">In the future will be an option to save you work (automatic or not) in localstorage and to choose a font size etc.</span>
                    ]} />

                <ModuleAbout
                    header="Ok, so what is BBcode?"
                    linkText="Clik here for more information about BBcode."
                    href="https://en.wikipedia.org/wiki/BBCode"
                    text={[<span key="1">It's a very useful markup language. It can be using for creating post or messages.</span>, <br key="2" />, <span key="3">The BBcode was created in 1998 and implemented in Perl.</span>]} />

                <ModuleAbout
                    header="What is the base syntax of BBcode (on this site)?"
                    text={[<span key="1">Comming soon :)</span>]} />

                <ModuleAbout
                    header="What about beStar license?"
                    linkText="Clik here for more information about MIT License."
                    href="https://opensource.org/licenses/MIT"
                    text={[<span key="1">beStar is under MIT License, so you can use it for free, even in commercial projects.</span>]} />

            </Container>
            );
};

export default AboutPage;
