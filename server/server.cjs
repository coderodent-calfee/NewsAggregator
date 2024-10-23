const http      = require('http');
const { assert } = require('console');
const hostname  = 'localhost';
const SERVER_PORT      = 3035;
const DEFAULT_DEV_PORT = 5173;


function getPathQueries(url) {
    const [path, params] = url.split('?');
    const queries = params.split('&');
    let queryParams = new Map()
    queries.forEach((query) => {
        const [key, value] = query.split('=');
        queryParams.set(key, value);
    });
    return { path: path, queryParams: queryParams };
};

/**
 * Start the Node Server Here...
 *
 * The http.createServer() method creates a new server that listens at the specified SERVER_PORT.
 * The requestListener function (function (req, res)) is executed each time the server gets a request.
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 * API KEY for newsapi.org ce3e11245dcd42828df9ed3d2c1da1ed
 */
http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${DEFAULT_DEV_PORT}`);
    if (req) {
        if (req.method === 'GET') {
            const { path, queryParams } = getPathQueries(req.url);
            console.log("path: ", path);
            console.log("queryParams: ", queryParams);
            // let search = getSearchText(path, queryParams);
            // let valid = (search.searchText ? true : false);
            // let jsonContent = {
            //     searchText: search.searchText,
            //     valid: valid
            // };
            // if (valid) {
            //     [jsonContent.products, suggestions] = getMatchingProductAndSuggestions(data, search.searchText);
            //     let suggestion = '';
            //     let bestScore = 0;
            //     for (const [key, value] of suggestions) {
            //         if (value > bestScore) {
            //             suggestion = key;
            //             bestScore = value;
            //         }
            //     }
            //     if (bestScore > 0) {
            //         jsonContent.suggestedText = suggestion;
            //     }
            // }
            let hello = "hello!";
            body = JSON.stringify({hello}, null, 2);
            res.write(body);
            res.end();
            return;
        }
    }
    return res.status(404).send("Unavailable");
}).listen(SERVER_PORT);

console.log(`[Server running on ${hostname}:${SERVER_PORT}]`);
