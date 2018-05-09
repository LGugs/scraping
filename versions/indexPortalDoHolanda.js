var express = require('express'),
    fs = require('fs'),
    request = require('request'),
    cheerio = require('cheerio'),
    app = express();

// Escolhendo no metodo .get() o caminho para fazer a requisição
// Poderia ser somente a barra, mas para facilitar a compreensão vamos personalizar
app.get('/raspagem', function(req, res) {

    // Url a ser feita a raspagem de dados
    url = 'http://www.portaldoholanda.com.br/';

    // Metodo que faz a requisição para tratarmos (raspar) os dados
    request(url, function(error, response, html) {
        var news = [];

        if (!error) {
            // Preparando o cheeriojs para ler o DOM ~ le jQuery selector
            var $ = cheerio.load(html);

            // Objeto que ira armazenar a tabela
            var resultado = [];

            // Escolhendo a tabela para fazer a raspagem
            // e percorrendo as linhas
            //var collect = $('.collect').find('article').text().trim();
            //console.log(collect);

            $('.mvp-blog-story-list li').each(function(i){
                 let title = $(this).find('.mvp-blog-story-text h2').text().trim();
                // let time = $(this).find('.article_link span time').text().trim();
                 let summary = $(this).find('.mvp-blog-story-text p').text().trim();
                news.push({title,summary});
            });
            console.log(news);
        }
        // console.log('Vai começar a escrever o JSON');
        // // Escrevendo o arquivo .json com o array
        // fs.writeFile('resultado.json', JSON.stringify(resultado, null, 4), function(err) {
        //     console.log('JSON console.log(escrito com sucesso! O arquivo está na raiz do projeto.').text();
        // })

        res.send('Dados raspados com sucesso! Verifique no seu node console.');
    })
})

// Execução do serviço
app.listen('8081')
console.log('Executando raspagem de dados na porta 8081...');
exports = module.exports = app;
