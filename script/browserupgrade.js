(function() {

    var ie = (function(){
        var undef, v = 3,div = document.createElement('div'), all = div.getElementsByTagName('i');

        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            all[0]
        );

        return v > 4 ? v : undef;

    }());

    if (ie === undefined) {
        return;
    };

    var fragment = document.createDocumentFragment(),

    style = [
    'font-size: 20px',
    'font-weight: bold',
    'border-bottom: 1px solid #dadada',
    'z-index: 2',
    'width: 100%',
    'position: relative',
    'background: #fff'
    ],

    div = ['div', { 'style' : style.join(';')}],

    p   = ['p', {'style': 'padding: 10px 20px'}, 'Vi anbefaler at du oppgraderer til siste versjon av ',
    ['a', { 'href' : 'http://windows.microsoft.com/nb-NO/internet-explorer/download-ie' }, 'Internet Explorer'], ', ',
    ['a', { 'href' : 'http://www.google.com/chrome' }, 'Chrome'], ', ',
    ['a', { 'href' : 'http://www.mozilla.org/nb-NO/firefox/new/' }, 'Firefox'], ' eller ',
    ['a', { 'href' : 'http://www.opera.com/download/' }, 'Opera'], '.'
    ];

    if (ie === 9) {
        p.splice(2, 0, 'Internet Explorer 9 er dessverre for gammel til å kunne vise websidene våre riktig. ');
    };

    if (ie < 9) {
        p.splice(2, 0, 'Nettleseren din er dessverre for gammel til å kunne vise AFKs websidene våre riktig. ');
    };

    div.push(p);

    generateMarkup(fragment, div);

    function generateMarkup(parent, input) {

        if (input instanceof Array) {

            if (typeof input[0] === 'string') {
                var el = document.createElement(input.shift());
                parent.appendChild(el);
                parent = el;
            }

            for (var i = 0, len = input.length; i < len; i++) {
                generateMarkup(parent, input[i]);
            }

        } else if (typeof input === 'string') {

            var txt = document.createTextNode(input);
            parent.appendChild(txt);

        } else {

            for (var attr in input) {
                if (input.hasOwnProperty(attr)) {
                    parent.setAttribute(attr, input[attr]);
                }
            }

        };
    };

    function insertElement() {
        document.body.insertBefore(fragment, document.body.firstChild);
    };


    if (document.readyState == 'complete') {
        insertElement();
    } else {
        document.onreadystatechange = function() {
            if (document.readyState == 'complete') {
                insertElement();
            }
        };
    }

}());
