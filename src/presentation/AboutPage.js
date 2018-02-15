import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const AboutPageLink = (props) => {
    return (<a className="d-block mt-2" href={props.href} target="_blank">{props.text}</a>);
};

const HeaderAboutPage = (props) => {
    return(<Col xs="12"><h2>{props.text}</h2></Col>);
};

const DescriptionAboutPage = (props) => {
    const link = props.linkText? <AboutPageLink text={props.linkText} href={props.href} /> : null;
    return(<Col xs="12">{props.text}{link}</Col>);
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

const SyntaxTextHelpElement = (props) =>
    <Row className="syntax-desc">
        <Col xs="6"><span className={props.className}>{props.text}</span></Col>
        <Col xs="6">{props.tagOpen} {props.text} {props.tagClose}</Col>
    </Row>;

const AboutPage = () => {
    return (
            <Container>
                <ModuleAbout
                    header="What is beStar?"
                    linkText="Clik here for full beStar sources."
                    href="https://github.com/NdV66/beStarOnline"
                    text={[ <span key="1">It is a simple tool to create a text using BBcode.</span>, <br key="5" />, <span key="1.1">You can see your changes and finished work using "Preview" button on the top of Home Page.</span>
                    ]} />
                <ModuleAbout
                    header="Ok, so what is BBcode?"
                    linkText="Clik here for more information about BBcode."
                    href="https://en.wikipedia.org/wiki/BBCode"
                    text={[<span key="1">It's a very useful markup language. It can be using for creating post or messages.</span>, <span key="3">The BBcode was created in 1998 and implemented in Perl.</span>]} />
                <ModuleAbout
                    header="What is the syntax of BBcode (on this site)?"
                    text={[
                            <h5>Base syntax</h5>,
                            <SyntaxTextHelpElement text={"Syntax for strong text"} className={"bb-strong"} tagOpen={"[b]"} tagClose={"[/b]"} />,
                            <SyntaxTextHelpElement text={"Syntax for italic text"} className={"bb-italic"} tagOpen={"[i]"} tagClose={"[/i]"} />,
                            <SyntaxTextHelpElement text={"Syntax for underlined text"} className={"bb-underlined"} tagOpen={"[u]"} tagClose={"[/u]"} />,
                            <SyntaxTextHelpElement text={"Syntax for strikethrough text"} className={"bb-strikethrough"} tagOpen={"[s]"} tagClose={"[/s]"} />,
                            <h5>Advanced syntax</h5>,
                            <div>in progress :) </div>
                        ]}
                        />

                <ModuleAbout
                    header="What about beStar license?"
                    linkText="Clik here for more information about MIT License."
                    href="https://opensource.org/licenses/MIT"
                    text={[<span key="1">beStar is under MIT License, so you can use it for free, even in commercial projects.</span>]} />

            </Container>
            );
};

export default AboutPage;


//                            <div key="5">[code] <code>some code here</code> [/code]</div>,
//                            <div key="6">[url] <a href="https://google.com">https://google.com</a> [/url]</div>,
//                            <div key="7">[url="https://google.com"] <a href="https://google.com">Description link</a> [/url]</div>,
//                            <div key="7">[img]image url[/img]<img src="../images/bStar.jpeg" className="img-fluid" /></div>,
