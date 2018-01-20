var BBcodeInterpreter = (function () {
    var _bbText = '';
    var BASE_HTML_ELEMENT_TYPE = 'div';
    var SIMPLE_SYMBOLS_PARSER = {
        italic: {
            parse: simpleReplace(/\[i\]/g, /\[\/i\]/g, 'bb-italic')
        },
        strong: {
            parse: simpleReplace(/\[b\]/g, /\[\/b\]/g, 'bb-strong')
        },
        underlined: {
            parse: simpleReplace(/\[u\]/g, /\[\/u\]/g, 'bb-underlined')
        },
        strikethrough: {
            parse: simpleReplace(/\[s\]/g, /\[\/s\]/g, 'bb-strikethrough')
        },
        code: {
            parse: function () {
                var bbText = _bbText;
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
                            var newLink = link.replace(/\[\/url\]/, '</a>');
                            newLink = newLink.replace(/\[\url\]/, '<a href="' + link.substring(5, link.length - 6) + '">');
                            var replace = _bbText.replace(link, newLink);
                            if (replace) {
                                _bbText = replace;
                            }
                        }
                    },
                    descHref: {
                        pattern: /\[url\=\"(.*?)\"\](.*?)\[\/url\]/g,
                        parse: function (link) {
                            var linkName = link.match(/\](.*?)\[/);
                            var linkHref = link.match(/\="(.*?)"/);
                            var replace = _bbText.replace(link, '<a href="' + linkHref[1] + '">' + linkName[1] + '</a>');
                            if (replace) {
                                _bbText = replace;
                            }
                        }
                    }
                };

                for (var key in PATTERNS) {
                    createHTMLelement(PATTERNS[key].pattern, PATTERNS[key].parse);
                }
            }},
        image: {
            parse: function () {
                createHTMLelement(/\[img\](.*?)\[\/img\]/g, function (link) {
                    var imgLink = link.match(/\[img\](.*?)\[\/img\]/);
                    var replace = _bbText.replace(link, '<img src="' + imgLink[1] + '" />');
                    if (replace) {
                        _bbText = replace;
                    }
                });
            }
        },
        quote: {
            parse: function () {
                createHTMLelement(/\[quote\](.*?)\[\/quote\]/g, function (link) {
                    var qouteLink = link.match(/\[quote\](.*?)\[\/quote\]/);
                    var replace = _bbText.replace(link, '<blockquote><p>' + qouteLink[1] + '</p></<blockquote>');
                    if (replace) {
                        _bbText = replace;
                    }
                });
            }
        },
        table: {
            parse: function () {
                var bbText = _bbText;
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
//        baseList: {
//            parse: function () {
//                var bbText = _bbText;
////                bbText = bbText.replace(/\[tr\]/g, '<tr>');
////                bbText = bbText.replace(/\[\/tr\]/g, '</tr>');
//
//                var lists = bbText.match(/\[\*\](.*?)\[\*\]/g);
//
//                console.log('@@@ x: ' + );
//
//                bbText = bbText.replace(/\[list\]/g, '<ul>');
//                bbText = bbText.replace(/\[\/list\]/g, '</ul>');
//
//                if (bbText) {
//                    _bbText = bbText;
//                }
//            }
//        }
    };

    function createHTMLelement(regexp, callback) {
        var links = _bbText.match(regexp);
        if (links) {
            for (var i = 0; i < links.length; i++) {
                callback(links[i]);
            }
        }
    }

    function simpleReplace(startRegexp, endRegexp, cssClass) {
        return function () {
            var bbText = _bbText;
            bbText = bbText.replace(startRegexp, '<' + BASE_HTML_ELEMENT_TYPE + ' class="bb-display-inline ' + cssClass + '">');
            bbText = bbText.replace(endRegexp, '</' + BASE_HTML_ELEMENT_TYPE + '>');

            if (bbText) {
                _bbText = bbText;
            }
        };
    }

    /* ------ ------ MAIN ------ ------ */
    function decodeToHTML(_bbTextRef) {
        _bbText = _bbTextRef;
        _bbText = _bbText.replace(/\r|\n/g, '</br>');

        for (var key in SIMPLE_SYMBOLS_PARSER) {
            SIMPLE_SYMBOLS_PARSER[key].parse();
        }

        console.log(_bbText);
        return _bbText;
    }

    //[b][i]Narin is sweet and [s]cute[/s][/i][/b]
    return {
        decodeToHTML: decodeToHTML
    };
})();