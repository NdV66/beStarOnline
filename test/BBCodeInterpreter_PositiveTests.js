import {assert} from 'chai';
import {TEST_UTILS} from '../testUtils/testUtils';

const _testPositiveCaseSimple = (bbCodeText, text) => {
    TEST_UTILS.testCaseSimple(bbCodeText, text, assert.equal);
};

const _testPositiveCaseComplicated = (bbCodeText, htmlText) => {
    TEST_UTILS.testCaseComplicated(bbCodeText, htmlText, assert.equal);
};

describe('BBCodeInterpreter - POSTIVE CASES', () =>  {
    describe('# Flat bb code structure', () => {
        it('## should parse italic', () => {
            const bbCodeText = '[i]italic[/i]';
            _testPositiveCaseSimple(bbCodeText, 'italic');
        });

        it('## should parse strong/bold', () => {
            const bbCodeText = '[b]strong[/b]';
            _testPositiveCaseSimple(bbCodeText, 'strong');
        });

        it('## should parse stars', () => {
            const bbCodeText = '*star*';
            _testPositiveCaseSimple(bbCodeText, 'star');
        });
        it('## should parse underline', () => {
            const bbCodeText = '[u]underlined[/u]';
            _testPositiveCaseSimple(bbCodeText, 'underlined');
        });

        it('## should parse strikethrough', () => {
            const bbCodeText = '[s]strikethrough[/s]';
            _testPositiveCaseSimple(bbCodeText, 'strikethrough');
        });

        it('## should parse code', () => {
            const bbCodeText = '[code]code[/code]';
            _testPositiveCaseComplicated(bbCodeText, TEST_UTILS.getCodeHtml('code'));
        });

        it('## should parse qoute', () => {
            const bbCodeText = '[quote]quote[/quote]';
            _testPositiveCaseComplicated(bbCodeText, TEST_UTILS.getQuoteHtml('quote'));
        });

        it('## should parse table', () => {
            const bbCodeText = '[table][tr][th]header[/th][/tr][tr][td]body[/td][/tr][/table]';
            _testPositiveCaseComplicated(bbCodeText, TEST_UTILS.getFullTableHtml('header', 'body'));
        });

        it('## should parse link without description', () => {
            const bbCodeText = '[url]link[/url]';
            _testPositiveCaseComplicated(bbCodeText, TEST_UTILS.getLinkWithoutDescHtml('link'));
        });

        it('## should parse link with description', () => {
            const bbCodeText = '[url="link"]description[/url]';
            _testPositiveCaseComplicated(bbCodeText, TEST_UTILS.getLinktWithDescHtml('link', 'description'));
        });

        it('## should parse image', () => {
            const bbCodeText = '[img]imgUrl[/img]';
            _testPositiveCaseComplicated(bbCodeText, TEST_UTILS.getImageHtml('imgUrl'));
        });
    });

    describe('# More complicated bb code structure', () => {
        it('## should parse italic inside stars', () => {
            const bbCodeText = '*[i]italic[/i]*';
            const htmlText = '<div><div class="bb-star bb-display-inline"><div class="bb-italic bb-display-inline">italic</div><div class="bb-star bb-display-inline"></div>';
            _testPositiveCaseComplicated(bbCodeText, htmlText);
        });


        it('## should parse underined strikethrough inside strong', () => {
            const bbCodeText = '[b][u][s]test[/s][/u][/b]';
            const htmlText = '<div><div class="bb-strong bb-display-inline"><div class="bb-underlined bb-display-inline"><div class="bb-strikethrough bb-display-inline">test</div></div></div></div>';
            _testPositiveCaseComplicated(bbCodeText, htmlText);
        });


        it('## should parse short fragment of RPG game', () => {
            const bbCodeText = '-Hi! *said Narin. [i]I like games[/i], he throught.*';
            const htmlText = '<div>-Hi! </div>said Narin. <div class="bb-italic bb-display-inline">I like games</div>, he throught.</div></div>';
            _testPositiveCaseComplicated(bbCodeText, htmlText);
        });
    });
});
