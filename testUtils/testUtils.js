import BBCodeInterpreter from '../src/lib/BBcode-interpreter';

const createExpectedHtml = (cssClassPostfix, text) =>
    `<div><div class="bb-${cssClassPostfix} bb-display-inline">${text || cssClassPostfix}</div></div>`;

const testCaseSimple = (bbCodeText, text, assertMethod) => {
    //given
    const _bbCodeText = bbCodeText;
    const htmlText = createExpectedHtml(text);
    //when
    const result = BBCodeInterpreter.decodeToHTML(bbCodeText);
    //then
    assertMethod(htmlText, result.toString());
};

const testCaseComplicated = (bbCodeText, htmlText, assertMethod) => {
    //given
    const _bbCodeText = bbCodeText;
    const _htmlText = htmlText;
    //when
    const result = BBCodeInterpreter.decodeToHTML(_bbCodeText);
    //then
    assertMethod(htmlText, result.toString());
};

const getFullTableHtml = (header, body) => `<div><table><tr><th>${header}</th></tr><tr><td>${body || header}</td></tr></table></div>`;
const getCodeHtml = (text) => `<div><code>${text}</code></div>`;
const getQuoteHtml = (text) => `<div><blockquote><p>${text}</p></blockquote></div>`;
const getLinkWithoutDescHtml = (link) => `<div><a href="${link}">${link}</a></div>`;
const getLinktWithDescHtml = (link, text) => `<div><a href="${link}">${text}</a></div>`;
const getImageHtml = (src) => `<div><img src="${src}" /></div>`;

export const TEST_UTILS = {
    testCaseSimple,
    testCaseComplicated,
    getCodeHtml,
    getQuoteHtml,
    getLinkWithoutDescHtml,
    getFullTableHtml,
    getLinktWithDescHtml,
    getImageHtml,
};
