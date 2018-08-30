import {assert} from 'chai';
import BBCodeInterpreter from '../src/lib/BBcode-interpreter';
import {TEST_UTILS} from '../testUtils/testUtils';

const _testNegativeCaseSimple = (bbCodeText, text) => {
    TEST_UTILS.testCaseSimple(bbCodeText, text, assert.notEqual);
};

const _testNegativeCaseComplicated = (bbCodeText, htmlText) => {
    TEST_UTILS.testCaseComplicated(bbCodeText, htmlText, assert.notEqual);
};

describe('BBCodeInterpreter - NEGATIVE CASES', () =>  {
    describe('# Flat bb code structure', () => {
        describe('## shouldn\'t parse italic', () => {
            it('### incorrectly end of the sentence', () => {
                const bbCodeText = '[i]italic[i]';
                _testNegativeCaseSimple(bbCodeText, 'italic');
            });

            it('### incorrectly start of the sentence', () => {
                const bbCodeText = '[/i]italic[i]';
                _testNegativeCaseSimple(bbCodeText, 'italic');
            });
        });


        describe('## shouldn\'t parse bold', () => {
            it('## incorrectly end of the sentence', () => {
                const bbCodeText = '[b]strong[b]';
                _testNegativeCaseSimple(bbCodeText, 'strong');
            });

            it('### incorrectly start of the sentence', () => {
                const bbCodeText = '[/b]strong[b]';
                _testNegativeCaseSimple(bbCodeText, 'strong');
            });
        });

        describe('## shouldn\'t parse stars', () => {
            it('## incorrectly end of the sentence', () => {
                const bbCodeText = '*stars';
                _testNegativeCaseSimple(bbCodeText, 'stars');
            });

            it('### incorrectly start of the sentence', () => {
                const bbCodeText = 'stars*';
                _testNegativeCaseSimple(bbCodeText, 'stars');
            });
        });

        describe('## shouldn\'t parse underlined', () => {
            it('## incorrectly end of the sentence', () => {
                const bbCodeText = '[u]underlined[u]';
                _testNegativeCaseSimple(bbCodeText, 'underlined');
            });

            it('### incorrectly start of the sentence', () => {
                const bbCodeText = '[*u]underlined[/u]';
                _testNegativeCaseSimple(bbCodeText, 'underlined');
            });
        });

        describe('## shouldn\'t parse strikethrough', () => {
            it('## incorrectly end of the sentence', () => {
                const bbCodeText = '[s]strikethrough[s]';
                _testNegativeCaseSimple(bbCodeText, 'strikethrough');
            });

            it('### incorrectly start of the sentence', () => {
                const bbCodeText = '[*s]strikethrough[/s]';
                _testNegativeCaseSimple(bbCodeText, 'strikethrough');
            });
        });

        describe('## shouldn\'t parse code', () => {
            const htmlText = TEST_UTILS.getCodeHtml('code');
            it('## incorrectly end of the sentence', () => {
                const bbCodeText = '[code]code[code]';
                _testNegativeCaseComplicated(bbCodeText, htmlText);
            });

            it('### incorrectly start of the sentence', () => {
                const bbCodeText = '[/code]code[code]';
                _testNegativeCaseComplicated(bbCodeText, htmlText);
            });
        });

        describe('## shouldn\'t parse qoute', () => {
            const htmlText = TEST_UTILS.getQuoteHtml('quote');
            it('## incorrectly end of the sentence', () => {
                const bbCodeText = '[quote]quote[a/quote]';
                _testNegativeCaseComplicated(bbCodeText, htmlText);
            });

            it('### incorrectly start of the sentence', () => {
                const bbCodeText = '[aquote]quote[/quote]';
                _testNegativeCaseComplicated(bbCodeText, htmlText);
            });
        });

        describe('## shouldn\'t parse table', () => {
            const htmlText = TEST_UTILS.getFullTableHtml('header', 'body');
            it('## incorrectly end of the sentence', () => {
                const bbCodeText = '[table][tr][th]header[/th][/tr][tr][td]body[/td][/tr][/tsable]';
                _testNegativeCaseComplicated(bbCodeText, htmlText);
            });

            it('### incorrectly start of the sentence', () => {
                const bbCodeText = '[tableaa][tr][th]header[/th][/tr][tr][td]body[/td][/tr][/aatable]';
                _testNegativeCaseComplicated(bbCodeText, htmlText);
            });
        });

        describe('## shouldn\'t parse link without description', () => {
            const htmlText = TEST_UTILS.getLinkWithoutDescHtml('link');
            it('## incorrectly end of the sentence', () => {
                const bbCodeText = '[url]link[/uarl]';
                _testNegativeCaseComplicated(bbCodeText, htmlText);
            });

            it('### incorrectly start of the sentence', () => {
                const bbCodeText = '[uarl]link[/url]';
                _testNegativeCaseComplicated(bbCodeText, htmlText);
            });
        });

        describe('## shouldn\'t parse link with description', () => {
            const htmlText = TEST_UTILS.getLinktWithDescHtml('link', 'description');
            it('## incorrectly end of the sentence', () => {
                const bbCodeText = '[url="link"]description[/uarl]';
                _testNegativeCaseComplicated(bbCodeText, htmlText);
            });

            it('### incorrectly start of the sentence', () => {
                const bbCodeText = '[uaaarl="link"]description[/url]';
                _testNegativeCaseComplicated(bbCodeText, htmlText);
            });
        });

        describe('## shouldn\'t parse image', () => {
            const htmlText = TEST_UTILS.getImageHtml('imgUrl');
            it('## incorrectly end of the sentence', () => {
                const bbCodeText = '[img]imgUrl[/imag]';
                _testNegativeCaseComplicated(bbCodeText, htmlText);
            });

            it('### incorrectly start of the sentence', () => {
                const bbCodeText = '[iaAmg]imgUrl[/img]';
                _testNegativeCaseComplicated(bbCodeText, htmlText);
            });
        });
    });
});
