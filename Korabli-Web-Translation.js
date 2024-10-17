// ==UserScript==
// @name         Korabli Web Translation
// @namespace    http://korabli.su/
// @version      2024-10-16
// @description  Korabli Web Translation
// @author       永安404
// @match        https://korabli.su/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @require      https://scriptcat.org/lib/513/2.0.0/ElementGetter.js
// @connect      github.com
// @grant        GM.xmlHttpRequest
// ==/UserScript==

(function() {
    GM_xmlhttpRequest({
        url:"https://github.com/YongAn404/Korabli-Web-Translation/blob/dev/i18n/zh-cn/news/content.json",
        method :"POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        onload:function(xhr){
            let json = JSON.parse(xhr.responseText);
            elmGetter.each('.news-card', document, reply => {
                //处理标题
                const NCTS = reply.querySelectorAll('.news-card_title');
                for (const key in NCTS) {
                    const NCT = NCTS[key];
                    let item = json[NCT.innerHTML];
                    if(typeof item != "undefined"){
                        NCT.innerHTML = item["title"];
                    }
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
        url:"https://github.com/YongAn404/Korabli-Web-Translation/blob/dev/i18n/zh-cn/news/label.json",
        method :"POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
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


    elmGetter.each('#footer', document, reply => {
        const FAT = reply.querySelector('.footer-about_text');
        FAT.innerHTML = "《船舶世界》 游戏基于第三方的知识产权。第三方权利客体的所有权利属于其合法权利持有人。<br data-v-800c1bf7> © Lesta Games, 2022–2024"
    });


})();
