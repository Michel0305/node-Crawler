var request= require('request');

let haoUrl = "http://www.hao6v.com/"


getreqData = ()=>{
    request(haoUrl,(err,body,connt)=>{
        console.log(body.body);
    })


return "aaaaa";
}

exports.getreqData = getreqData;
