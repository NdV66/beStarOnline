let _bbText = '';
const BASE_HTML_ELEMENT_TYPE = 'div';
const REGEXPS_TO_DETECT_TYPE = {
    italic: /^\[i\](.*?)\[\/i\]$/,
    bold: /^\[b\](.*?)\[\/b\]$/,
    stars: /^\*(.*?)\*$/,
    underline: /^\[u\](.*?)\[\/u\]$/,
    strikethrough: /^\[s\](.*?)\[\/s\]$/
};

const _parseThroughRegexps = (replaceValues) => {
    const replaceMap = new Map(replaceValues);
    let bbText = _bbText;
    replaceMap.forEach((key, value) => bbText = bbText.replace(key, value));
    bbText && ( _bbText = bbText);
};

const _simpleReplace = (startRegexp, endRegexp, cssClass) => {
    return () => {
        const classTag = 'class';
        const replaceValues = [
            [`<${BASE_HTML_ELEMENT_TYPE} ${classTag}="${cssClass} bb-display-inline">`, startRegexp],
            [`</${BASE_HTML_ELEMENT_TYPE}>`, endRegexp],
        ];
        _parseThroughRegexps(replaceValues);
    };
};

const _parseCode =  () => {
    const replaceValues = [
        ['<code>', /\[code\]/g],
        ['</code>', /\[\/code\]/g],
    ];
    _parseThroughRegexps(replaceValues);
};

const _parseTable = () => {
    const replaceValues = [
        ['<table>', /\[table\]/g],
        ['</table>', /\[\/table\]/g],
        ['<tr>', /\[tr\]/g],
        ['</tr>', /\[\/tr\]/g],
        ['<td>', /\[td\]/g],
        ['</td>', /\[\/td\]/g],
        ['<th>', /\[th\]/g],
        ['</th>', /\[\/th\]/g],
    ];
    _parseThroughRegexps(replaceValues);
};

const _parseHref = (link) => {
    let newLink = link.replace(/\[\/url\]/, '</a>');
    newLink = newLink.replace(/\[\url\]/, `<a href="${link.substring(5, link.length - 6)}">`);
    _parseThroughRegexps([[newLink, link]]);
};

const _parseDescHref = (link) => {
    const linkName = link.match(/\](.*?)\[/);
    const linkHref = link.match(/\="(.*?)"/);
    const newLink = `<a href="${linkHref[1]}">${linkName[1]}</a>`;
    _parseThroughRegexps([[newLink, link]]);
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
        const currentPattern = PATTERNS[key];
        createHTMLelement(currentPattern.pattern, currentPattern.parse);
    }
};

const _parseImage = () => {
    createHTMLelement(/\[img\](.*?)\[\/img\]/g, function (link) {
        const imgLink = link.match(/\[img\](.*?)\[\/img\]/);
        const newLink = `<img src="${imgLink[1]}" />`;
        _parseThroughRegexps([[newLink, link]]);
    });
};

const _parseQuote = () => {
    createHTMLelement(/\[quote\](.*?)\[\/quote\]/g, function (link) {
        const qouteLink = link.match(/\[quote\](.*?)\[\/quote\]/);
        const newLink =`<blockquote><p>${qouteLink[1]}</p></blockquote>`;
        _parseThroughRegexps([[newLink, link]]);
    });
};

const _parseStars = () => {
    const textArray  = _bbText.split('');
    let starsIndex = textArray.map((letter, index) => letter === '*' ? index : undefined);
    let isStart = true;
    starsIndex = starsIndex.filter((tmp) => tmp !== undefined);

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

const BBCodeInterpreter =  {
    decodeToHTML,
    getRegexpsToDetectType: () => REGEXPS_TO_DETECT_TYPE
};

export default BBCodeInterpreter;
