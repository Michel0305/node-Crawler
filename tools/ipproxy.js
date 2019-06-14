var cheerio = require('cheerio');
var request = require('sync-request');
var config = require('../config/config');;

const options = {
    headers: {
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'accept-encoding': 'gzip, deflate',
        Host: config.ipHost,
        'Postman-Token': 'e043707b-d69a-4f73-9f0f-022559fcfae2,89d19a03-2c98-496e-9953-764070123d3e',
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        'User-Agent': 'PostmanRuntime/7.13.0'
    }
}


getIpPage = (ipurl) => {
    let $ = cheerio.load(request('GET', ipurl.toString(), options).getBody().toString(), {
        decodeEntities: false
    });
    let tableData = $('tbody').html();
    console.log(tableData);
}

getIpPage(config.ipPoolUrl);