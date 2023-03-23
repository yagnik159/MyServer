const express = require('express');
const path = require('path');
const app = express();


app.use(express.json());


app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, '/public/index.html'))
})


app.post('/api', function(req, res) {
  const data = req.body;
  console.log(data);
  res.status(200).send('OK');
});


app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
