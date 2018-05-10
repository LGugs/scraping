const express = require('express');
const router = express.Router();
const scraping = require('../search/scraping')();

router.get('/', async(req,res) =>{
  res.render('home');
});

 router.get('/oantagonista', async(req,res) =>{
    let url = 'https://www.oantagonista.com/';
    let jqueryList = '.collect article';
    let jqueryTitle = '.article_link h2';
    let jqueryTime = '.article_link span time';
    let jquerySummary = '.article_link p';

    let news = await scraping.getNews(url,jqueryList,jqueryTitle,jqueryTime,jquerySummary);

    var site = {
      title : 'O Antagonista',
      news : news,
    }

    res.render('news',{site});
});

router.get('/portaldoholanda', async(req,res) =>{
  let url = 'http://www.portaldoholanda.com.br/';
  let jqueryList = '.mvp-blog-story-list li';
  let jqueryTitle = '.mvp-blog-story-text h2';
  let jqueryTime = '';
  let jquerySummary = '.mvp-blog-story-text p';

  let news = await scraping.getNews(url,jqueryList,jqueryTitle,jqueryTime,jquerySummary);

  var site = {
    title : 'Portal do Holanda',
    news : news,
  }

  res.render('news',{site});
});

module.exports = app => app.use('/',router);
