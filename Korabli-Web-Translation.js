// ==UserScript==
// @name         Korabli Web Translation
// @namespace    http://korabli.su/
// @version      2024-10-16
// @description  Korabli Web Translation
// @author       永安404
// @match        https://korabli.su/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @require      https://scriptcat.org/lib/513/2.0.0/ElementGetter.js
// @connect      raw.githubusercontent.com
// @grant        GM.xmlHttpRequest
// ==/UserScript==

(function() {

    // categories

    GM_xmlhttpRequest({
        url:"https://raw.githubusercontent.com/YongAn404/Korabli-Web-Translation/refs/heads/dev/i18n/zh-cn/news/content.json",
        method :"GET",
        dataType: 'json',
        onload:function(xhr){
            let json = JSON.parse(xhr.responseText);
            elmGetter.each('.news-card', document, reply => {
                //处理标签
                const NCTS = reply.querySelectorAll('.news-card_title');
                for (const key in NCTS) {
                    const NCT = NCTS[key];
                    let item = json[NCT.innerHTML];
                    if(typeof item != "undefined"){
                        NCT.innerHTML = item["title"];
                    }
                }
            });

            elmGetter.each('.main', document.querySelector('.news-detail__content'), reply => {
                const placeholder = reply.querySelector('placeholder');
                const item = json[placeholder.innerHTML];
                if(typeof item != "undefined"){
                    placeholder.innerHTML=item["title"];
                }
            });

            elmGetter.each('.news-header', document, reply => {
                const title = reply.querySelector('.title');
                const item = json[title.innerHTML];
                if(typeof item != "undefined"){
                    title.innerHTML=item["title"];
                }
            });
        }
    });

    GM_xmlhttpRequest({
        url:"https://raw.githubusercontent.com/YongAn404/Korabli-Web-Translation/refs/heads/dev/i18n/zh-cn/news/label.json",
        method :"GET",
        dataType: 'json',
        onload:function(xhr){
            let json = JSON.parse(xhr.responseText);
            elmGetter.each('.news-card', document, reply => {
                //处理勋章
                const NCLS = reply.querySelectorAll('.news-card_label');
                for (const key in NCLS) {
                    const NCL = NCLS[key];
                    let text = json[NCL.innerHTML];
                    if(typeof text != "undefined"){
                        NCL.innerHTML = text;
                    }
                }
            });
        }
    });


    GM_xmlhttpRequest({
        url:"https://raw.githubusercontent.com/YongAn404/Korabli-Web-Translation/refs/heads/dev/i18n/zh-cn/footer.json",
        method :"GET",
        dataType: 'json',
        onload:function(xhr){
            let json = JSON.parse(xhr.responseText);
            elmGetter.each('#footer', document, reply => {
                const classData = json["class"]
                for (const key in classData) {
                    const classText = classData[key];
                    const classHTML = reply.querySelector(`.${key}`);
                    classHTML.innerHTML = classText
                }

                const as = reply.querySelectorAll('a');
                for (const key in as) {
                    const a = as[key];
                    let text = json[a.innerHTML];
                    if(typeof text != "undefined"){
                        a.innerHTML = text;
                    }
                }
            });
        }
    });
})();
