var express = require('express'),
    fs = require('fs'),
    request = require('request'),
    cheerio = require('cheerio'),
    app = express();

// Escolhendo no metodo .get() o caminho para fazer a requisição
// Poderia ser somente a barra, mas para facilitar a compreensão vamos personalizar
app.get('/raspagem', function(req, res) {

    // Url a ser feita a raspagem de dados
    url = 'https://www.oantagonista.com/';

    // Metodo que faz a requisição para tratarmos (raspar) os dados
    request(url, function(error, response, html) {
        var news = [];

        if (!error) {
            // Preparando o cheeriojs para ler o DOM ~ le jQuery selector
            var $ = cheerio.load(html);

            // Objeto que ira armazenar a tabela
            var resultado = [];


            $('.collect').find('article').each(function(i){
                let title = $(this).find('.article_link h2').text().trim();
                let time = $(this).find('.article_link span time').text().trim();
                let summary = $(this).find('.article_link p').text().trim();
                news.push({title,time,summary});
            });
            console.log(news);
        }

        res.send('Dados raspados com sucesso! Verifique no seu node console.');
    })
})

// Execução do serviço
app.listen('8081')
console.log('Executando raspagem de dados na porta 8081...');
exports = module.exports = app;
