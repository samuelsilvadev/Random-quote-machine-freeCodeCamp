const HttpModule = (function () {

    const _createBody = (method, data) => {
        return {
            'method': method,
            'body': JSON.stringify(data),
            'headers': {
                'content-type': 'application/json'
            }
        }
    }

    return {
        get: (url) => fetch(url),
        post: (url, body) => fetch(url, _createBody('POST', body)),
        put: (url, body) => fetch(url, _createBody('PUT', body)),
        del: (url) => fetch(url)
    }
}());

module.exports = HttpModule;
