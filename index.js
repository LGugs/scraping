const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js'))); // redirect bootstrap JS
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist'))); // redirect JS jQuery
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css'))); // redirect CSS bootstrap


require('./controllers/news')(app);

var port = 3000;
app.listen(port,function(err){
  if (!err){
    console.log('Servidor iniciado na porta '+port);
  }else{
    console.log(err);
  }
});
