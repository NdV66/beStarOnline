import {assert} from 'chai';
import BBCodeInterpreter from '../src/lib/BBcode-interpreter';

const _createExpectedHtml = (cssClassPostfix, text) =>
    `<div><div class="bb-${cssClassPostfix} bb-display-inline">${text || cssClassPostfix}</div></div>`;

describe('BBCodeInterpreter', () =>  {
    describe('# Flat bb code structure', () => {
        it('## should parse italic', () => {
            //given
            const bbCodeText = '[i]italic[/i]';
            const htmlText = _createExpectedHtml('italic');
            //when
            const result = BBCodeInterpreter.decodeToHTML(bbCodeText);
            //then
            assert.equal(htmlText, result.toString());
        });

        it('## should parse strong/bold', () => {
            //given
            const bbCodeText = '[b]strong[/b]';
            const htmlText = _createExpectedHtml('strong');
            //when
            const result = BBCodeInterpreter.decodeToHTML(bbCodeText);
            //then
            assert.equal(htmlText, result.toString());
        });

        it('## should parse stars', () => {
            //given
            const bbCodeText = '*star*';
            const htmlText = _createExpectedHtml('star');
            //when
            const result = BBCodeInterpreter.decodeToHTML(bbCodeText);
            //then
            assert.equal(htmlText, result.toString());
        });


        it('## should parse underline', () => {
            //given
            const bbCodeText = '[u]underlined[/u]';
            const htmlText = _createExpectedHtml('underlined');
            //when
            const result = BBCodeInterpreter.decodeToHTML(bbCodeText);
            //then
            assert.equal(htmlText, result.toString());
        });

        it('## should parse strikethrough', () => {
            //given
            const bbCodeText = '[s]strikethrough[/s]';
            const htmlText = _createExpectedHtml('strikethrough');
            //when
            const result = BBCodeInterpreter.decodeToHTML(bbCodeText);
            //then
            assert.equal(htmlText, result.toString());
        });

        it('## should parse code', () => {
            //given
            const bbCodeText = '[code]code[/code]';
            const htmlText = '<div><code>code</code></div>';
            //when
            const result = BBCodeInterpreter.decodeToHTML(bbCodeText);
            //then
            assert.equal(htmlText, result.toString());
        });

        it('## should parse qoute', () => {
            //given
            const bbCodeText = '[quote]quote[/quote]';
            const htmlText = '<div><blockquote><p>quote</p></blockquote></div>';
            //when
            const result = BBCodeInterpreter.decodeToHTML(bbCodeText);
            //then
            assert.equal(htmlText, result.toString());
        });


        it('## should parse table', () => {
            //given
            const bbCodeText = '[table][tr][th]header[/th][/tr][tr][td]body[/td][/tr][/table]';
            const htmlText = '<div><table><tr><th>header</th></tr><tr><td>body</td></tr></table></div>';
            //when
            const result = BBCodeInterpreter.decodeToHTML(bbCodeText);
            //then
            assert.equal(htmlText, result.toString());
        });

        it('## should parse link without description', () => {
            //given
            const bbCodeText = '[url]link[/url]';
            const htmlText = '<div><a href="link">link</a></div>';
            //when
            const result = BBCodeInterpreter.decodeToHTML(bbCodeText);
            //then
            assert.equal(htmlText, result.toString());
        });

        it('## should parse link with description', () => {
            //given
            const bbCodeText = '[url="link"]description[/url]';
            const htmlText = '<div><a href="link">description</a></div>';
            //when
            const result = BBCodeInterpreter.decodeToHTML(bbCodeText);
            //then
            assert.equal(htmlText, result.toString());
        });

        it('## should parse image', () => {
            //given
            const bbCodeText = '[img]imgUrl[/img]';
            const htmlText = '<div><img src="imgUrl" /></div>';
            //when
            const result = BBCodeInterpreter.decodeToHTML(bbCodeText);
            //then
            assert.equal(htmlText, result.toString());
        });
    });

});
