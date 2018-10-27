var request= require('request');
var cheerio=require('cheerio');
var iconv = require('iconv-lite');

let haoUrl = "http://www.hao6v.com/"

const options = {
    url: haoUrl,
    method: 'GET',
    encoding: null
};

class getHtml{
    getreqData(){
        return new Promise((resolve,reject)=>{
            request(options,(err,res)=>{
                if(err){
                    reject(err);
                }else{
                    var buf = iconv.decode(res.body,'gb2312');
                    resolve(buf);
                }
            });
        })
    };

    getbodyData(){
        this.getreqData().then((res)=>{
           let tmpdata = cheerio.load(res);
           let $ = cheerio.load(tmpdata);
           let bodys = $('<div id="menu">...</div>');
           console.log(bodys.html());
        }).catch((err)=>{
            return err;
        });
     };
}
if(!getHtmlClass){
    var getHtmlClass = new getHtml();
}

module.exports = getHtmlClass;

