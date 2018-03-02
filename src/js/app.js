(function () {
    const $ = require('./helpers.js');
    const http = require('./HttpModule.js');
    const $buttonNewQuote = $('#newQuote');
    const $buttonShareTwitter = $('.quote__twitter > img');
    const $elementQuote = $('.quote__text');
    const END_POINT_QUOTES = 'https://talaikis.com/api/quotes/random/';
    const END_POINT_SHARE_TWITTER = 'https://twitter.com/intent/tweet?text=';
    const handleQuote = function (obj) {
        $elementQuote.classList.add('quote__text--hiding')
        $elementQuote.innerText = obj.quote;
        $buttonNewQuote.disabled = true;
        setTimeout(() => {
            $elementQuote.classList.remove('quote__text--hiding');
            $buttonNewQuote.disabled = false;
        }, 5000);
    };
    const listenerNewQuote = function () {
        http.get(END_POINT_QUOTES)
            .then(res => res.json().then(handleQuote));
    };
    const listenerShareTwitter = function () {
        const textElementQuote = $elementQuote.innerText;
        if (textElementQuote) {
            window.open(
                END_POINT_SHARE_TWITTER + textElementQuote,
                'Share on twitter',
                'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=320, height=230'
            );
        }
    };

    $buttonNewQuote.addEventListener('click', listenerNewQuote);
    $buttonShareTwitter.addEventListener('click', listenerShareTwitter);
}());
