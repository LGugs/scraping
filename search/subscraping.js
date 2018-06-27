const request = require('request-promise');
const cheerio = require('cheerio');

module.exports = function(){

    return {
        getSub: async function (url,jquerySubTitle,jquerySubText){
            let subnews = [];

            // Metodo que faz a requisição para tratarmos (raspar) os dados
            let html = await request(url);

            var $ = cheerio.load(html);

            let subtitle = $(jquerySubTitle).text().trim();
            let subcontext = $(jquerySubText).text().trim();

            subnews.push({subtitle, subcontext});

            //var data = {subnews};

            return subnews;
        }
    }
}
