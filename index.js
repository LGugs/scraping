const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts')

const app = express();

app.use(bodyParser.json());
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/js', express.static(path.join(__dirname, '/src/js'))); // redirect bootstrap JS
app.use('/js2', express.static(path.join(__dirname, '/node_modules/jquery/dist'))); // redirect JS jQuery
app.use('/css', express.static(path.join(__dirname, '/src/css'))); // redirect CSS bootstrap
app.use('/fonts', express.static(path.join(__dirname, '/src/css/fonts'))); // redirect CSS bootstrap


require('./controllers/news')(app);

const port = process.env.PORT || 5000;
app.listen(port,function(err){
  if (!err){
    console.log('Servidor iniciado na porta '+port);
  }else{
    console.log(err);
  }
});
