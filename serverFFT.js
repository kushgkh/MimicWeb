var express = require('express')
var bodyParser = require('body-parser')
var FFT = require('fft.js')
var app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


function getMax(num)
{

  var sol = 2;
  while(num >= sol)
  {
    sol = sol * 2;
  }
  return sol/2;

}

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world');
})


app.post('/hat', function (req, res) {
  console.log(req.body);
  console.log(req.body.Help)
  res.send(req.body.Help);

})

app.post('/fft', function (req, res) {

  //Temp input is a dictionary and needs to be indexed using ["43"]
  var tempInput = JSON.parse(req.body.Help);
  console.log(typeof(tempInput));

  var fftlen = Object.keys(tempInput).length;

  var input = new Array(fftlen);

  for(var i = 0 ; i < fftlen ; i++)
  {
    input[i] = tempInput[i.toString()];

  }
  var f = new FFT(input.length); 

 

  var output = f.createComplexArray();
  f.realTransform(output, input);

  //console.log(output);

  var maxdex = -1;
  var maxVal = -1;

  console.log(output);

  for(var i = 0 ; i < 65536 ; i++)
  {
    if(i > 70 && i < 500)
    {
      console.log(i + " " + output[i]);
    }
    if(maxVal < Math.abs(output[i]))
    {
      maxVal = Math.abs(output[i]);
      maxdex = i;
    }
  }
  console.log(maxdex);
  console.log(maxVal);


  res.send({ 'Help': maxdex});
})





app.listen(3000, function() {
 console.log('Example app listening on port 3000!')
 var input = [0 , -0.5 , -1 , -0.5 , 0 , 0.5 , 1 , 0.5];
 var f = new FFT(8); 
 var output = f.createComplexArray();
 

 f.realTransform(output, input);
 //console.log(output);
 

});