const request = require('request-promise');
const cheerio = require('cheerio');

module.exports = function(){

    return {
        getNews: async function (url,jqueryList,jqueryTitle,jqueryTime,jquerySummary){
            let news = []; 
            // Metodo que faz a requisição para tratarmos (raspar) os dados
            let html = await request(url);

            var $ = cheerio.load(html);

            $(jqueryList).each(function(i){
                let title = $(this).find(jqueryTitle).text().trim();
                let time = $(this).find(jqueryTime).text().trim();
                let summary = $(this).find(jquerySummary).text().trim();
                news.push({title,time,summary});
            })
            return news;
        }
    }
}
