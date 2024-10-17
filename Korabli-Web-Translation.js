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
// @grant        GM_getResourceText
// @grant        GM.xmlHttpRequest
// ==/UserScript==

(function() {

    let script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.src = "https://raw.githubusercontent.com/YongAn404/Korabli-Web-Translation/refs/heads/dev/i18n/zh-cn/korabli/i18n.json";
    document.documentElement.appendChild(script);

    script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.src = "https://raw.githubusercontent.com/YongAn404/Korabli-Web-Translation/refs/heads/dev/i18n/zh-cn/korabli/i10n.json";
    document.documentElement.appendChild(script);

    script = document.createElement('link');
    script.setAttribute('rel', 'preload');
    script.setAttribute('as', 'script');
    script.href = "https://raw.githubusercontent.com/YongAn404/Korabli-Web-Translation/refs/heads/dev/i18n/zh-cn/korabli/i10n.json";
    document.documentElement.appendChild(script);

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
                    setJsonToHtml(json,NCTS[key],"title")
                }
            });

            elmGetter.each('.main', document.querySelector('.news-detail__content'), reply => {
                setJsonToHtml(json,reply.querySelector('.placeholder'),"title")
            });

            elmGetter.each('.news-header', document, reply => {
                setJsonToHtml(json,reply.querySelector('.title'),"title")
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
                    setJsonToHtml(json,NCLS[key])
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
                setClassJsonToHtml(json,reply);

                const as = reply.querySelectorAll('a');
                for (const key in as) {
                    setJsonToHtml(json,as[key]);
                }
                const h4s = reply.querySelectorAll('h4');
                for (const key in h4s) {
                    setJsonToHtml(json,h4s[key]);
                }
            });
        }
    });
})();

function setClassJsonToHtml(json,reply){
    const classData = json["class"]
    for (const key in classData) {
        const classText = classData[key];
        const classHTML = reply.querySelector(`.${key}`);
        classHTML.innerHTML = classText
    }
}
function setJsonToHtml(json,dom,key=null){
    let item = json[dom.innerHTML];
    if(typeof item != "undefined"){
        dom.innerHTML = key==null?item:item[key];
    }
}