const BBCodeInterpreter = (() => {
    let _bbText = '';
    const BASE_HTML_ELEMENT_TYPE = 'div';

    const REGEXPS_TO_DETECT_TYPE = {
        italic: /^\[i\](.*?)\[\/i\]$/,
        bold: /^\[b\](.*?)\[\/b\]$/,
        stars: /^\*(.*?)\*$/,
        underline: /^\[u\](.*?)\[\/u\]$/,
        strikethrough: /^\[s\](.*?)\[\/s\]$/
    }

    const SIMPLE_SYMBOLS_PARSER = {
        italic: {parse: simpleReplace(/\[i\]/g, /\[\/i\]/g, 'bb-italic')},
        bold: {parse: simpleReplace(/\[b\]/g, /\[\/b\]/g, 'bb-strong')},
        underlined: {parse: simpleReplace(/\[u\]/g, /\[\/u\]/g, 'bb-underlined')},
        strikethrough: {parse: simpleReplace(/\[s\]/g, /\[\/s\]/g, 'bb-strikethrough')},
        code: {
            parse: function () {
                let bbText = _bbText;
                bbText = bbText.replace(/\[code\]/g, '<code>');
                bbText = bbText.replace(/\[\/code\]/g, '</code>');

                if (bbText) {
                    _bbText = bbText;
                }
            }
        },
        link: {
            parse: function () {
                var PATTERNS = {
                    href: {
                        pattern: /\[url\](.*?)\[\/url\]/g,
                        parse: function (link) {
                            let newLink = link.replace(/\[\/url\]/, '</a>');
                            newLink = newLink.replace(/\[\url\]/, `<a href="${link.substring(5, link.length - 6)}">`);
                            const replace = _bbText.replace(link, newLink);
                            if (replace) {
                                _bbText = replace;
                            }
                        }
                    },
                    descHref: {
                        pattern: /\[url\=\"(.*?)\"\](.*?)\[\/url\]/g,
                        parse: function (link) {
                            const linkName = link.match(/\](.*?)\[/);
                            const linkHref = link.match(/\="(.*?)"/);
                            const replace = _bbText.replace(link, `<a href="${linkHref[1]}">${linkName[1]}</a>`);
                            if (replace) {
                                _bbText = replace;
                            }
                        }
                    }
                };

                for (const key in PATTERNS) {
                    createHTMLelement(PATTERNS[key].pattern, PATTERNS[key].parse);
                }
            }},
        image: {
            parse: function () {
                createHTMLelement(/\[img\](.*?)\[\/img\]/g, function (link) {
                    const imgLink = link.match(/\[img\](.*?)\[\/img\]/);
                    const replace = _bbText.replace(link, `<img src="${imgLink[1]}" />`);
                    if (replace) {
                        _bbText = replace;
                    }
                });
            }
        },
        quote: {
            parse: function () {
                createHTMLelement(/\[quote\](.*?)\[\/quote\]/g, function (link) {
                    const qouteLink = link.match(/\[quote\](.*?)\[\/quote\]/);
                    const replace = _bbText.replace(link, `<blockquote><p>${qouteLink[1]}</p></<blockquote>`);
                    if (replace) {
                        _bbText = replace;
                    }
                });
            }
        },
        table: {
            parse: function () {
                let bbText = _bbText;
                bbText = bbText.replace(/\[table\]/g, '<table>');
                bbText = bbText.replace(/\[\/table\]/g, '</table>');
                bbText = bbText.replace(/\[tr\]/g, '<tr>');
                bbText = bbText.replace(/\[\/tr\]/g, '</tr>');
                bbText = bbText.replace(/\[td\]/g, '<td>');
                bbText = bbText.replace(/\[\/td\]/g, '</td>');

                if (bbText) {
                    _bbText = bbText;
                }
            }
        },
        stars: {
            parse: function() {
                const textArray  = _bbText.split('');
                let starsIndex = textArray.map((letter, index) => letter === '*' ? index : undefined);
                starsIndex = starsIndex.filter((tmp) => tmp !== undefined);
                let isStart = true;

                starsIndex.map((index) => {
                    textArray[index] = isStart ? '<div class="bb-star bb-display-inline">' : '</div>';
                    isStart = !isStart;
                });

                _bbText = textArray.join('');
            }
        }
    };

    function createHTMLelement(regexp, callback) {
        const links = _bbText.match(regexp);
        if (links) {
            for (var i = 0; i < links.length; i++) {
                callback(links[i]);
            }
        }
    }

    function simpleReplace(startRegexp, endRegexp, cssClass) {
        return function () {
            const classTag = 'class';
            let bbText = _bbText;
            bbText = bbText.replace(startRegexp, `<${BASE_HTML_ELEMENT_TYPE} ${classTag}="bb-display-inline ${cssClass}">`);
            bbText = bbText.replace(endRegexp, `</${BASE_HTML_ELEMENT_TYPE}>`);

            if (bbText) {
                _bbText = bbText;
            }
        };
    }

    /* ------ ------ MAIN ------ ------ */
    function decodeToHTML(_bbTextRef) {
        _bbText = _bbTextRef;
        _bbText = _bbText.replace(/\r|\n/g, '</br>');

        for (const key in SIMPLE_SYMBOLS_PARSER) {
            SIMPLE_SYMBOLS_PARSER[key].parse();
        }

        return `<${BASE_HTML_ELEMENT_TYPE}>${_bbText}</${BASE_HTML_ELEMENT_TYPE}>`;
    }

    return {
        decodeToHTML: decodeToHTML,
        getRegexpsToDetectType: () => REGEXPS_TO_DETECT_TYPE
    };
})();

export default BBCodeInterpreter;