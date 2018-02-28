(function () {
    const $ = require('./helpers.js');
    const http = require('./HttpModule.js');
    const $buttonNewQuote = $('#newQuote');
    const $buttonShareTwitter = $('.quote__twitter > img');
    const END_POINT_QUOTES = 'https://talaikis.com/api/quotes/random/';
    const END_POINT_SHARE_TWITTER = 'https://twitter.com/intent/tweet?text=';
    const handleQuote = function (obj) {
        const $elementQuote = $('.quote__text');
        $elementQuote.innerText = obj.quote;
    };

    $buttonNewQuote.addEventListener('click', () => {
        http.get(END_POINT_QUOTES)
            .then(res => res.json().then(handleQuote));
    });

    $buttonShareTwitter.addEventListener('click', () => {
        const textElementQuote = $('.quote__text').innerText;
        if (textElementQuote) {
            window.open(
                END_POINT_SHARE_TWITTER + textElementQuote,
                'Share on twitter',
                'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=320, height=230'
            );
        }
    });
}());
