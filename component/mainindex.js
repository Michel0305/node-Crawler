/** 
 * 獲取首頁基本信息
 */

var cheerio = require('cheerio');
var config = require('../config/config');
var request = require('sync-request');
var iconv = require('iconv-lite');

var $ = cheerio.load(request('GET', config.indexUrl).getBody().toString(), {
    // withDomLvl1: true,
    // normalizeWhitespace: false,
    // xmlMode: false,
    decodeEntities: false
});
mainBasic = () => {}

mainBasic.menuItems = () => {
    let menus = [];
    let items = $('#menus').children('li');
    items.each((i, item) => {
        menus.push({
            id: i,
            name: i == 0 ? 'Home' : $(item).text(),
            url: i == 0 ? config.indexUrl : $(item).children().attr('href')
        })
    })
    console.log(menus);
    return menus;
    // let apgeCounts = $('.pagination').children('a');
    // console.log($(apgeCounts).last('a').attr('href'));
}

opt =  (proxyhost,proxyport,inurl)=>{
    return {
        host:proxyhost,//'这里放代理服务器的ip或者域名',
        port:proxyport,
        method:'GET',//这里是发送的方法
        path:inurl,     //这里是访问的路径        
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'accept-encoding': 'gzip, deflate',
        Host: config.ipHost,
        'Postman-Token': 'e043707b-d69a-4f73-9f0f-022559fcfae2,89d19a03-2c98-496e-9953-764070123d3e',
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        'User-Agent': 'PostmanRuntime/7.13.0'}
}
const menusList = [{ id: 0, name: 'Home', url: 'http://www.66s.cc/index.html' },
    { id: 1, name: '最新50部', url: 'https://www.66s.cc/qian50m.html' },
    { id: 2, name: '喜剧片', url: 'http://www.66s.cc/xijupian/' },
    { id: 3, name: '动作片', url: 'http://www.66s.cc/dongzuopian/' },
    { id: 4, name: '爱情片', url: 'http://www.66s.cc/aiqingpian/' },
    { id: 5, name: '科幻片', url: 'http://www.66s.cc/kehuanpian/' },
    { id: 6, name: '恐怖片', url: 'http://www.66s.cc/kongbupian/' },
    { id: 7, name: '剧情片', url: 'http://www.66s.cc/juqingpian/' },
    { id: 8, name: '战争片', url: 'http://www.66s.cc/zhanzhengpian/' },
    { id: 9, name: '纪录片', url: 'http://www.66s.cc/jilupian/' },
    { id: 10, name: '动画片', url: 'http://www.66s.cc/donghuapian/' },
    { id: 11, name: '电视剧国剧日韩剧欧美剧', url: 'http://www.66s.cc/dianshiju/' },
    { id: 12, name: '综艺', url: 'http://www.66s.cc/ZongYi/' },
    { id: 13, name: '旧版6v', url: 'http://www.hao6v.com' }
]

mainBasic.classifyHtml = () => {
    request('GET', config.indexUrl).getBody().toString()

}


mainBasic.menuItems();

module.exports = mainBasic;