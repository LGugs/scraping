const express = require('express');
const router = express.Router();
const scraping = require('../search/scraping')();
const subscraping = require('../search/subscraping')();

router.get('/', async(req,res) =>{
  res.render('pages/home');
});

router.get('/dictionary', async(req,res) =>{

  var dados = [{word: 'copa', count: 100},{word: 'trump', count: 90},{word: 'futebol', count: 85},{word: 'crise', count: 70}];

  res.render('pages/dictionary', {dados});
});

 router.get('/oantagonista', async(req,res) =>{
    let subnews = [];

    let url = 'https://www.oantagonista.com/';
    let jqueryList = '.collect article';
    let jqueryTitle = '.article_link h2';
    let jqueryTime = '.article_link span time';
    let jquerySummary = '.article_link p';
    let jqueryTitleLink = 'a.article_link';

    // raspagem da noticia acessada
    let jquerySubTitle = '.entry-header h1';
    let jquerySubText = '.entry-content p';

    let news = await scraping.getNews(url,jqueryList,jqueryTitle,jqueryTime,jquerySummary,jqueryTitleLink);

    for (let i = 0; i < news.length; i++) {
      console.log(news[i].link);
      let news2 = await subscraping.getSub(news[i].link,jquerySubTitle,jquerySubText);
      subnews.push({ news2 });
    }

    var site = {
      title : 'O Antagonista',
      news : {news, subnews}
    }

    res.render('pages/news',{site});
});

router.get('/portaldoholanda', async(req,res) =>{
  let subnews = [];

  let url = 'http://www.portaldoholanda.com.br/';
  let jqueryList = '.mvp-blog-story-list li';
  let jqueryTitle = '.mvp-blog-story-text h2';
  let jqueryTime = '';
  let jquerySummary = '.mvp-blog-story-text p';
  let jqueryTitleLink = '.mvp-blog-story-out a';

  // raspagem da noticia acessada
  let jquerySubTitle = '.mvp-post-title a';
  let jquerySubText = '#mvp-content-main p';

  let news = await scraping.getNews(url,jqueryList,jqueryTitle,jqueryTime,jquerySummary,jqueryTitleLink);

  for (let i = 0; i < news.length; i++) {
    console.log(news[i].link);
    let news2 = await subscraping.getSub(news[i].link,jquerySubTitle,jquerySubText);
    subnews.push({ news2 });
  }

  var site = {
    title : 'Portal do Holanda',
    news : {news, subnews}
  }

  res.render('pages/news',{site});
});

router.get('/g1', async(req,res) =>{
  let subnews = [];

  let url = 'http://g1.globo.com/';
  let jqueryList = '.feed-post-body';
  let jqueryTitle = '.feed-post-link';
  let jqueryTime = '.feed-post-datetime';
  let jquerySummary = '.feed-post-body-resumo';
  let jqueryTitleLink = 'a.feed-post-link';

  // raspagem da noticia acessada
  let jquerySubTitle = '.content-head__title';
  let jquerySubText = '.content-text__container';

  let news = await scraping.getNews(url,jqueryList,jqueryTitle,jqueryTime,jquerySummary,jqueryTitleLink);

  for (let i = 0; i < news.length; i++) {
    console.log(news[i].link);
    let news2 = await subscraping.getSub(news[i].link,jquerySubTitle,jquerySubText);
    subnews.push({ news2 });
  }

  var site = {
    title : 'G1 - Globo',
    news : {news, subnews}
  }

  res.render('pages/news',{site});
});

// not working
router.get('/yahoo', async(req,res) =>{
  let url = 'https://br.yahoo.com';
  let jqueryList = '.O\(n\)\:f h3';
  let jqueryTitle = '.O\(n\)\:f h3';
  let jqueryTime = '.O\(n\)\:f h3';
  let jquerySummary = '.O\(n\)\:f h3';

  let news = await scraping.getNews(url,jqueryList,jqueryTitle,jqueryTime,jquerySummary);

  var site = {
    title : 'Yahoo!',
    news : {news, subnews}
  }

  res.render('pages/news',{site});
});

module.exports = app => app.use('/',router);
