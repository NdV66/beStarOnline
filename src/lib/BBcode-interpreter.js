let _bbText = '';
const BASE_HTML_ELEMENT_TYPE = 'div';
const REGEXPS_TO_DETECT_TYPE = {
    italic: /^\[i\](.*?)\[\/i\]$/,
    bold: /^\[b\](.*?)\[\/b\]$/,
    stars: /^\*(.*?)\*$/,
    underline: /^\[u\](.*?)\[\/u\]$/,
    strikethrough: /^\[s\](.*?)\[\/s\]$/
};

const _simpleReplace = (startRegexp, endRegexp, cssClass) => {
    return () => {
        const classTag = 'class';
        let bbText = _bbText;
        bbText = bbText.replace(startRegexp, `<${BASE_HTML_ELEMENT_TYPE} ${classTag}="${cssClass} bb-display-inline">`);
        bbText = bbText.replace(endRegexp, `</${BASE_HTML_ELEMENT_TYPE}>`);
        bbText && ( _bbText = bbText);
    };
};

const createHTMLelement = (regexp, callback) => {
    const links = _bbText.match(regexp);
    links && links.forEach(link => callback(link));
};

const decodeToHTML = (_bbTextRef) => {
    _bbText = _bbTextRef;
    _bbText = _bbText.replace(/\r|\n/g, '</br>');

    for (const key in SIMPLE_SYMBOLS_PARSER) {
        SIMPLE_SYMBOLS_PARSER[key]();
    }

    return `<${BASE_HTML_ELEMENT_TYPE}>${_bbText}</${BASE_HTML_ELEMENT_TYPE}>`;
};

const _parseCode =  () => {
    let bbText = _bbText;
    bbText = bbText.replace(/\[code\]/g, '<code>');
    bbText = bbText.replace(/\[\/code\]/g, '</code>');
    bbText && ( _bbText = bbText);
};

const _parseHref = (link) => {
    let newLink = link.replace(/\[\/url\]/, '</a>');
    newLink = newLink.replace(/\[\url\]/, `<a href="${link.substring(5, link.length - 6)}">`);
    const bbText = _bbText.replace(link, newLink);
    bbText && ( _bbText = bbText);
};

const _parseDescHref = (link) => {
    const linkName = link.match(/\](.*?)\[/);
    const linkHref = link.match(/\="(.*?)"/);
    const bbText = _bbText.replace(link, `<a href="${linkHref[1]}">${linkName[1]}</a>`);
    bbText && ( _bbText = bbText);
};

const _parseLinks = () => {
    const PATTERNS = {
        href: {
            pattern: /\[url\](.*?)\[\/url\]/g,
            parse: _parseHref,
        },
        descHref: {
            pattern: /\[url\=\"(.*?)\"\](.*?)\[\/url\]/g,
            parse: _parseDescHref,
        }
    };

    for (const key in PATTERNS) {
        createHTMLelement(PATTERNS[key].pattern, PATTERNS[key].parse);
    }
};

const _parseImage = () => {
    createHTMLelement(/\[img\](.*?)\[\/img\]/g, function (link) {
        const imgLink = link.match(/\[img\](.*?)\[\/img\]/);
        const bbText = _bbText.replace(link, `<img src="${imgLink[1]}" />`);
        bbText && ( _bbText = bbText);
    });
};

const _parseQuote = () => {
    createHTMLelement(/\[quote\](.*?)\[\/quote\]/g, function (link) {
        const qouteLink = link.match(/\[quote\](.*?)\[\/quote\]/);
        const bbText = _bbText.replace(link, `<blockquote><p>${qouteLink[1]}</p></blockquote>`);
        bbText && ( _bbText = bbText);
    });
};

const _parseTable = () => {
    let bbText = _bbText;
    bbText = bbText.replace(/\[table\]/g, '<table>');
    bbText = bbText.replace(/\[\/table\]/g, '</table>');
    bbText = bbText.replace(/\[tr\]/g, '<tr>');
    bbText = bbText.replace(/\[\/tr\]/g, '</tr>');
    bbText = bbText.replace(/\[td\]/g, '<td>');
    bbText = bbText.replace(/\[\/td\]/g, '</td>');
    bbText = bbText.replace(/\[th\]/g, '<th>');
    bbText = bbText.replace(/\[\/th\]/g, '</th>');
    bbText && ( _bbText = bbText);
};

const _parseStars = () => {
    const textArray  = _bbText.split('');
    let starsIndex = textArray.map((letter, index) => letter === '*' ? index : undefined);
    starsIndex = starsIndex.filter((tmp) => tmp !== undefined);
    let isStart = true;

    starsIndex.map((index) => {
        textArray[index] = isStart ? '<div class="bb-star bb-display-inline">' : '</div>';
        isStart = !isStart;
    });

    _bbText = textArray.join('');
};

const SIMPLE_SYMBOLS_PARSER = {
    italic: _simpleReplace(/\[i\]/g, /\[\/i\]/g, 'bb-italic'),
    bold: _simpleReplace(/\[b\]/g, /\[\/b\]/g, 'bb-strong'),
    underlined: _simpleReplace(/\[u\]/g, /\[\/u\]/g, 'bb-underlined'),
    strikethrough: _simpleReplace(/\[s\]/g, /\[\/s\]/g, 'bb-strikethrough'),
    stars: _parseStars,
    code: _parseCode,
    image: _parseImage,
    quote: _parseQuote,
    table: _parseTable,
    link: _parseLinks,
};

const BBCodeInterpreter =  {
    decodeToHTML,
    getRegexpsToDetectType: () => REGEXPS_TO_DETECT_TYPE
};

export default BBCodeInterpreter;
