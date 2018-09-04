var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world');
})


app.post('/hat', function (req, res) {
  console.log(req.body);
  console.log(req.body.Help)
  res.send(req.body.Help);

})

app.listen(3000, function() {
 console.log('Example app listening on port 3000!')
});