const express = require('express');
const router = express.Router();
const scraping = require('../search/scraping')();

router.get('/', async(req,res) =>{
  res.render('pages/home');
});

router.get('/dictionary', async(req,res) =>{

  var dados = [{word: 'copa', count: 100},{word: 'trump', count: 90},{word: 'futebol', count: 85},{word: 'crise', count: 70}];

  res.render('pages/dictionary', {dados});
});

 router.get('/oantagonista', async(req,res) =>{
    let url = 'https://www.oantagonista.com/';
    let jqueryList = '.collect article';
    let jqueryTitle = '.article_link h2';
    let jqueryTime = '.article_link span time';
    let jquerySummary = '.article_link p';
    let jqueryTitleLink = 'a.article_link';

    let news = await scraping.getNews(url,jqueryList,jqueryTitle,jqueryTime,jquerySummary,jqueryTitleLink);

    var site = {
      title : 'O Antagonista',
      news : news,
    }

    res.render('pages/news',{site});
});

router.get('/portaldoholanda', async(req,res) =>{
  let url = 'http://www.portaldoholanda.com.br/';
  let jqueryList = '.mvp-blog-story-list li';
  let jqueryTitle = '.mvp-blog-story-text h2';
  let jqueryTime = '';
  let jquerySummary = '.mvp-blog-story-text p';
  let jqueryTitleLink = '.mvp-blog-story-out a';

  let news = await scraping.getNews(url,jqueryList,jqueryTitle,jqueryTime,jquerySummary,jqueryTitleLink);

  var site = {
    title : 'Portal do Holanda',
    news : news,
  }

  res.render('pages/news',{site});
});

router.get('/g1', async(req,res) =>{
  let url = 'http://g1.globo.com/';
  let jqueryList = '.feed-post-body';
  let jqueryTitle = '.feed-post-body-title';
  let jqueryTime = '.feed-post-datetime';
  let jquerySummary = '.feed-post-body-resumo';
  let jqueryTitleLink = 'a.feed-post-link';

  let news = await scraping.getNews(url,jqueryList,jqueryTitle,jqueryTime,jquerySummary,jqueryTitleLink);

  var site = {
    title : 'G1 - Globo',
    news : news,
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
    news : news,
  }

  res.render('pages/news',{site});
});

module.exports = app => app.use('/',router);
