var request= require('request');
var cheerio=require('cheerio');
var iconv = require('iconv-lite');
var fs =  require('fs');

let haoUrl = "http://cn.geniusnet.com/"

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
          // fs.write
           let MenusList = $('#burgerNavbar');
           MenusList.find('href').each((i,el)=>{
               console.log(i);
               console.log("AAAAAAAAAA");
               console.log(el);
           })
        }).catch((err)=>{
            return err;
        });
     };
    
    getGwniusbody(callback){
        this.getreqData().then((res)=>{
            let $ = cheerio.load(res);
            //console.log($);
          //  fs.writeFileSync('./aa.txt',$);
            let MenusList = $('#burgerNavbar a'); //text() 获取文字 html() 获取HTML 
            MenusList.each((i,ele)=>{
                console.log(ele.attribs.href);
            })

            // MenusList.children().each((i,el)=>{
            //  //   console.log($(this));
            // })


           // console.log(MenusList.children().html());
            // MenusList.find('a').each((i,el)=>{
            //     let aHerf = $(this)
            //     console.log("***********************");
            //     console.log(el.prev.parent.children[0]);
            //     console.log("-----------------------");
            // })   
            callback('a');

         }).catch((err)=>{
             callback(err)
         });

       


    }
}
if(!getHtmlClass){
    var getHtmlClass = new getHtml();
}

module.exports = getHtmlClass;

