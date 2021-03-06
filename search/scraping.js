const request = require('request-promise');
const cheerio = require('cheerio');

module.exports = function(){

    return {
        getNews: async function (url,jqueryList,jqueryTitle,jqueryTime,jquerySummary,jqueryTitleLink){
            let news = [];

            // Metodo que faz a requisição para tratarmos (raspar) os dados
            let html = await request(url);

            var $ = cheerio.load(html);

            $(jqueryList).each(function(){
                //var jqueryTitleLink = jqueryTitle.split(" "); // deixa somente o <a> para poder pegar o href

                let title = $(this).find(jqueryTitle).text().trim();
                let time = $(this).find(jqueryTime).text().trim();
                let summary = $(this).find(jquerySummary).text().trim();
                let link = $(this).find(jqueryTitleLink).attr('href');

                if(!link.startsWith("http")){
                    link = url.concat(link);
                }

                news.push({title,time,summary,link});
            })
            return news;
        }
    }
}
