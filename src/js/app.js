(function () {
    const $ = require('./helpers.js');
    const http = require('./HttpModule.js');
    const $buttonNewQuote = $('#newQuote');
    const END_POINT_QUOTES = 'https://talaikis.com/api/quotes/random/';
    const handleQuote = function (obj) {
        const $elementQuote = $('.quote__text');
        $elementQuote.innerText = obj.quote;
    };

    $buttonNewQuote.addEventListener('click', () => {
        http.get(END_POINT_QUOTES)
            .then(res => res.json().then(handleQuote));
    });
}());
