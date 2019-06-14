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
    console.log(ipurl);
    var proxyPool = []  
    let $ = cheerio.load(request('GET', ipurl.toString(), options).getBody().toString(), {
        decodeEntities: false
    });
    let tableData = $('tbody').html();    
    $('tr',tableData).each((i,item)=>{
        let tmpProxyIp ={}
        $('td',item).each((l,el)=>{
           if(l == 0){
            tmpProxyIp.ip=$(el).text().replace(/[ | ]*\t|\r|\n/g,'')
           }
           if(l == 1){
            tmpProxyIp.port=$(el).text().replace(/[ | ]*\t|\r|\n/g,'')
           }  
           if(l == 2){
            proxyPool.push(tmpProxyIp)
           }           
        })
    })   
    return proxyPool
}

const pageCount = 20;
const timeArray = [5000,7000,9000]
getProxyJson = (inUrl,id = 1) => {
    if(id >= pageCount) return;
    var tmpIpPool = getIpPage(`${inUrl}/index_${id}.html`);
    id = id + 1;
    if(tmpIpPool == undefined || tmpIpPool == "undefined" || tmpIpPool == ""){
        console.log(config.proxypool);
    }else{
        config.proxypool.push(tmpIpPool)
        setTimeout(()=>{
            getProxyJson(config.ipPoolUrl,id)
        },timeArray[Math.random()*2]);
    }
   // console.log(tmpIpPool);
}
getProxyJson(config.ipPoolUrl,1);