const request = require('request-promise');
const cheerio = require('cheerio');

module.exports = function(){

    return {
        getSub: async function (url,jquerySubTitle,jquerySubText){
            let subnews = [];

            // Metodo que faz a requisição para tratarmos (raspar) os dados
            let html = await request(url);

            var $ = cheerio.load(html);


            //var jqueryTitleLink = jqueryTitle.split(" "); // deixa somente o <a> para poder pegar o href

            let subtitle = $(jquerySubTitle).text().trim();
            let subcontext = $(jquerySubText).text().trim();

            //console.log(subtitle + "TESTE " + subcontext);
            //console.log("UEUEUE" + $(this).find(jquerySubText).text() + " " + $(this).find(jquerySubTitle).text());

          //  console.log("ASDUHSHD" + subcontext + " " + subtitle);

            subnews.push({subtitle, subcontext});

            //var data = {subnews};

            return subnews;
        }
    }
}
