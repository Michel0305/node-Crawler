var cheerio = require('cheerio');
var request = require('sync-request');
var config = require('../config/config');
var fs = require('fs');
var path = require('path');

opt = (proxyhost, proxyport, inurl) => {
    return {
        host: proxyhost, //'这里放代理服务器的ip或者域名',
        port: proxyport,
        method: 'GET', //这里是发送的方法
        path: inurl, //这里是访问的路径        
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

const filmlist = [{
        id: 0,
        name: 'Home',
        url: 'http://www.66s.cc/',
        pageCnt: '4'
    },
    {
        id: 1,
        name: '最新50部',
        url: 'https://www.66s.cc/qian50m.html',
        pageCnt: 0
    },
    {
        id: 2,
        name: '喜剧片',
        url: 'http://www.66s.cc/xijupian/',
        pageCnt: '57'
    },
    {
        id: 3,
        name: '动作片',
        url: 'http://www.66s.cc/dongzuopian/',
        pageCnt: '74'
    },
    {
        id: 4,
        name: '爱情片',
        url: 'http://www.66s.cc/aiqingpian/',
        pageCnt: '45'
    },
    {
        id: 5,
        name: '科幻片',
        url: 'http://www.66s.cc/kehuanpian/',
        pageCnt: '26'
    },
    {
        id: 6,
        name: '恐怖片',
        url: 'http://www.66s.cc/kongbupian/',
        pageCnt: '38'
    },
    {
        id: 7,
        name: '剧情片',
        url: 'http://www.66s.cc/juqingpian/',
        pageCnt: '156'
    },
    {
        id: 8,
        name: '战争片',
        url: 'http://www.66s.cc/zhanzhengpian/',
        pageCnt: '10'
    },
    {
        id: 9,
        name: '纪录片',
        url: 'http://www.66s.cc/jilupian/',
        pageCnt: '14'
    },
    {
        id: 10,
        name: '动画片',
        url: 'http://www.66s.cc/donghuapian/',
        pageCnt: '26'
    },
    {
        id: 11,
        name: '电视剧国剧日韩剧欧美剧',
        url: 'http://www.66s.cc/dianshiju/',
        pageCnt: '169'
    },
    {
        id: 12,
        name: '综艺',
        url: 'http://www.66s.cc/ZongYi/',
        pageCnt: '2'
    },
    { id: 13, name: '旧版6v', url: 'http://www.hao6v.com', pageCnt: 0 }
]

//post_container

filmContent = () => {}

/**
 * 獲取所有頁面信息
 */
sectionalization = (filmitems) => {
    let rebackData = []
    for (let i = 0; i < filmitems.length; i++) {
        const el = filmitems[i];
        if (el.pageCnt > 0) {
            for (let k = 1; k <= Number(el.pageCnt); k++) {
                let _film = {}
                if (k <= 1) {
                    _film.id = el.id;
                    _film.name = el.name;
                    _film.url = el.url;
                    _film.pageCnt = el.pageCnt;
                    _film.filmUrl = `${el.url}index.html`;
                } else {
                    _film.id = el.id;
                    _film.name = el.name;
                    _film.url = el.url;
                    _film.pageCnt = el.pageCnt;
                    _film.filmUrl = `${el.url}index_${k}.html`;
                }
                rebackData.push(_film)
            }
        } else {
            el.filmUrl = el.url;
            rebackData.push(el)
        }
    }
    return rebackData;
}

/**
 * 獲取每頁film
 */
filmContent.getMovieUrl = (inUrl) => {
    let films = []
    for (let i = 0; i < config.proxypool.length; i++) {
        const el = config.proxypool[i];
        let $ = cheerio.load(request('GET', inUrl.filmUrl, opt(el.ip, el.port, inUrl.filmUrl)).getBody().toString(), {
            decodeEntities: false
        })
        let ulList = $('#post_container').html();
        let hasthumbnail = $('#post_container').find('li').length;
        if (hasthumbnail > 0) {
            $('li', ulList).each((i, el) => {
                films.push({
                    types: inUrl.name,
                    url: $('.thumbnail', el).children().attr('href'),
                    name: $('.thumbnail', el).children().attr('title'),
                    imgsrc: $('.thumbnail', el).find('img').attr('src')
                })
            })
            return films;
        }
    }
}

/**
 * 獲取每一頁li 元素
 */
filmContent.getFilmItems = () => {
    let filmItems = sectionalization(filmlist);
    for (let i = 0; i < filmItems.length; i++) {
        const el = filmItems[i];
        if (el.pageCnt > 0) {
            let film = filmContent.getMovieUrl(el);
            for (let l = 0; l < film.length; l++) {
                const element = film[l];
                config.films.push(element)
            }
        } else {
            console.log(el)
        }
    }
    fs.writeFileSync(`${path.dirname(__dirname)}/data/films.json`, JSON.stringify(config.films));
}


filmContent.getfilmDetail = (films) => {
    for (let i = 0; i < config.proxypool.length; i++) {
        const el = config.proxypool[i];
        let filmHtml = '<p>'
        let $ = cheerio.load(request('GET', films.url, opt(el.ip, el.port, films.url)).getBody().toString(), {
            decodeEntities: false
        })
        $('p', '#post_content').each((index, item) => {
            let pText = $(item).text().replace(/[ | ]*\t|\r|\n/g, '');
            let pHtml = $(item).html();
            if (pText.length !== '' & pText !== null & pHtml.length > 0) {
                console.log(pHtml.indexOf(' 载地址'))
                console.log(pHtml)
            }
        });

        //console.log($(filmContents).length);

        return;
    }
}

filmContent.getFilm = () => {
    let films = JSON.parse(fs.readFileSync(`${path.dirname(__dirname)}/data/films.json`))
    for (let i = 0; i < films.length; i++) {
        const el = films[i];
        if (i == 5) {
            filmContent.getfilmDetail(el)
        }
    }
}

// filmContent.getFilm();



module.exports = filmContent